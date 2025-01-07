import { useState } from 'react'
import { CalendarHeader } from './components/Calendar/CalendarHeader'
import { CalendarGrid } from './components/Calendar/CalendarGrid'
import { AddHabitModal } from './components/Habits/AddHabitModal'
import { DayHabitsModal } from './components/Habits/DayHabitsModal'
import { HabitsLegend } from './components/Habits/HabitsLegend'
import { Button } from './components/ui/button'
import Icons from './assets/icons'
import { useHabitStorage } from './hooks/useHabitStorage'

const App = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [isAddHabitModalOpen, setIsAddHabitModalOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // Use the custom hook to fetch and manage habit completions
    const {
        habits,
        habitCompletions,
        markHabitCompleted,
        unmarkHabitCompleted,
        setAllHabits,
        deleteHabit,
    } = useHabitStorage(year, month)

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

    const handleToggleHabit = (habitId: string, date: string) => {
        const isCompleted = habitCompletions[date]?.includes(habitId)
        if (isCompleted) {
            unmarkHabitCompleted(habitId, date)
        } else {
            markHabitCompleted(habitId, date)
        }
    }

    const handleManageHabits = () => setIsAddHabitModalOpen(true)

    const selectedDayCompletions = selectedDate
        ? habitCompletions[selectedDate.toISOString().split('T')[0]]
            ? habitCompletions[selectedDate.toISOString().split('T')[0]]
            : []
        : []

    return (
        <div className="min-h-screen md:py-10 py-6 md:px-20 px-6 bg-gradient-brain-dark">
            <div className="md:h-[calc(100vh-5rem)] h-[calc(100vh-3rem)] flex flex-col bg-white shadow-dialog overflow-hidden w-full mx-auto rounded-xl">
                <Header
                    currentDate={currentDate}
                    onManageHabits={handleManageHabits}
                    onClickPrevMonth={handlePrevMonth}
                    onClickNextMonth={handleNextMonth}
                />

                <CalendarGrid
                    currentDate={currentDate}
                    habits={habits}
                    habitCompletions={habitCompletions}
                    handleToggleHabit={handleToggleHabit}
                    onSelectDate={setSelectedDate}
                />

                <HabitsLegend habits={habits} />
            </div>

            <AddHabitModal
                key={habits.length} // Key is required to rerender the component when habits change
                setShowModal={setIsAddHabitModalOpen}
                showModal={isAddHabitModalOpen}
                handleSetAllHabits={setAllHabits}
                handleDeleteHabit={deleteHabit}
                existingHabits={habits}
            />

            <DayHabitsModal
                isOpen={selectedDate !== null}
                onClose={() => setSelectedDate(null)}
                date={selectedDate ?? new Date()}
                habits={habits}
                onToggleHabit={handleToggleHabit}
                completions={selectedDayCompletions}
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
