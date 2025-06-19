import { useRef, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import useOutsideClick from './useOutsideClick';

const meta: Meta<typeof useOutsideClick> = {
    title: 'hooks/useOutsideClick'
};

export const Template: StoryObj<typeof useOutsideClick> = {
    render: () => {
        const ref = useRef(null);
        const [visible, setVisible] = useState(false);

        useOutsideClick(ref as any, () => setVisible(false));

        return (
            <div>
                <h1>Visível: {visible.toString()}</h1>

                <button onClick={() => setVisible(true)}>Mostrar</button>

                <div ref={ref} style={{
                    display: visible ? 'block' : 'none',
                    width: 100,
                    height: 100,
                    backgroundColor: 'red',
                    marginTop: 20,
                }} />
            </div>
        );
    }
};

export default meta;
