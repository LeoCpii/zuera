import Icon from '@zuera/ui/components/Icon';
import Chip from '@zuera/ui/components/Chip';
import MultiSelect from '@zuera/ui/components/MultiSelect';
import { Checkbox, useControl } from '@zuera/ui/components';

import { RoleConfig } from '@zuera/services/roles';

import { useRoles } from '@zuera/common/Roles';

import { FilterForm } from '../Users';

export default function RolesChip() {
    const { control, update } = useControl<FilterForm, 'roles'>('roles');

    const { roles } = useRoles();

    const handleChange = (selecteds: RoleConfig[]) => {
        update(selecteds.map(i => i.id));
    };

    return (
        <MultiSelect
            fullWidth
            data={roles}
            identifier="id"
            selecteds={roles.filter(role => control.value.includes(role.id))}
            startIcon={<Icon name="shield" />}
            onChange={handleChange}
            renderOption={(data) => (
                <Checkbox name={data.name} label={data.name} value={data.id} />
            )}
            renderValue={(data) => (
                <Chip label={data.name} />
            )}
        />
    );
}