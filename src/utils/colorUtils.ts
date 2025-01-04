export const HABIT_COLORS = [
    'INDIGO',
    'GREEN',
    'PINK',
    'ORANGE',
    'YELLOW',
    'RED',
    'CYAN',
    'PURPLE',
] as const

export type HabitColor = (typeof HABIT_COLORS)[number]

export const COLORS_TO_CLASS = {
    INDIGO: {
        BG: 'bg-indigo-400',
        BORDER: 'border-indigo-300',
    },
    GREEN: {
        BG: 'bg-green-400',
        BORDER: 'border-green-300',
    },
    PINK: {
        BG: 'bg-pink-400',
        BORDER: 'border-pink-300',
    },
    ORANGE: {
        BG: 'bg-orange-400',
        BORDER: 'border-orange-300',
    },
    YELLOW: {
        BG: 'bg-yellow-400',
        BORDER: 'border-yellow-300',
    },
    RED: {
        BG: 'bg-red-400',
        BORDER: 'border-red-300',
    },
    CYAN: {
        BG: 'bg-cyan-400',
        BORDER: 'border-cyan-300',
    },
    PURPLE: {
        BG: 'bg-purple-400',
        BORDER: 'border-purple-300',
    },
}
