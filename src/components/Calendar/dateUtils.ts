export function getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

export function startOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function endOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

export function eachDayOfInterval(start: Date, end: Date): Date[] {
    const days: Date[] = []
    const currentDate = new Date(start)

    while (currentDate <= end) {
        days.push(new Date(currentDate))
        currentDate.setDate(currentDate.getDate() + 1)
    }

    return days
}

export function format(date: Date, format: string): string {
    switch (format) {
        case 'd':
            return date.getDate().toString()
        default:
            return date.toLocaleDateString()
    }
}

export function isToday(date: Date): boolean {
    const today = new Date()
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    )
}

export function isPast(date: Date): boolean {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    date.setHours(0, 0, 0, 0)
    return date < today
}

export function addDays(date: Date, days: number): Date {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
}

export function subDays(date: Date, days: number): Date {
    const result = new Date(date)
    result.setDate(result.getDate() - days)
    return result
}
