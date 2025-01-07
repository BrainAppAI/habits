import { Habit } from '../../types/habit'
import CheckMark from '../Habits/CheckMark'
import { isFuture, isToday } from 'date-fns'

interface CalendarDayProps {
    date: Date
    currentMonth: number
    habits: Habit[]
    completions: string[]
    onClick: () => void
    onToggleHabit: (habitId: string, date: string) => void
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
    const isFutureDate = isFuture(date)

    const isHabitDone = (habitId: string) => completions?.includes(habitId)

    return (
        <button
            onClick={() => {
                if (isFutureDate) return
                onClick()
            }}
            className={`flex w-full h-full transition-colors duration-200 pt-1 md:pb-4 pb-2 md:pl-3 pl-2 md:pr-2 pr-1 ${
                !isFutureDate
                    ? 'hover:bg-gray-50 dark:hover:bg-slate-800'
                    : 'cursor-default'
            } relative justify-start items-end ${
                isCurrentDay
                    ? 'bg-gray-100 hover:bg-gray-200 dark:bg-slate-800'
                    : 'bg-white dark:bg-slate-900 '
            }`}
        >
            <span
                className={`absolute top-1 right-2 text-sm ${
                    isOtherMonth
                        ? 'text-gray-400 dark:text-gray-400'
                        : 'text-gray-700 dark:text-white'
                }`}
            >
                {date.getDate()}
            </span>

            <div className="flex flex-wrap gap-1">
                {!isOtherMonth
                    ? habits.map((habit) => {
                          const isChecked = isHabitDone(habit.id)

                          const handleClickCheckMark = (
                              e: React.MouseEvent<HTMLElement>
                          ) => {
                              e.preventDefault()
                              e.stopPropagation()
                              onToggleHabit(habit.id, dateStr)
                          }

                          return (
                              <div className={isFutureDate ? 'invisible' : ''}>
                                  <CheckMark
                                      isChecked={isChecked}
                                      color={habit.color}
                                      onClick={handleClickCheckMark}
                                      as="button"
                                  />
                              </div>
                          )
                      })
                    : null}
            </div>
        </button>
    )
}
