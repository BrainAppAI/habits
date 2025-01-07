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
        isChecked ? COLORS_TO_CLASS[color].BG : 'bg-white'
    } ${COLORS_TO_CLASS[color].BORDER}`

    return (
        <Component
            className={`md:w-5 w-4 md:h-5 h-4 md:p-1.5 p-1 flex justify-center items-center text-white md:rounded-md rounded-sm border-[1.6px] ${bgBorderClasses}`}
            onClick={Component === 'button' ? onClick : undefined}
        >
            <div className="md:block hidden">
                <Icons.Check size={15} />
            </div>
            <div className="md:hidden block">
                <Icons.Check size={10} />
            </div>
        </Component>
    )
}

export default CheckMark
