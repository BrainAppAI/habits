import React, { useState } from 'react'
import { Habit } from '../../types/habit'
import {
    COLORS_TO_CLASS,
    HABIT_COLORS,
    HabitColor,
} from '../../utils/colorUtils'

interface AddHabitModalProps {
    isOpen: boolean
    onClose: () => void
    onAdd: (habit: Omit<Habit, 'id' | 'createdAt'>) => void
    existingHabits: Habit[]
}

export function AddHabitModal({ isOpen, onClose, onAdd }: AddHabitModalProps) {
    const [title, setTitle] = useState('')
    const [color, setColor] = useState<HabitColor>(HABIT_COLORS[0])

    if (!isOpen) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onAdd({ title, color })
        setTitle('')
        setColor(color || HABIT_COLORS[0])
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
                                const bgColor = COLORS_TO_CLASS[c].BG
                                const isSelected = color === c
                                return (
                                    <button
                                        key={c}
                                        type="button"
                                        onClick={() => setColor(c)}
                                        className={`w-8 h-8 rounded-lg transition-opacity ${bgColor} ${
                                            isSelected
                                                ? 'border-2 border-slate-700'
                                                : ''
                                        }`}
                                    />
                                )
                            })}
                        </div>
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
                        >
                            Add Habit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
