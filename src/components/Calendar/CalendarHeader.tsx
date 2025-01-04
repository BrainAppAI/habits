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
            <button
                onClick={onPrevMonth}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Previous month"
            >
                <div className="w-6 h-6 text-gray-600">left</div>
            </button>

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

            <button
                onClick={onNextMonth}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Next month"
            >
                <div className="w-6 h-6 text-gray-600">right</div>
            </button>
        </div>
    )
}
