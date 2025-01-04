import { Habit, HabitCompletion } from '../../types/habit'

interface DayHabitsModalProps {
    isOpen: boolean
    onClose: () => void
    date: Date
    habits: Habit[]
    completions: HabitCompletion[]
    onToggleHabit: (habitId: string, date: string, completed: boolean) => void
}

export function DayHabitsModal({
    isOpen,
    onClose,
    date,
    habits,
    completions,
    onToggleHabit,
}: DayHabitsModalProps) {
    if (!isOpen) return null

    const dateStr = date.toISOString().split('T')[0]

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        {date.toLocaleDateString('default', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <div className="w-5 h-5">x</div>
                    </button>
                </div>
                <div className="space-y-3">
                    {habits.map((habit) => {
                        const completion = completions.find(
                            (c) => c.habitId === habit.id && c.date === dateStr
                        )
                        return (
                            <button
                                key={habit.id}
                                onClick={() =>
                                    onToggleHabit(
                                        habit.id,
                                        dateStr,
                                        !completion?.completed
                                    )
                                }
                                className="w-full flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50"
                            >
                                <span className="flex items-center gap-3">
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: habit.color }}
                                    />
                                    {habit.title}
                                </span>
                                <div
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${
                      completion?.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300'
                  }`}
                                >
                                    {completion?.completed && (
                                        <div className="w-4 h-4 text-white" />
                                    )}
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
