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
            className={`w-6 h-6 p-1.5 flex justify-center items-center text-white rounded-md border-2 ${bgBorderClasses}`}
            onClick={Component === 'button' ? onClick : undefined}
        >
            <div>
                <Icons.Check size={18} />
            </div>
        </Component>
    )
}

export default CheckMark
