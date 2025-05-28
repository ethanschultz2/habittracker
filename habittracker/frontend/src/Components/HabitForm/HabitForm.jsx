import { useState, useEffect } from 'react';
import React from 'react';
import './HabitForm.scss';
import { createHabit } from '../../Api/habitApi.js';

const HabitForm = () =>{
    const [habits, setHabits] = useState({
        description: '',
        duration: '',
        frequency: '',
        name: '',
        username: localStorage.getItem("username") || ''
    }); //Habits start as object

    function handleChange(e){
        const { name, value } = e.target;
        setHabits(prev => ({...prev,
            [name]:value
        }));
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
                username: localStorage.getItem("username") || ''
            });
            alert("habit created successfully");
        }catch(err){
            console.log(err);
        }
    }

    return(
    <div className='wrapper'>
        <div className='habit-form-wrapper'>
            <form onSubmit={handleSubmit}>
                <div className='habit'>
                        <label htmlFor="name">What habit do you want to start </label>
                        <input 
                        type="text" 
                        name='name' 
                        id='name'
                        value={habits.name}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className='duration'>
                        <label htmlFor="duration">How long would you like to do it for </label>
                        <input 
                        type="text" 
                        name='duration' 
                        id='duration'
                        value={habits.duration}
                        onChange={handleChange}
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
                        onChange={handleChange}
                        required
                        />
                    </div>
                    <div className='description'>
                        <label htmlFor="description">Description of Habit </label>
                        <input 
                        type="text" 
                        name='description' 
                        id='description'
                        value={habits.description}
                        onChange={handleChange}
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