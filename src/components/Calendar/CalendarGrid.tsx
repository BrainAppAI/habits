import {
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    addDays,
    subDays,
} from './dateUtils'
import { CalendarDay } from './CalendarDay'
import { Habit, HabitCompletion } from '../../types/habit'

interface CalendarGridProps {
    currentDate: Date
    habits: Habit[]
    completions: HabitCompletion[]
    onSelectDate: (date: Date) => void
}

export function CalendarGrid({
    currentDate,
    habits,
    completions,
    onSelectDate,
}: CalendarGridProps) {
    const startDate = startOfMonth(currentDate)
    const endDate = endOfMonth(currentDate)
    const currentMonth = currentDate.getMonth()

    // Get days from previous month to fill the first week
    const daysFromPrevMonth = Array.from(
        { length: startDate.getDay() },
        (_, i) => subDays(startDate, startDate.getDay() - i)
    )

    // Get days from current month
    const daysInCurrentMonth = eachDayOfInterval(startDate, endDate)

    // Get days from next month to fill the last week
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

            <div
                className={`flex-1 grid grid-cols-7 ${
                    allDays.length === 35 ? 'grid-rows-5' : 'grid-rows-6'
                }`}
            >
                {allDays.map((date, index) => (
                    <div
                        key={date.toISOString()}
                        className={`border-b border-r border-gray-200 ${
                            index % 7 === 0 ? 'border-l' : ''
                        }`}
                    >
                        <CalendarDay
                            date={date}
                            currentMonth={currentMonth}
                            habits={habits}
                            completions={completions}
                            onClick={() => onSelectDate(date)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
