export function addDays(date: Date, addDays: number) {
    const copiedDate = new Date(date);
    copiedDate.setDate(date.getDate() + addDays);

    return copiedDate;
}

export function addMonths(data: Date, addMonths: number): Date {
    const copiedDate = new Date(data);
    copiedDate.setMonth(copiedDate.getMonth() + addMonths);

    return copiedDate;
}

export function subDays(date: Date, subDays: number) {
    const copiedDate = new Date(date);
    copiedDate.setDate(date.getDate() - subDays);

    return copiedDate;
}

export function subMonths(data: Date, subMonths: number): Date {
    const copiedDate = new Date(data);
    copiedDate.setMonth(copiedDate.getMonth() - subMonths);

    return copiedDate;
}

export function formatDate(date: Date, options = { separator: '-' }) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 pois getMonth() vai de 0 a 11
    const year = date.getFullYear();

    return [day, month, year].join(options.separator);
}

export function convertDate(str: string) {
    const [day, month, year] = str.split('-').map(Number);
    return new Date(year, month - 1, day);
}