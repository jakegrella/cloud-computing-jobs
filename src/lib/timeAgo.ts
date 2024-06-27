export function timeAgo(publishedDate: string) {
    if (!publishedDate) return 'Draft'

    const currentDate: Date = new Date();
    const inputDate: Date = new Date(publishedDate);
    const diffInSeconds: number = Math.floor((currentDate.getTime() - inputDate.getTime()) / 1000);

    const units = [
        { name: "year", seconds: 31536000 },
        { name: "month", seconds: 2592000 },
        { name: "week", seconds: 604800 },
        { name: "day", seconds: 86400 },
        { name: "hour", seconds: 3600 },
        { name: "minute", seconds: 60 },
        { name: "second", seconds: 1 },
    ];

    for (const unit of units) {
        const quotient = Math.floor(diffInSeconds / unit.seconds);
        if (quotient > 0) {
            return `${quotient} ${unit.name}${quotient > 1 ? 's' : ''} ago`;
        }
    }

    return "Just Now";
};
