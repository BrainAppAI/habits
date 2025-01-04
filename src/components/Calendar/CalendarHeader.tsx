import Icons from '@/assets/icons'
import { Button } from '../ui/button'

interface CalendarHeaderProps {
    currentDate: Date
    onPrevMonth: () => void
    onNextMonth: () => void
}

export function CalendarHeader({
    currentDate,
    onPrevMonth,
    onNextMonth,
}: CalendarHeaderProps) {
    return (
        <div className="flex items-center gap-4">
            <Button
                variant="tertiary"
                size="sm"
                onClick={onPrevMonth}
                aria-label="Previous month"
            >
                <Icons.ArrowLeft size={16} />
            </Button>

            <h1 className="text-[32px] text-gray-800 space-x-2">
                <span className="font-semibold">
                    {currentDate.toLocaleString('default', {
                        month: 'long',
                    })}
                </span>
                <span>
                    {currentDate.toLocaleString('default', {
                        year: 'numeric',
                    })}
                </span>
            </h1>

            <Button
                variant="tertiary"
                size="sm"
                onClick={onNextMonth}
                aria-label="Next month"
            >
                <Icons.ArrowRight size={16} />
            </Button>
        </div>
    )
}
