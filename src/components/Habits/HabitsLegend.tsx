import Icons from '@/assets/icons'
import { Habit } from '../../types/habit'
import { COLORS_TO_CLASS, HabitColor } from '@/utils/colorUtils'

interface HabitsLegendProps {
    habits: Habit[]
}

export function HabitsLegend({ habits }: HabitsLegendProps) {
    return (
        <div className="flex items-center gap-40 bg-slate-900 px-6 py-8">
            <Icons.HabitsLogo />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

const CheckMark = ({
    isChecked = true,
    color,
}: {
    isChecked: boolean
    color: HabitColor
}) => {
    if (!color) return null
    const bgBorderClasses = `${
        isChecked ? COLORS_TO_CLASS[color].BG : 'bg-white'
    } ${COLORS_TO_CLASS[color].BORDER}`

    return (
        <div
            className={`w-6 h-6 p-1.5 flex justify-center items-center rounded-md border-2 ${bgBorderClasses}`}
        >
            <Icons.Check />
        </div>
    )
}
