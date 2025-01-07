import {
    startOfMonth,
    endOfMonth,
    subDays,
    addDays,
    eachDayOfInterval,
} from 'date-fns'
import { CalendarDay } from './CalendarDay' // Assuming CalendarDay is a separate component
import { Completions, Habit } from '@/types/habit'

export function CalendarGrid({
    currentDate,
    habits,
    habitCompletions,
    onSelectDate,
    handleToggleHabit,
}: {
    currentDate: Date
    habits: Habit[] // Assuming Habit is your habit type
    habitCompletions: Completions
    onSelectDate: (date: Date) => void
    handleToggleHabit: (habitId: string, date: string) => void
}) {
    const startDate = startOfMonth(currentDate)
    const endDate = endOfMonth(currentDate)
    const currentMonth = currentDate.getMonth()

    // Days from previous month to fill the first week
    const daysFromPrevMonth = Array.from(
        { length: startDate.getDay() },
        (_, i) => subDays(startDate, startDate.getDay() - i)
    )

    // Days in the current month
    const daysInCurrentMonth = eachDayOfInterval({
        start: startDate,
        end: endDate,
    })

    // Days from next month to fill the last week
    const remainingDays =
        (7 - ((daysFromPrevMonth.length + daysInCurrentMonth.length) % 7)) % 7
    const daysFromNextMonth = Array.from({ length: remainingDays }, (_, i) =>
        addDays(endDate, i + 1)
    )

    // Combine all days
    const allDays = [
        ...daysFromPrevMonth,
        ...daysInCurrentMonth,
        ...daysFromNextMonth,
    ]

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    return (
        <div className="flex-1 flex flex-col">
            {/* Day Names Header */}
            <div className="grid grid-cols-7 border-b border-gray-200 bg-slate-50">
                {dayNames.map((day) => (
                    <div
                        key={day}
                        className="text-right pr-2 font-normal text-slate-700 text-sm pb-1"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Days */}
            <div
                className={`flex-1 grid grid-cols-7 ${
                    allDays.length === 35 ? 'grid-rows-5' : 'grid-rows-6'
                }`}
            >
                {allDays.map((date, index) => {
                    const isoDate = date.toISOString().split('T')[0]
                    const completionsForDay = habitCompletions[isoDate] || []

                    return (
                        <div
                            key={isoDate}
                            className={`border-b border-r border-gray-200 ${
                                index % 7 === 0 ? 'border-l' : ''
                            }`}
                        >
                            <CalendarDay
                                date={date}
                                currentMonth={currentMonth}
                                habits={habits}
                                completions={completionsForDay}
                                onClick={() => onSelectDate(date)}
                                onToggleHabit={handleToggleHabit}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
