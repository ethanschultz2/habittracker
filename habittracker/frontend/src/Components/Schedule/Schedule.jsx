import { ScheduleComponent, Day, Week, WorkWeek, Month, Inject } from '@syncfusion/ej2-react-schedule';
import { useState, useEffect } from 'react';
import { getHabitsByUsername } from '../../Api/habitApi';
import "./Schedule.scss";
import { createHabit } from '../../Api/habitApi.js';
import { deleteHabitById }from '../../Api/habitApi.js';

const Schedule = () => {
  const [dailyHabits, setDailyHabits] = useState([]);

useEffect(() => {
  const username = localStorage.getItem('username') || '';
  getHabitsByUsername(username).then(habits => {
    const formatted = habits.flatMap(habit => {
      const durationInMinutes = parseInt(habit.duration, 10) || 0;

      // If startTime is "HH:mm", extract it
      const [hours, minutes] = habit.startTime
        ? habit.startTime.split(':').map(Number)
        : [17, 0]; // Default 5:00 PM

      return habit.scheduledDays.map(day => {
        // Convert day name to the date of the next occurrence
        const today = new Date();
        const daysMap = {
          SUNDAY: 0,
          MONDAY: 1,
          TUESDAY: 2,
          WEDNESDAY: 3,
          THURSDAY: 4,
          FRIDAY: 5,
          SATURDAY: 6
        };

        const targetDay = daysMap[day];
        const currentDay = today.getDay();
        const daysUntil = (targetDay - currentDay + 7) % 7;

        const scheduledDate = new Date(today);
        scheduledDate.setDate(today.getDate() + daysUntil);
        scheduledDate.setHours(hours, minutes, 0, 0); // Set time

        const start = new Date(scheduledDate);
        const end = new Date(start.getTime() + durationInMinutes * 60000);

        return {
          Id: habit.id,
          Subject: habit.name,
          StartTime: start,
          EndTime: end,
          IsAllDay: false,
        };
      });
    });
    setDailyHabits(formatted);
  });
}, []);


  const onActionComplete = async (args) => {
    // Handle creating events
    if (args.requestType === 'eventCreated') {
      for (let ev of args.addedRecords) {
        const start = new Date(ev.StartTime);
        const end = new Date(ev.EndTime);
        const duration = (end - start) / (1000 * 60); // in minutes

        // Format HH:mm for backend
        const hh = String(start.getHours()).padStart(2, '0');
        const mm = String(start.getMinutes()).padStart(2, '0');
        const formattedTime = `${hh}:${mm}`;

        // Get the scheduled day from the start date
        const dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        const scheduledDay = dayNames[start.getDay()];

        const habitDto = {
          name: ev.Subject,
          description: ev.Description || ev.Subject,
          frequency: 1, // default
          duration: duration,
          username: localStorage.getItem('username') || '',
          scheduledDays: [scheduledDay], 
          startTime: formattedTime,
          status: 'not-started'
        };
        try {
          await createHabit(habitDto); // POST to backend
        } catch (error) {
          console.error('Failed to create habit', error);
        }
      }
    }
    // Handle deleting events
    if (args.requestType === 'eventRemoved') {
      const deletedEvents = Array.isArray(args.deletedRecords) ? args.deletedRecords : [args.data];
      for (let ev of deletedEvents) {
        try {
          console.log("Deleting habit with ID:", ev.Id);
          await deleteHabitById(ev.Id);
          setDailyHabits(prev => prev.filter(habit => habit.Id !== ev.Id));
        } catch (error) {
          console.error('Failed to delete habit', error);
        }
      }
    }
  };


  return (
    <>
      <ScheduleComponent
        height="750px"
        eventSettings={{ dataSource: dailyHabits }}
        actionComplete={onActionComplete}
      >
        <Inject services={[Day, Week, WorkWeek, Month]} />
      </ScheduleComponent>
    </>
  );
};
export default Schedule
