import { Habit } from '../../types/habit'

interface HabitsLegendProps {
    habits: Habit[]
}

export function HabitsLegend({ habits }: HabitsLegendProps) {
    return (
        <div className="flex flex-wrap gap-4">
            {habits.map((habit) => (
                <div key={habit.id} className="flex items-center gap-2">
                    <div
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: habit.color }}
                    >
                        <div className="w-3 h-3 text-white">check</div>
                    </div>
                    <span className="text-sm text-gray-600">{habit.title}</span>
                </div>
            ))}
        </div>
    )
}
