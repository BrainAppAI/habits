import { useState } from 'react'
import { CalendarHeader } from './components/Calendar/CalendarHeader'
import { CalendarGrid } from './components/Calendar/CalendarGrid'
import { AddHabitModal } from './components/Habits/AddHabitModal'
import { DayHabitsModal } from './components/Habits/DayHabitsModal'
import { HabitsLegend } from './components/Habits/HabitsLegend'
import { Habit, HabitCompletion } from './types/habit'
import { Button } from './components/ui/button'
import Icons from './assets/icons'

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

    const handleManageHabits = () => setIsAddHabitModalOpen(true)

    return (
        <div className="min-h-screen p-10 bg-gradient-brain-dark">
            <div className="h-[calc(100vh-5rem)] flex flex-col bg-white shadow-dialog overflow-hidden w-full mx-auto rounded-xl">
                <Header
                    currentDate={currentDate}
                    onManageHabits={handleManageHabits}
                    onClickPrevMonth={handlePrevMonth}
                    onClickNextMonth={handleNextMonth}
                />

                <CalendarGrid
                    currentDate={currentDate}
                    habits={habits}
                    completions={completions}
                    onSelectDate={setSelectedDate}
                    onToggleHabit={handleToggleHabit}
                />

                <HabitsLegend habits={habits} />
            </div>

            <AddHabitModal
                setShowModal={setIsAddHabitModalOpen}
                showModal={isAddHabitModalOpen}
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

const Header: React.FC<{
    currentDate: Date
    onManageHabits: () => void
    onClickPrevMonth: () => void
    onClickNextMonth: () => void
}> = ({ currentDate, onManageHabits, onClickPrevMonth, onClickNextMonth }) => (
    <div className="flex justify-between bg-slate-50 items-center py-6 px-4">
        <CalendarHeader
            currentDate={currentDate}
            onPrevMonth={onClickPrevMonth}
            onNextMonth={onClickNextMonth}
        />
        <Button onClick={onManageHabits} variant="tertiary" size="sm">
            <span className="sm:block hidden">Manage Habits</span>
            <span className="sm:hidden block">
                <Icons.Settings size={18} />
            </span>
        </Button>
    </div>
)

export default App
