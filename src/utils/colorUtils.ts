export const HABIT_COLORS = [
  '#D50000', '#E67C73', '#F4511E', '#F6BF26', 
  '#33B679', '#0B8043', '#039BE5', '#3F51B5', '#7986CB', '#8E24AA'
] as const;

export type HabitColor = typeof HABIT_COLORS[number];

export function getAvailableColors(usedColors: string[]): HabitColor[] {
  return HABIT_COLORS.filter(color => !usedColors.includes(color));
}