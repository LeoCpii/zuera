function sanitize(value: string) {
    return value.normalize('NFD')
        .trim().toLowerCase()
        .replace(/a-zA-Z0-9_.-+/g, '')
        .replace(/_/g, '')
        .replace(/[^\w\s]/gi, '');
};

export function getInitials(name: string) {
    const names: string[] = name.trim().split(' ');

    const hasOneName = names.length === 1;

    const firstInitial = sanitize(names[0]).charAt(0).toLocaleUpperCase();

    const secondInitial = hasOneName
        ? sanitize(names[0]).charAt(1).toLocaleUpperCase()
        : sanitize(names.reverse()[0]).charAt(0).toLocaleUpperCase();

    return firstInitial + secondInitial;
};

export function slug(str: string) {
    if (!str) { return ''; }

    return str.normalize('NFD')
        .trim().toLowerCase()
        .replace(/a-zA-Z0-9_.-+/g, '')
        .replace(/_/g, '')
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
}

export function capitalize(str: string) {
    if (!str) { return ''; }
    return str[0].toUpperCase() + str.slice(1);
}
