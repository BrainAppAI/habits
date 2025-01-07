import { HabitColor } from '@/utils/colorUtils'

import Icons from '@/assets/icons'
import { COLORS_TO_CLASS } from '@/utils/colorUtils'

const CheckMark = ({
    isChecked = true,
    color,
    as: Component = 'div',
    onClick,
}: {
    isChecked: boolean
    color: HabitColor
    as?: 'div' | 'button'
    onClick?: React.MouseEventHandler<HTMLElement>
}) => {
    if (!color) return null
    const bgBorderClasses = `${
        isChecked ? COLORS_TO_CLASS[color].BG : 'bg-white dark:bg-slate-800'
    } ${COLORS_TO_CLASS[color].BORDER}`

    return (
        <Component
            className={`md:w-5 mob:w-4 w-3.5 md:h-5 mob:h-4 h-3.5 mob:p-1 md:p-1.5 p-0.5 flex text-white justify-center items-center ${
                !isChecked ? 'dark:text-slate-800' : null
            } md:rounded-md rounded-sm border-[1.6px] ${bgBorderClasses}`}
            onClick={Component === 'button' ? onClick : undefined}
        >
            <div className="hidden md:block mob:hidden">
                <Icons.Check size={15} />
            </div>
            <div className="hidden md:hidden mob:block">
                <Icons.Check size={10} />
            </div>
            <div className="block md:hidden mob:hidden">
                <Icons.Check size={8} />
            </div>
        </Component>
    )
}

export default CheckMark
