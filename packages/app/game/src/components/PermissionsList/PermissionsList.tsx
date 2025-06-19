import { useEffect, useState } from 'react';

import Stack from '@zuera/ui/components/Stack';
import Switch from '@zuera/ui/components/Switch';
import Typography from '@zuera/ui/components/Typography';
import { Grid, GridItem } from '@zuera/ui/components/Grid';

import permissions, { type Permissions } from '@zuera/services/permissions';

interface PermissionssListProps { onChange?: (data: Permissions[]) => void; value: Permissions[] }
export default function PermissionssList({ value, onChange }: PermissionssListProps) {
    const [data, setData] = useState<Permissions[]>(value);

    useEffect(() => { if (onChange) { onChange(data); } }, [data]);

    useEffect(() => { setData(value); }, [value]);

    const handleSelectPermissions = (Permissions: Permissions) => {
        const shouldRemove = data.includes(Permissions);

        if (shouldRemove) {
            setData(prev => prev.filter(p => p !== Permissions));
        } else {
            setData(prev => [...prev, Permissions]);
        }
    };

    return (
        <Grid xl={6} lg={6} md={6} sm={12} gap={0}>
            {
                permissions.map((permission) => (
                    <GridItem key={permission}>
                        <Stack orientation="row" alignItems="center">
                            <Switch
                                style={{ margin: 'inherit' }}
                                checked={data.includes(permission)}
                                onChange={() => handleSelectPermissions(permission)}
                            />
                            <Typography variant="body2" color="text.secondary">
                                {permission}
                            </Typography>
                        </Stack>
                    </GridItem>
                ))
            }
        </Grid>
    );
}