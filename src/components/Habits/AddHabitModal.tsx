import React, { useEffect, useState } from 'react'
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

interface AddHabitModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    showModal: boolean
    existingHabits: Habit[]
    handleCreateMultipleHabits: (habits: Habit[]) => void
}

export function AddHabitModal({
    setShowModal,
    showModal,
    existingHabits,
    handleCreateMultipleHabits,
}: AddHabitModalProps) {
    const [localHabits, setLocalHabits] = useState<Habit[]>(
        existingHabits.length ? existingHabits : []
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (localHabits.length && !localHabits[localHabits.length - 1].title) {
            return null
        }
        const newHabit = {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            title: '',
            color: HABIT_COLORS[localHabits.length],
        }
        setLocalHabits((habits) => [...habits, newHabit])
    }

    useEffect(() => {
        if (!showModal) {
            // Modal is getting closed
            const newHabitsToSave = localHabits.filter((habit) => {
                // Habit should have a title
                return (
                    habit.title &&
                    !existingHabits.some((x) => x.id === habit.id)
                )
            })

            setLocalHabits([])

            console.log('new habits to save', newHabitsToSave)
            if (newHabitsToSave.length)
                handleCreateMultipleHabits(newHabitsToSave)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showModal, existingHabits])

    const onClose = () => setShowModal(false)

    return (
        <Dialog onOpenChange={setShowModal} open={showModal}>
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
                                <li className="w-full group hover:bg-slate-50 rounded-lg transition-all p-2 ease-in-out duration-200 flex justify-between items-center group">
                                    <div className="flex items-center flex-grow overflow-hidden">
                                        <CheckMark
                                            isChecked={false}
                                            color={habit.color}
                                        />
                                        <input
                                            className="w-full ml-3 text-left text-sm text-slate-950 transition-all ease-in-out duration-200 font-medium truncate overflow-hidden whitespace-nowrap leading-5 outline-none group-hover:bg-slate-50"
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
                                        />
                                    </div>
                                    <button
                                        className="ml-auto group-hover:block hidden bg-transparent text-slate-400 hover:text-red-600 transition-all ease-in-out duration-200 flex-shrink-0"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            e?.nativeEvent?.stopImmediatePropagation()
                                            setLocalHabits((habits) => {
                                                return habits.filter(
                                                    (x) => x.id !== habit.id
                                                )
                                            })
                                        }}
                                        onMouseDown={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            setLocalHabits((habits) => {
                                                return habits.filter(
                                                    (x) => x.id !== habit.id
                                                )
                                            })
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
                        disabled={
                            localHabits.length
                                ? !localHabits[localHabits.length - 1].title
                                : false
                        }
                    >
                        <span>
                            <Icons.Plus size={18} />
                        </span>
                        Add Habit
                        <span className="sr-only">Add New Habit</span>
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
