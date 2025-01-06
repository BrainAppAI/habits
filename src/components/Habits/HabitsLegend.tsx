import Icons from '@/assets/icons'
import { Habit } from '../../types/habit'
import CheckMark from './CheckMark'

interface HabitsLegendProps {
    habits: Habit[]
}

export function HabitsLegend({ habits }: HabitsLegendProps) {
    return (
        <div className="w-full flex items-center gap-40 bg-slate-900 px-8 py-6 mx-auto">
            <Icons.HabitsLogo />

            <div className="flex flex-wrap gap-4">
                {habits.map((habit) => (
                    <div
                        key={habit.id}
                        className="flex items-center gap-2 text-white"
                    >
                        <CheckMark color={habit.color} isChecked />
                        <span className="text-sm">{habit.title}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
