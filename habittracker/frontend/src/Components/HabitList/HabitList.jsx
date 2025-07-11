import { useState, useEffect } from 'react';
import React from 'react';
import { getHabitsByUsername, deleteHabitById, updateStatus } from '../../Api/habitApi.js';
import './HabitList.scss';
const HabitList = () =>{
    const [habits, setHabits] = useState([]);
    const [radioStatus, setRadioStatus] = useState({});

        useEffect(() => {
            fetchHabits();
        }, []);
        const fetchHabits = async () =>{
            try{
                const usersName = localStorage.getItem("username");
                const res = await getHabitsByUsername(usersName);
                setHabits(res);
                const initialStatus = {};
                res.forEach((habit) => {
                    // Initialize radioStatus with the habit's status or default to 'not-started'
                    initialStatus[habit.id] = habit.status || 'not-started'; // Default to 'not-started' if no status
                });
                    setRadioStatus(initialStatus);
                }catch(error){
                    console.log(error);
                }
            };


        const handleDelete = async (id) => {
            try{
                await deleteHabitById(id);
                setHabits(habits.filter((habit) => habit.id !== id));
            }catch(error){
                console.log("Failed to delete", error);
            }
        };
        const handleStatusChange = async (id, status) => {
            try{
                await updateStatus(id, status);
                setRadioStatus((prev) => ({ ...prev, [id]: status }));

                if(status === 'completed'){
                    // Handle completed status if complete delete from backend 
                    await handleDelete(id);
                }
            } catch(error) {
                console.log("Failed to update status", error);
            }
        };
        const tableRows = habits.map((habit) => {
            return(
                <tr key={habit.id} className='items'>
                    <td>{habit.description}</td>
                    <td>{habit.duration}</td>
                    <td>{habit.scheduledDays.join(", ")}</td>
                    <td>{habit.name}</td>
                    <td>
                        <div className='checkbox-group'>
                            <label>
                                <input                             
                                type="radio"
                                name={`status-${habit.id}`}
                                value="completed"
                                checked={radioStatus[habit.id] === 'completed'}
                                onChange={() => handleStatusChange(habit.id,'completed')}
                                />
                                Complete
                            </label>
                            <label>
                                <input
                                type="radio"
                                name={`status-${habit.id}`}
                                value="in-progress"
                                checked={radioStatus[habit.id] === 'in-progress'}
                                onChange={() => handleStatusChange(habit.id, 'in-progress')}
                                />
                                Active
                            </label>
                            <label>
                                <input
                                type="radio"
                                name={`status-${habit.id}`}
                                value="not-started"
                                checked={radioStatus[habit.id] === 'not-started'}
                                onChange={() => handleStatusChange(habit.id, 'not-started')}
                                />
                                Unbegun
                            </label>
                        </div>
                    </td>
                    <td>
                        <button className='clicker' onClick={() => handleDelete(habit.id)}> Delete </button>
                    </td>
                </tr>
            );
        });
    return (
        <div className='habit-list'>
            <div className='wrapper'>
                <h2>Your Habits</h2>
                {habits.length > 0 &&(
                <div className='container'>
                    <table className='habit-table'>
                        <thead>
                            <tr>
                                <th> Description </th>
                                <th> Time for habit </th>
                                <th> Days of the week </th>
                                <th> Habit Name </th>
                                <th> Status </th>
                                <th> Delete Habit</th>
                            </tr>
                            </thead>
                            <tbody>{tableRows}</tbody>
                </table>
                </div>
                )}
            </div>
        </div>
    );
}
export default HabitList;