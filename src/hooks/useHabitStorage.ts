import { Completions, Habit } from '@/types/habit'
import { useEffect, useState } from 'react'

const HABITS_KEY = 'habits'
const COMPLETIONS_PREFIX = 'completions_'

export function useHabitStorage(year: number, month: number) {
    const [habits, setHabits] = useState<Habit[]>([])
    const [habitCompletions, setHabitCompletions] = useState<Completions>({})
    const [loading, setLoading] = useState(true)

    const completionKey = `${COMPLETIONS_PREFIX}${year}_${month}`

    useEffect(() => {
        async function loadData() {
            const storedData = await chrome.storage.local.get([
                HABITS_KEY,
                completionKey,
            ])
            const storedHabits = storedData[HABITS_KEY] || []
            const storedCompletions: Completions =
                storedData[completionKey] || {}

            setHabits(storedHabits)
            setHabitCompletions(storedCompletions)
            setLoading(false)
        }

        loadData()
    }, [completionKey])

    async function saveCompletions(updatedCompletions: Completions) {
        await chrome.storage.local.set({ [completionKey]: updatedCompletions })
    }

    async function createHabit(habit: Habit) {
        const updatedHabits = [...habits, habit]
        setHabits(updatedHabits)
        await chrome.storage.local.set({ [HABITS_KEY]: updatedHabits })
    }

    async function createMultipleHabits(mHabits: Habit[]) {
        const updatedHabits = [...habits, ...mHabits]
        setHabits(updatedHabits)
        await chrome.storage.local.set({ [HABITS_KEY]: updatedHabits })
    }

    async function markHabitCompleted(habitId: string, date: string) {
        const updatedCompletions = { ...habitCompletions }
        if (!updatedCompletions[date]) {
            updatedCompletions[date] = []
        }
        if (!updatedCompletions[date].includes(habitId)) {
            updatedCompletions[date].push(habitId)
            setHabitCompletions(updatedCompletions)
            await saveCompletions(updatedCompletions)
        }
    }

    async function unmarkHabitCompleted(habitId: string, date: string) {
        const updatedCompletions = { ...habitCompletions }
        if (updatedCompletions[date]?.includes(habitId)) {
            updatedCompletions[date] = updatedCompletions[date].filter(
                (id) => id !== habitId
            )

            if (updatedCompletions[date].length === 0) {
                delete updatedCompletions[date]
            }

            setHabitCompletions(updatedCompletions)
            await saveCompletions(updatedCompletions)
        }
    }

    async function clearAllData() {
        const keys = await chrome.storage.local.get(null)
        const keysToDelete = Object.keys(keys).filter(
            (key) => key.startsWith(COMPLETIONS_PREFIX) || key === HABITS_KEY
        )
        await chrome.storage.local.remove(keysToDelete)
        setHabits([])
        setHabitCompletions({})
    }

    return {
        habits,
        habitCompletions,
        loading,
        createHabit,
        createMultipleHabits,
        markHabitCompleted,
        unmarkHabitCompleted,
        clearAllData,
    }
}
