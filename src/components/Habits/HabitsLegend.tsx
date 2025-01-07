import Icons from '@/assets/icons'
import { Habit } from '../../types/habit'
import CheckMark from './CheckMark'

interface HabitsLegendProps {
    habits: Habit[]
}

export function HabitsLegend({ habits }: HabitsLegendProps) {
    return (
        <div className="w-full flex items-center justify-between gap-10 bg-slate-900 md:px-8 px-4 md:py-6 py-3 mx-auto">
            <a
                target="_blank"
                href="https://brainapp.ai?ref=habits"
                className="cursor-pointer"
            >
                <Icons.HabitsLogo />
            </a>

            <div className="flex flex-wrap md:gap-4 gap-2">
                {habits.map((habit) => (
                    <div
                        key={habit.id}
                        className="flex items-center gap-2 text-white"
                    >
                        <CheckMark color={habit.color} isChecked />
                        <span className="md:text-sm text-xs">
                            {habit.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
