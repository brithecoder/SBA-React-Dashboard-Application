
export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';
export type NewTaskData = Omit<Task, 'id'>;


export interface FilterCriteria {
  status: TaskStatus | 'all';
  priority: TaskPriority | 'all';
  searchTerm: string; // The search box input
}

export type TaskFormErrors = {
  title?: string;
  description?: string;
  dueDate?: string;
  // Status and Priority usually don't need validation if they have defaults
};

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}
 
export interface TaskItemProps extends Task{
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}
export interface TaskItemProps extends Task{
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

export interface TaskFilterProps {
filters: FilterCriteria;
onFilterChange: (
    name: keyof FilterCriteria, 
    value: TaskStatus | TaskPriority | 'all' | string // Value can now be a string for search
  ) => void;
}

export interface FilterCriteria {
  status: TaskStatus | 'all';
  priority: TaskPriority | 'all';
  
  // 💥 NEW: Add search term 💥
  searchTerm: string; 
}
export interface TaskFormProps {
  formData: Omit<Task, 'id'>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: TaskFormErrors;

}



export interface DashboardProps {
  initialTasks: Task[];
}