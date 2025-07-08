import { ScheduleComponent, Day, Week, WorkWeek, Month, Inject } from '@syncfusion/ej2-react-schedule';
import { useState, useEffect } from 'react';
import { getHabitsByUsername } from '../../Api/habitApi';
import "./Schedule.scss";
import { createHabit } from '../../Api/habitApi.js';
import HabitFormModal from '../HabitModal/HabitFormModal.jsx';
import { deleteHabitById }from '../../Api/habitApi.js';

const Schedule = () => {
  const [dailyHabits, setDailyHabits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
  const username = localStorage.getItem('username') || '';
  getHabitsByUsername(username).then(habits => {
    const formatted = habits.map((habit, idx) => {
      const start = new Date();
      start.setHours(17, 0, 0); // or whatever logic you want
      const end = new Date(start.getTime() + parseInt(habit.duration, 10) * 60000);
      return {
        Id: habit.id,
        Subject: habit.name,
        StartTime: start,
        EndTime: end,
        IsAllDay: false,
      };
    });
    setDailyHabits(formatted);
  });
}, []);

  const onActionComplete = async (args) => {
    if (args.requestType === 'eventCreated') {
      for (let ev of args.addedRecords) {
        // transform scheduler event to  HabitDto
        const start = new Date(ev.StartTime);
        const end = new Date(ev.EndTime);
        const duration = (end - start) / (1000 * 60); // minutes

        const habitDto = {
          name: ev.Subject,
          description: ev.Description || '',
          frequency: 1, // or some default value
          duration: duration,
          username: localStorage.getItem('username') || '',
        };
        await createHabit(habitDto); // POST to backend
      }
    }
    // Handle deleted events for both local and backend
    if (args.requestType === 'eventRemoved') {
      const deletedEvents = Array.isArray(args.deletedRecords) ? args.deletedRecords : [args.data]; //check to see if there are multiple deleted records(an array) if not use the single record
      for (let ev of deletedEvents) {
        try {
          await deleteHabitById(ev.Id); // DELETE from backend
          setDailyHabits((prev) => prev.filter(habit => habit.Id !== ev.Id)); // Update local state
        } catch (error) {
          console.error('Failed to delete habit', error);
        }
      }
    }
  };

  const handleHabitSubmit = async (newHabitData) => {
    try {
      // Parse time into dates
      const [startHour, startMin] = newHabitData.startTime.split(':').map(Number);
      const [endHour, endMin] = newHabitData.endTime.split(':').map(Number);
      const start = new Date();
      start.setHours(startHour, startMin, 0, 0);
      const end = new Date();
      end.setHours(endHour, endMin, 0, 0);
      const durationMinutes = (end - start) / (1000 * 60);

      const habitDto = {
        description: newHabitData.description,
        duration: durationMinutes,
        frequency: newHabitData.frequency,
        name: newHabitData.name,
        username: localStorage.getItem('username') || '',
      };
      // Save to backend
      await createHabit(habitDto);

      // Also update local scheduler state
      setDailyHabits((prev) => [
        ...prev,
        {
          Id: prev.length + 1,
          Subject: newHabitData.name,
          StartTime: start,
          EndTime: end,
          IsAllDay: false,
          Description: newHabitData.description,
        }
      ]);

      setIsModalOpen(false); // close modal
    } catch (error) {
      console.error('Failed to add habit', error);
    }
  };

  return (
    <>
      <div className='button-container'>
        <button onClick={() => setIsModalOpen(true)} className="habit-btn">Add Habit</button>
      </div>

      <ScheduleComponent
        height="750px"
        eventSettings={{ dataSource: dailyHabits }}
        actionComplete={onActionComplete}
      >
        <Inject services={[Day, Week, WorkWeek, Month]} />
      </ScheduleComponent>

      <HabitFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleHabitSubmit}
      />
    </>
  );
};
export default Schedule
