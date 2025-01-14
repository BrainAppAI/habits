import React, { useRef, useState } from 'react'
import { Habit } from '../../types/habit'
import { HABIT_COLORS } from '../../utils/colorUtils'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '../ui/dialog'
import Icons from '@/assets/icons'
import { Button } from '../ui/button'
import CheckMark from './CheckMark'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import DialogCloseButton from '../ui/dialog-close-btn'

interface AddHabitModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    showModal: boolean
    existingHabits: Habit[]
    handleSetAllHabits: (habits: Habit[]) => void
    handleDeleteHabit: (habitId: string) => void
}

const MAX_HABITS = 8

export function AddHabitModal({
    setShowModal,
    showModal,
    existingHabits,
    handleSetAllHabits,
    handleDeleteHabit,
}: AddHabitModalProps) {
    const [localHabits, setLocalHabits] = useState<Habit[]>(
        existingHabits.length ? existingHabits : []
    )
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    //  Refs
    const deletingHabit = useRef('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (
            (localHabits.length &&
                !localHabits[localHabits.length - 1].title) ||
            localHabits.length >= MAX_HABITS
        ) {
            return null
        }
        const newHabit = {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            title: '',
            color: HABIT_COLORS.filter(
                (color) => !localHabits.some((x) => x.color === color)
            )[0],
        }
        setLocalHabits((habits) => [...habits, newHabit])
    }

    const saveHabits = () => {
        // Filter out habits without titles
        const validHabits = localHabits.filter(
            (habit) => habit.title.trim() !== ''
        )
        handleSetAllHabits(validHabits)
        setLocalHabits(validHabits) // Reset to only valid habits
    }

    const setToDelete = (habitId: string) => {
        deletingHabit.current = habitId
        setShowDeleteModal(true)
    }

    const handleDialogClose = () => {
        saveHabits()
        setShowModal(false)
    }

    const isHabitBtnDisabled =
        (localHabits.length && !localHabits.at(-1)?.title) ||
        localHabits.length >= MAX_HABITS

    return (
        <Dialog
            onOpenChange={(s) => {
                if (!s) saveHabits()
                setShowModal(s)
            }}
            open={showModal}
        >
            <DialogContent className="sm:max-w-[420px]">
                <DialogCloseButton onClose={handleDialogClose} />
                <DialogHeader className="items-start justify-start w-full px-6">
                    <DialogTitle className="text-[32px]">Habits</DialogTitle>
                    <DialogDescription className="px-0 text-sm font-medium text-slate-600 -mt-1">
                        {localHabits.length}/8 habits added
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col items-center justify-center px-4 pb-6"
                >
                    <div className="w-full flex flex-col gap-2 mb-6">
                        {localHabits.map((habit) => {
                            return (
                                <li className="w-full group hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all p-2 ease-in-out duration-200 flex justify-between items-center group">
                                    <div className="flex items-center flex-grow overflow-hidden">
                                        <CheckMark
                                            isChecked={false}
                                            color={habit.color}
                                        />
                                        <input
                                            className="w-full ml-3 text-left text-sm bg-white dark:bg-slate-900 text-slate-950 dark:text-white transition-all ease-in-out duration-200 font-medium truncate overflow-hidden whitespace-nowrap leading-5 outline-none group-hover:bg-slate-50 dark:group-hover:bg-slate-800"
                                            value={habit.title}
                                            onChange={(e) => {
                                                setLocalHabits((habits) => {
                                                    return habits.map((x) => {
                                                        if (x.id === habit.id)
                                                            return {
                                                                ...x,
                                                                title: e.target
                                                                    .value,
                                                            }
                                                        return x
                                                    })
                                                })
                                            }}
                                            maxLength={32}
                                        />
                                    </div>
                                    <button
                                        className="ml-auto group-hover:block hidden bg-transparent text-slate-400 hover:text-red-600 transition-all ease-in-out duration-200 flex-shrink-0"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            e?.nativeEvent?.stopImmediatePropagation()
                                            setToDelete(habit.id)
                                        }}
                                        onMouseDown={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            setToDelete(habit.id)
                                        }}
                                    >
                                        <span>
                                            <Icons.Trash03 size={18} />
                                        </span>
                                    </button>
                                </li>
                            )
                        })}

                        {!localHabits.length ? (
                            <p className="text-slate-400 text-sm text-center">
                                No Habits yet.
                            </p>
                        ) : null}
                    </div>
                    <Button
                        variant="tertiary"
                        type="submit"
                        className="flex items-center gap-1"
                        size="sm"
                        disabled={isHabitBtnDisabled}
                    >
                        <span>
                            <Icons.Plus size={18} />
                        </span>
                        Add Habit
                        <span className="sr-only">Add New Habit</span>
                    </Button>
                </form>
            </DialogContent>

            <DeleteConfirmationModal
                title="You're about to delete this habit!"
                description="Once deleted, it will not show up in the calendar, all completed instances for this habit will be lost forever."
                setShowModal={setShowDeleteModal}
                showModal={showDeleteModal}
                onDeleteConfirmed={() => {
                    if (deletingHabit.current) {
                        setLocalHabits((habits) =>
                            habits.filter((x) => x.id !== deletingHabit.current)
                        )
                        handleDeleteHabit(deletingHabit.current)
                        setShowDeleteModal(false)
                    }
                }}
                onDeleteDenied={() => setShowDeleteModal(false)}
                confirmedBtnLoading={false}
            />
        </Dialog>
    )
}
