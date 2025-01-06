import { Habit, HabitCompletion } from '../../types/habit'
import { isToday } from './dateUtils'
import CheckMark from '../Habits/CheckMark'

interface CalendarDayProps {
    date: Date
    currentMonth: number
    habits: Habit[]
    completions: HabitCompletion[]
    onClick: () => void
    onToggleHabit: (habitId: string, date: string, completed: boolean) => void
}

export function CalendarDay({
    date,
    currentMonth,
    habits,
    completions,
    onClick,
    onToggleHabit,
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
            className={`w-full h-full transition-colors duration-200 p-2 hover:bg-gray-50 relative ${
                isCurrentDay ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white'
            }`}
        >
            <span
                className={`absolute top-1 right-2 text-sm ${
                    isOtherMonth ? 'text-gray-400' : 'text-gray-700'
                }`}
            >
                {date.getDate()}
            </span>

            <div className="flex flex-wrap gap-1 mt-6">
                {!isOtherMonth &&
                    habits.map((habit) => {
                        const status = getHabitStatus(habit)

                        const handleClickCheckMark = (
                            e: React.MouseEvent<HTMLElement>
                        ) => {
                            e.preventDefault()
                            e.stopPropagation()
                            onToggleHabit(habit.id, dateStr, !status.completed)
                        }

                        return (
                            <CheckMark
                                isChecked={status.completed}
                                color={habit.color}
                                onClick={handleClickCheckMark}
                                as="button"
                            />
                        )
                    })}
            </div>
        </button>
    )
}
