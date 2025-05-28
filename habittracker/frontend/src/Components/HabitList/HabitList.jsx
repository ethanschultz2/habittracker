import { useState, useEffect } from 'react';
import React from 'react';
import { getHabitsByUsername, deleteHabit } from '../../Api/habitApi.js';
import './HabitList.scss';
const HabitList = () =>{
    const [habits, setHabits] = useState([]);

        useEffect(() => {
                const fetchHabits = async () =>{
                try{
                    const usersName = localStorage.getItem("username");
                    const res = await getHabitsByUsername(usersName);
                    console.log(res);
                    setHabits(res);
                }catch(error){
                    console.log(error);
                }
            };
                fetchHabits();
            }, []);

        const handleDelete = async (index) => {
            const habitToDelete = habits[index];
            try{
                await deleteHabit(habitToDelete.name);
                setHabits(habits.filter((_, i) => i !== index));
            }catch(error){
                console.log("Failed to delete", error);
            }
        };


        const tableRows = habits.map((habit, index) => {
            return(
                <tr key={habit.id} className='items'>
                    <td>{habit.description}</td>
                    <td>{habit.duration}</td>
                    <td>{habit.frequency}</td>
                    <td>{habit.name}</td>
                    <td>
                        <button className='clicker' onClick={() => handleDelete(index)}> Delete </button>
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
                    <table>
                        <thead>
                            <tr>
                                <th> Description </th>
                                <th>Time spent doing </th>
                                <th> Times a week </th>
                                <th> Habit Name </th>
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