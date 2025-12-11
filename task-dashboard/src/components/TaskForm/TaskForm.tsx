import React from 'react'
import type {TaskFormProps } from '../../Types';



export default function TaskForm({formData,handleChange,handleSubmit, errors}: TaskFormProps) {
  return (
    <div >
       <h2> New Task </h2>
       <form  className="task-form-container" onSubmit={handleSubmit}>
        <label> Title:</label>
         <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p className="error-message">{errors.title}</p>}
        <br />
        <label> Description:</label>
         <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <p className="error-message">{errors.description}</p>}
        <br />
      <label htmlFor="task-status">Choose Status:</label>
      <select id="status-select" name="status" value={formData.status}  onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
        <br />
        <label htmlFor="task-priority">Choose Priority:</label>
      <select id="priority-select" name="priority" value={formData.priority} onChange={handleChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
        <br />
        <label> Due Date:</label>
         <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
        {errors.dueDate && <p className="error-message">{errors.dueDate}</p>}
        <br />
        <button type="submit"> Add Task </button>
       </form>

    </div>
  )
}
