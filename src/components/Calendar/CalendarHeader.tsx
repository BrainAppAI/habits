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
            <h1 className="text-[32px] text-gray-800 space-x-2">
                <span className="font-semibold">
                    {currentDate.toLocaleString('default', {
                        month: 'short',
                    })}
                </span>
                <span>
                    {currentDate.toLocaleString('default', {
                        year: 'numeric',
                    })}
                </span>
            </h1>
            <div className="flex items-center gap-0.5">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onPrevMonth}
                    aria-label="Previous month"
                >
                    <Icons.ArrowLeft size={16} />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onNextMonth}
                    aria-label="Next month"
                >
                    <Icons.ArrowRight size={16} />
                </Button>
            </div>
        </div>
    )
}
