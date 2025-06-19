import { Meta, StoryObj } from '@storybook/react';

import Chip from '@/components/Chip';
import Slide from '@/animations/Slide';
import Button from '@/components/Button';

import Table from './Table';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableHeader from './TableHeader';
import Stack from '../Stack';

const meta: Meta<typeof Table> = {
    title: 'components/Table',
    component: Table,
};

const rows = [
    { id: 1, name: 'charmander', type: 'fire', level: 5 },
    { id: 2, name: 'squirtle', type: 'water', level: 5 },
    { id: 3, name: 'bulbasaur', type: 'grass', level: 5 },
    { id: 4, name: 'pikachu', type: 'electric', level: 5 },
    { id: 5, name: 'eevee', type: 'normal', level: 5 },
    { id: 6, name: 'abra', type: 'psychic', level: 5 },
];

const TYPE_MAP = {
    fire: { icon: '🔥', color: '#ff6500' },
    water: { icon: '💧', color: '#00a9ff' },
    grass: { icon: '🌿', color: '#00ff00' },
    electric: { icon: '⚡', color: '#ffea00' },
    normal: { icon: '🔘', color: '#a0a0a0' },
    psychic: { icon: '🔮', color: '#ff00ff' },
};

export const Template: StoryObj<typeof Table> = {
    render: () => {
        return (
            <Table>
                <TableHeader>
                    <TableCell align="center" style={{ width: 50 }}>id</TableCell>
                    <TableCell align="right">tipo</TableCell>
                    <TableCell align="right">nome</TableCell>
                    <TableCell align="right">level</TableCell>
                    <TableCell align="center">Ação</TableCell>
                </TableHeader>
                <TableBody>
                    {
                        rows.map((row, i) => {
                            const map = TYPE_MAP[row.type];

                            return (
                                <Slide
                                    enter
                                    key={i}
                                    tag="tr"
                                    direction="left"
                                    delay={(i + 1) * 100}
                                >
                                    <TableCell align="center">{row.id || '-'}</TableCell>
                                    <TableCell align="right">
                                        {
                                            <Stack orientation="row" alignItems="center">
                                                <Chip
                                                    style={{
                                                        backgroundColor: 'transparent',
                                                        borderColor: map.color,
                                                    }}
                                                    label={`${map.icon} ${row.type}`}
                                                />
                                                <Chip
                                                    style={{
                                                        backgroundColor: 'transparent',
                                                        borderColor: map.color,
                                                    }}
                                                    label={`${map.icon} ${row.type}`}
                                                />
                                            </Stack>
                                        }
                                    </TableCell>
                                    <TableCell align="right">{row.name || '-'}</TableCell>
                                    <TableCell align="right">{row.level || '-'}</TableCell>
                                    <TableCell align="center">
                                        <Button size="small" onClick={() => console.debug(row)}>
                                            Deletar
                                        </Button>
                                    </TableCell>
                                </Slide>
                            );
                        })
                    }
                </TableBody>
            </Table>
        );
    }
};

export default meta;