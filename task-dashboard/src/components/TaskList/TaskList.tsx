import React from 'react'
import TaskItem from './TaskItem'
import type { TaskListProps } from '../../Types';

export default function TaskList({ tasks, onStatusChange, onDelete }: TaskListProps) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>🎉 Looks like your task list is empty! Add a vibrant new task above.</p>
      ) : (
        tasks.map(task => (
          // Pass down the task data and the handler functions
          <TaskItem
            key={task.id}
            {...task} // Spreads id, title, description, status, priority, dueDate
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  )
}
