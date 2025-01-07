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

    async function setAllHabits(allHabits: Habit[]) {
        if (!Array.isArray(allHabits) || !allHabits.length) return
        setHabits(allHabits)
        await chrome.storage.local.set({ [HABITS_KEY]: allHabits })
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

    async function deleteHabit(habitId: string) {
        // Filter out the habit to be deleted
        const updatedHabits = habits.filter((habit) => habit.id !== habitId)
        setHabits(updatedHabits)

        // Update storage with the new habits list
        await chrome.storage.local.set({ [HABITS_KEY]: updatedHabits })

        // Fetch all keys from storage
        const storedData = await chrome.storage.local.get(null)
        const completionKeys = Object.keys(storedData).filter((key) =>
            key.startsWith(COMPLETIONS_PREFIX)
        )

        const updatedCompletions: Record<string, Completions> = {}

        // Update all completion keys
        for (const key of completionKeys) {
            const completions: Completions = storedData[key]
            const newCompletions: Completions = {}

            for (const date in completions) {
                const filteredCompletions = completions[date].filter(
                    (id) => id !== habitId
                )

                if (filteredCompletions.length > 0) {
                    newCompletions[date] = filteredCompletions
                }
            }

            // Save the updated completions for the current key
            updatedCompletions[key] = newCompletions
            await chrome.storage.local.set({ [key]: newCompletions })
        }

        // Update state for the current month/year
        if (updatedCompletions[completionKey]) {
            setHabitCompletions(updatedCompletions[completionKey])
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
        setAllHabits,
        deleteHabit,
        markHabitCompleted,
        unmarkHabitCompleted,
        clearAllData,
    }
}
