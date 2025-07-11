import { useState, useEffect } from 'react';
import React from 'react';
import './HabitForm.scss';
import { createHabit } from '../../Api/habitApi.js';

const DAYS_OF_WEEK = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY"
];

const HabitForm = () =>{
    const [habits, setHabits] = useState({
        description: '',
        duration: '',
        frequency: '',
        name: '',
        username: localStorage.getItem("username") || '',
        scheduledDays: [],
        startTime: '',
        status: 'not-started' // Default status
    }); //Habits start as object

    function handleInputChange(e) {
    const { name, value } = e.target;
    setHabits(prev => ({
      ...prev,
      [name]: value
    }));
  }
    function handleDay(day) {
        setHabits(prev => {
        const alreadySelected = prev.scheduledDays.includes(day);
        const updatedDays = alreadySelected
            ? prev.scheduledDays.filter(d => d !== day)
            : [...prev.scheduledDays, day];
        return { ...prev, scheduledDays: updatedDays };
        });
    }


    async function handleSubmit(e){
        e.preventDefault();
        try{
            const newHabit = await createHabit(habits);
            console.log("New habit created", newHabit);
            // Reset form on success
            setHabits({
                description: '',
                duration: '',
                frequency: '',
                name: '',
                username: localStorage.getItem("username") || '',
                scheduledDays: [],
                startTime: '',
                status: 'not-started' // Default status
            });
            alert("habit created successfully");
        }catch(err){
            console.log(err);
        }
    }

    return(
    <div className='wrapper'>
        <div className='habit-form-wrapper'>
            <form className="form-group" onSubmit={handleSubmit}>
                <h2 className='header'>Fill Out Habit Form</h2>
                <div className='habit'>
                        <label htmlFor="name">Habit Name </label>
                        <input 
                        type="text" 
                        name='name' 
                        id='name'
                        value={habits.name}
                        onChange={handleInputChange}
                        required
                        />
                    </div>

                    <div className='duration'>
                        <label htmlFor="duration">For How Long </label>
                        <input 
                        type="text" 
                        name='duration' 
                        id='duration'
                        value={habits.duration}
                        onChange={handleInputChange}
                        required
                        />
                    </div>

                    <div className='startTime'>
                        <label htmlFor="startTime">Starting Time </label>
                        <input 
                        type="time" 
                        name='startTime' 
                        id='startTime'
                        value={habits.startTime}
                        onChange={handleInputChange}
                        required
                        />
                    </div>

                    <div className='frequency'>
                        <label htmlFor="frequency">How many days a week </label>
                        <input 
                        type="number" 
                        name='frequency' 
                        id='frequency'
                        value={habits.frequency}
                        onChange={handleInputChange}
                        required
                        />
                    </div>
                   <div className='scheduledDays'>
                        <div className='checkbox-group'>
                        {DAYS_OF_WEEK.map((day) => (
                            <label key={day}>
                            <input
                                type="checkbox"
                                value={day}
                                checked={habits.scheduledDays.includes(day)}
                                onChange={() => handleDay(day)}
                            />
                            {day.charAt(0) + day.slice(1).toLowerCase()}
                            </label>
                        ))}
                        </div>
                    </div>
                    <div className='description'>
                        <label htmlFor="description">Description of Habit </label>
                        <input 
                        type="text" 
                        name='description' 
                        id='description'
                        value={habits.description}
                        onChange={handleInputChange}
                        />
                    </div>
                    <button type='submit' className='button'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
export default HabitForm;