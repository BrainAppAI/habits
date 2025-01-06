import { Habit, HabitCompletion } from '../../types/habit'
import CheckMark from './CheckMark'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { DialogHeader } from '../ui/dialog'
import Icons from '@/assets/icons'

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
        <Dialog onOpenChange={(s) => (!s ? onClose() : null)} open={isOpen}>
            <DialogContent className="sm:max-w-[420px]">
                <Button
                    onClick={onClose}
                    variant="tertiary"
                    size="sm"
                    className="absolute top-4 right-4"
                >
                    <span>
                        <Icons.Close size={18} />
                    </span>
                </Button>
                <DialogHeader className="items-start justify-start w-full px-6">
                    <DialogTitle className="text-[32px]">
                        {date.toLocaleDateString('default', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </DialogTitle>
                </DialogHeader>

                <div className="w-full flex flex-col gap-2 mb-6 px-4">
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
                                className="w-full group hover:bg-slate-50 rounded-lg p-2 transition-all ease-in-out duration-200 flex justify-between items-center group"
                            >
                                <div className="flex items-center gap-3 flex-grow overflow-hidden">
                                    <CheckMark
                                        isChecked={Boolean(
                                            completion?.completed
                                        )}
                                        color={habit.color}
                                    />
                                    <p
                                        className={`text-sm font-medium line-clamp-1 text-slate-950 ${
                                            completion?.completed
                                                ? 'line-through'
                                                : ''
                                        }`}
                                    >
                                        {habit.title}
                                    </p>
                                </div>
                            </button>
                        )
                    })}

                    {!habits.length ? (
                        <p className="text-slate-400 text-sm text-center">
                            No Habits yet.
                        </p>
                    ) : null}
                </div>
            </DialogContent>
        </Dialog>
    )
}
