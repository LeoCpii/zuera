import { useState } from 'react';

export default function useMultiSelect<T extends Record<string, any>>(data: T[], selecteds: T[]) {
    const [_selecteds, setSelecteds] = useState<T[]>(selecteds);

    const changeSelecteds = (item: T) => {
        const index = _selecteds.findIndex(s => s === item);

        if (index === -1) {
            setSelecteds([..._selecteds, item]);
        } else {
            setSelecteds(_selecteds.filter(s => s !== item));
        }
    };

    return { original: data, selecteds: _selecteds, changeSelecteds };
}
