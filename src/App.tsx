import { useState } from 'react'
import { CalendarHeader } from './components/Calendar/CalendarHeader'
import { CalendarGrid } from './components/Calendar/CalendarGrid'
import { AddHabitModal } from './components/Habits/AddHabitModal'
import { DayHabitsModal } from './components/Habits/DayHabitsModal'
import { HabitsLegend } from './components/Habits/HabitsLegend'
import { Habit, HabitCompletion } from './types/habit'
import { Button } from './components/ui/button'

const MAX_HABITS = 10

const App = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [habits, setHabits] = useState<Habit[]>([])
    const [completions, setCompletions] = useState<HabitCompletion[]>([])
    const [isAddHabitModalOpen, setIsAddHabitModalOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const handlePrevMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
        )
    }

    const handleNextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
        )
    }

    const handleAddHabit = (newHabit: Omit<Habit, 'id' | 'createdAt'>) => {
        if (habits.length >= MAX_HABITS) {
            alert('Maximum number of habits reached (10)')
            return
        }

        setHabits([
            ...habits,
            {
                ...newHabit,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
            },
        ])
    }

    const handleToggleHabit = (
        habitId: string,
        date: string,
        completed: boolean
    ) => {
        setCompletions((prev) => {
            const existing = prev.find(
                (c) => c.habitId === habitId && c.date === date
            )
            if (existing) {
                return prev.map((c) =>
                    c.habitId === habitId && c.date === date
                        ? { ...c, completed }
                        : c
                )
            }
            return [...prev, { habitId, date, completed }]
        })
    }

    return (
        <div className="min-h-screen bg-indigo-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="space-y-6">
                    <div className="bg-white shadow-lg">
                        <div className="flex justify-between bg-slate-50 items-center py-6 px-4">
                            <CalendarHeader
                                currentDate={currentDate}
                                onPrevMonth={handlePrevMonth}
                                onNextMonth={handleNextMonth}
                            />
                            <Button
                                onClick={() => setIsAddHabitModalOpen(true)}
                                disabled={habits.length >= MAX_HABITS}
                                variant="tertiary"
                            >
                                Manage Habits{' '}
                                {habits.length > 0 &&
                                    `(${habits.length}/${MAX_HABITS})`}
                            </Button>
                        </div>
                        <CalendarGrid
                            currentDate={currentDate}
                            habits={habits}
                            completions={completions}
                            onSelectDate={setSelectedDate}
                        />
                    </div>

                    {habits.length > 0 && (
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <HabitsLegend habits={habits} />
                        </div>
                    )}
                </div>
            </div>

            <AddHabitModal
                isOpen={isAddHabitModalOpen}
                onClose={() => setIsAddHabitModalOpen(false)}
                onAdd={handleAddHabit}
                existingHabits={habits}
            />

            <DayHabitsModal
                isOpen={selectedDate !== null}
                onClose={() => setSelectedDate(null)}
                date={selectedDate ?? new Date()}
                habits={habits}
                completions={completions}
                onToggleHabit={handleToggleHabit}
            />
        </div>
    )
}

export default App
