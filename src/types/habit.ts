import { HabitColor } from '@/utils/colorUtils'

export interface Habit {
    id: string
    title: string
    color: HabitColor
    createdAt: string // ISO date string
}

export interface Completions {
    [day: string]: string[] // Map of ISO date string to habit IDs
}
