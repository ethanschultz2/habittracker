import React, { useState } from 'react';
import './HabitFormModal.scss';

const HabitFormModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
    frequency: '',
    username: localStorage.getItem("username") || '',
    day: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose(); // close the modal
  };

  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 className='title'>Add Habit</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>Description:
            <input type="text" name="description" value={formData.description} onChange={handleChange} required />
          </label>
          <label>Start Time:
            <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
          </label>
          <label>End Time:
            <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
          </label>
          <label>Frequency:
            <input type="text" name="frequency" value={formData.frequency} onChange={handleChange} required />
          </label>
          <label>Day:
            <select name="day" value={formData.day} onChange={handleChange} required>
              <option value="">Select a day</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
          </label>
          <div className="modal-buttons">
            <button type="submit">Add</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HabitFormModal;