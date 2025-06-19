export function getFileSize(fileSizeInBytes: number): string {
    let i = -1;
    const byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
        fileSizeInBytes = fileSizeInBytes / 1024;
        i++;
    } while (fileSizeInBytes > 1024);
    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
}

type SizeUnit = 'Bytes' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB';

export function generateBytesSize(size: number, type: SizeUnit) {
    const units: Record<SizeUnit, number> = {
        'Bytes': 1,
        'KB': 1024,
        'MB': 1024 ** 2, // 1.048.576
        'GB': 1024 ** 3, // 1.073.741.824
        'TB': 1024 ** 4, // 1.099.511.627.776
        'PB': 1024 ** 5  // 1.125.899.906.842.624
    };

    return size * units[type];
}