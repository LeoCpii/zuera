import { HTMLAttributes } from 'react';

interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> { children: React.ReactNode; }
function TableBody({ children, ...props }: TableBodyProps) {
    return (
        <tbody className="ui-table__body" {...props}>
            {children}
        </tbody>
    );
}

TableBody.displayName = 'TableBody';

export default TableBody;