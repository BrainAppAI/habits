export interface Habit {
  id: string;
  title: string;
  color: string;
  createdAt: string; // ISO date string
}

export interface HabitCompletion {
  habitId: string;
  date: string; // ISO date string
  completed: boolean;
}