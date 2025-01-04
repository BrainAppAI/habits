import { Habit, HabitCompletion } from '../../types/habit'
import { isToday } from './dateUtils'

interface CalendarDayProps {
    date: Date
    currentMonth: number
    habits: Habit[]
    completions: HabitCompletion[]
    onClick: () => void
}

export function CalendarDay({
    date,
    currentMonth,
    habits,
    completions,
    onClick,
}: CalendarDayProps) {
    const dateStr = date.toISOString().split('T')[0]
    const isCurrentDay = isToday(date)
    const isOtherMonth = date.getMonth() !== currentMonth

    const getHabitStatus = (habit: Habit) => {
        const completion = completions.find(
            (c) => c.habitId === habit.id && c.date === dateStr
        )
        return { completed: completion?.completed ?? false }
    }

    return (
        <button
            onClick={onClick}
            className={`
        w-full h-24 transition-colors p-2
        hover:bg-gray-50 relative
        ${isCurrentDay ? 'bg-blue-50' : 'bg-white'}
        ${isOtherMonth ? 'bg-gray-50' : ''}
      `}
        >
            <span
                className={`
        absolute top-1 left-2 text-sm
        ${isCurrentDay ? 'text-blue-600 font-semibold' : ''}
        ${isOtherMonth ? 'text-gray-400' : 'text-gray-700'}
      `}
            >
                {date.getDate()}
            </span>

            <div className="flex flex-wrap gap-1 mt-6">
                {!isOtherMonth &&
                    habits.map((habit) => {
                        const status = getHabitStatus(habit)
                        return (
                            <div
                                key={habit.id}
                                className={`
                w-6 h-6 rounded-md flex items-center justify-center
                ${status.completed ? 'text-white' : 'bg-white'}
                border-2
              `}
                                style={{
                                    backgroundColor: status.completed
                                        ? habit.color
                                        : 'white',
                                    borderColor: habit.color,
                                }}
                            >
                                {status.completed && (
                                    <div className="w-4 h-4" />
                                )}
                            </div>
                        )
                    })}
            </div>
        </button>
    )
}
