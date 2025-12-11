import React from 'react'
import type { TaskItemProps, TaskStatus   } from '../../Types';

export default function TaskItem({
    id, 
    title, 
    description, 
    status, 
    priority, 
    dueDate,
    onStatusChange, 
    onDelete        
}: TaskItemProps) {

    const handleStatusToggle = () => {
    let nextStatus: TaskStatus;
    
    // Cycle logic: pending -> in-progress -> completed -> pending (or stop at completed)
    if (status === 'pending') {
      nextStatus = 'in-progress';
    } else if (status === 'in-progress') {
      nextStatus = 'completed';
    } else {
      // If completed, let's offer to reset it to pending
      nextStatus = 'pending';
    }
    
    onStatusChange(id, nextStatus);
    };

    // Text for the status button
  const getNextStatusButtonText = () => {
    if (status === 'pending') return 'Start Task';
    if (status === 'in-progress') return 'Finish Task';
    return 'Reset Status';
  };
  // Uses the improved logic from Dashboard to confirm deletion with the title
  const handleDeleteClick = () => {
      // onDelete will trigger the logic in Dashboard which finds the title and prompts confirmation.
      onDelete(id); 
  };
const dateObject = new Date(dueDate);
const formattedDate = dateObject.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).replace(/\//g, '-');

  return (

    // 1. Applies the base styling and the status border accent (e.g., task-status-pending)
    <div className={`task-item task-status-${status}`}>
      
      {/* 2. Header Section with Title and Badges */}
      <div className="task-header">
        <h4>{title}</h4>
        
        <div className="task-badges">
          {/* Status Badge - Uses status-pending, status-in-progress, etc. */}
          <span className={`status-badge status-${status}`}>
            {status.toUpperCase()}
          </span>
          {/* Priority Badge - Uses priority-low, priority-medium, priority-high */}
          <span className={`priority-badge priority-${priority}`}>
            {priority.toUpperCase()}
          </span>
        </div>
      </div>
      
      {/* 3. Description */}
      <p className="task-description">{description}</p>
      
      {/* 4. Footer Section with Due Date and Actions */}
      <div className="task-footer">
        
        <span className="task-due-date">Due: {formattedDate}</span>

        <div className="task-actions">
          
          {/* Status Change Button */}
          <button 
            onClick={handleStatusToggle} 
            className="action-button status-change"
          >
            {getNextStatusButtonText()}
          </button>
            {/* Delete Button */}
          <button 
            onClick={handleDeleteClick} 
            className="action-button delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
  
}
