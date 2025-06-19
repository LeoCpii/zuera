interface TableHeaderProps { children: React.ReactNode; }
function TableHeader({ children }: TableHeaderProps) {
    return (
        <thead className="ui-table__header">
            <tr>
                {children}
            </tr>
        </thead>
    );
}

TableHeader.displayName = 'TableHeader';

export default TableHeader;