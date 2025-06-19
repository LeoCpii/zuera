import { HTMLAttributes, ReactNode } from 'react';

import { Card } from '../../components/Card';

import './Table.scss';

interface TableProps extends HTMLAttributes<HTMLTableElement> { children: ReactNode; }
export default function Table({ children, ...props }: TableProps) {
    return (
        <Card style={{ overflow: 'auto' }}>
            <table className="ui-table" {...props}>
                {children}
            </table>
        </Card>
    );
}