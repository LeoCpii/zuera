import { TdHTMLAttributes } from 'react';

import { joinClass } from '../../utils';
import createComponent from '../../core/createComponent';

interface TableCellProps extends TdHTMLAttributes<HTMLTableDataCellElement> {
    align?: 'left' | 'center' | 'right';
    children: React.JSX.Element | string | number | null;
}
function TableCell({ align = 'left', children, ...props }: TableCellProps) {
    const className = joinClass([
        'ui-table__cell',
        `ui-table__cell--${align}`,
    ]);

    return (
        <td className={className} {...props}>
            {children}
        </td>
    );
}

export default createComponent(TableCell);