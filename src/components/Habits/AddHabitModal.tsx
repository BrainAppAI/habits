import React, { useState, useMemo } from 'react'
import { Habit } from '../../types/habit'
import { HABIT_COLORS, getAvailableColors } from '../../utils/colorUtils'

interface AddHabitModalProps {
    isOpen: boolean
    onClose: () => void
    onAdd: (habit: Omit<Habit, 'id' | 'createdAt'>) => void
    existingHabits: Habit[]
}

export function AddHabitModal({
    isOpen,
    onClose,
    onAdd,
    existingHabits,
}: AddHabitModalProps) {
    const [title, setTitle] = useState('')
    const availableColors = useMemo(
        () => getAvailableColors(existingHabits.map((h) => h.color)),
        [existingHabits]
    )
    const [color, setColor] = useState(availableColors[0] ?? HABIT_COLORS[0])

    if (!isOpen) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onAdd({ title, color })
        setTitle('')
        setColor(availableColors[0] ?? HABIT_COLORS[0])
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Add New Habit</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <div className="w-5 h-5">x</div>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Habit Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Color
                        </label>
                        <div className="flex gap-2 flex-wrap">
                            {HABIT_COLORS.map((c) => {
                                const isAvailable = availableColors.includes(c)
                                return (
                                    <button
                                        key={c}
                                        type="button"
                                        onClick={() =>
                                            isAvailable && setColor(c)
                                        }
                                        className={`w-8 h-8 rounded-full border-2 transition-opacity
                      ${color === c ? 'border-gray-900' : 'border-transparent'}
                      ${
                          !isAvailable
                              ? 'opacity-30 cursor-not-allowed'
                              : 'hover:opacity-80'
                      }
                    `}
                                        style={{ backgroundColor: c }}
                                        disabled={!isAvailable}
                                    />
                                )
                            })}
                        </div>
                        {availableColors.length === 0 && (
                            <p className="text-sm text-red-500 mt-2">
                                No colors available. Delete an existing habit to
                                add a new one.
                            </p>
                        )}
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={availableColors.length === 0}
                        >
                            Add Habit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
