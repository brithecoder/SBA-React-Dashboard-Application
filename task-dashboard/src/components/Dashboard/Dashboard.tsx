
import { useEffect, useState } from 'react'
import TaskForm from '../TaskForm/TaskForm'
import type { FilterCriteria, NewTaskData ,Task, TaskStatus, TaskFormErrors } from '../../Types';
import TaskList from '../TaskList/TaskList';
import Navbar from '../NavBar/Navbar';
import TaskFilter from '../TaskFilter/TaskFilter';



const initialTaskFormData: NewTaskData = {
    title: '',
    description: '',
    status: 'pending',
    priority: 'low',
    dueDate: '',
};

  // Function to safely retrieve and parse tasks from local storage
const getInitialTasks = (): Task[] => {

    try {
    const savedTasks = localStorage.getItem('tasks');
    // If data exists, parse it. If not, return an empty array.
    return savedTasks ? JSON.parse(savedTasks) : [];
} catch (error) {
    console.error("Error loading tasks from local storage:", error);
    return []; // Return empty array on error
  }
};

const initialTaskFormErrors: TaskFormErrors = {};

export default function Dashboard() {

 const [taskFormData, setTaskFormData] = useState<NewTaskData>(initialTaskFormData);
 const [errors, setErrors] = useState<TaskFormErrors>(initialTaskFormErrors);
 const [tasks, setTasks] = useState<Task[]>(getInitialTasks());
   
 const [filters, setFilters] = useState<FilterCriteria>({
    status: 'all',
    priority: 'all',
    searchTerm: '', // 💥 NEW: Initialize search term
  });

useEffect(() => {
  try {
    // Convert the JavaScript array to a JSON string for storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log(`Saved ${tasks.length} tasks to local storage.`);
  } catch (error) {
    // This catches issues if the storage quota is exceeded (rare for small apps)
    console.error("Could not save tasks to local storage:", error);
  }
}, [tasks])


const filteredTasks = tasks.filter(task => {
  const { status, priority, searchTerm } = filters;

  // 1. Check Status and Priority (existing logic)
  const statusMatch = status === 'all' || task.status === status;
  const priorityMatch = priority === 'all' || task.priority === priority;


  // Convert title and description to lower case for case-insensitive search
  const searchLower = searchTerm.toLowerCase();
  
  // Check if search term is empty OR if the title or description includes the search term
  const searchMatch = searchTerm === '' || 
                      task.title.toLowerCase().includes(searchLower) ||
                      task.description.toLowerCase().includes(searchLower);

  // Combine all criteria
  return statusMatch && priorityMatch && searchMatch;
});

const handleFilterChange = (
  name: keyof FilterCriteria, // 'name' will be 'status', 'priority', or 'searchTerm'
  value: string // 'value' is the new selection or input text
) => {
  // Use the state updater function to ensure you have the latest state
  setFilters(prevFilters => ({
    ...prevFilters, // Keep existing filters (like the *other* priority/status)
    [name]: value,  // Dynamically update the specific filter key that changed
  }));
};


const validateForm = (data: NewTaskData): TaskFormErrors => {
  const newErrors: TaskFormErrors = {};

// Rule 1: Title must not be empty
  if (!data.title.trim()) {
    newErrors.title = "Task title is required.";
  } else if (data.title.length < 3) {
    newErrors.title = "Title must be at least 3 characters long.";
  }

  // Rule 2: Description must not be empty
  if (!data.description.trim()) {
    newErrors.description = "Task description is required.";
  } else if (data.description.length < 5) {
    newErrors.description = "Description must be at least 5 characters long.";
  }

  // Rule 3: Due Date must be set and in the future (or today)
  if (!data.dueDate) {
    newErrors.dueDate = "A due date is required.";
  } else {
    // Check if the date is in the past (only if you require future dates)
    const today = new Date().setHours(0, 0, 0, 0);
    const selectedDate = new Date(data.dueDate).setHours(0, 0, 0, 0);
    if (selectedDate < today) {
        newErrors.dueDate = "Due date cannot be in the past.";
    }
  }

  return newErrors;
};






// Handler for input changes
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target; 

    setTaskFormData(prevFormData => ({
      ...prevFormData, 
      [name]: value as string    
    }));
  };


   // Handler for form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm(taskFormData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; 
    }
    console.log('Submitting:', taskFormData);
    
   const newTask: Task = {
      id: Date.now().toString(), 
      ...taskFormData
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setTaskFormData(initialTaskFormData);
    setErrors(initialTaskFormErrors);

    // Add your API call or submission logic here
    console.log('Current Tasks:', tasks);
  };









 //  Handler for Status Update
const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
  setTasks(prevTasks =>
    prevTasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    )
  );
};


// 2.  Handler for Deleting a Task
const handleDelete = (taskId: string) => {
    const taskToDelete = tasks.find(task => task.id === taskId);
    const taskTitle = taskToDelete ? taskToDelete.title : 'this task';
  // Add an optional confirmation step before deleting for better UX
  const isConfirmed = window.confirm(`Are you sure you want to delete ${taskTitle} ?`); 
  if (isConfirmed) {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }
};

  return (
    <div>
        <Navbar />
        <TaskFilter
        filters={filters} 
      onFilterChange={handleFilterChange}
        />
    
     <div className="task-layout-container">
      <div className="task-layout-form">
        <TaskForm formData={taskFormData}
         handleChange={handleFormChange} 
         handleSubmit={handleSubmit} 
         errors={errors}
        />
      </div>
     <div className="task-layout-list">
        <TaskList tasks={filteredTasks} 
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
         />
      </div>
     </div>   
    </div>

  )
}
