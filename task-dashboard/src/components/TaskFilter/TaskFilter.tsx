import React from 'react'
import type { TaskStatus, TaskPriority } from '../../Types';   
import type { TaskFilterProps } from '../../Types';
export default function TaskFilter({ filters, onFilterChange }: TaskFilterProps) {
  return (
    <div>
        <div className="task-filter-container">
      {/* 1. Status Filter */}
      <div className="filter-group">

        <div className="filter-group filter-search">
        <label htmlFor="search-input">Search Tasks:</label>
        <input
          id="search-input"
          type="text"
          placeholder="Search by title or description..."
          name="searchTerm"
          value={filters.searchTerm}
          onChange={(e) => onFilterChange('searchTerm', e.target.value)}
        />
      </div>

        <label htmlFor="status-filter">Status:</label>
        <select
          id="status-filter"
          name="status"
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value as TaskStatus | 'all')}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* 2. Priority Filter */}
      <div className="filter-group">
        <label htmlFor="priority-filter">Priority:</label>
        <select
          id="priority-filter"
          name="priority"
          value={filters.priority}
          onChange={(e) => onFilterChange('priority', e.target.value as TaskPriority | 'all')}
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

    </div>
    </div>
  );
}
