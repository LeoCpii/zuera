import { Meta, StoryObj } from '@storybook/react';

import Box from '@/components/Box';
import Stack from '@/components/Stack';
import Typography from '@/components/Typography';

import Container from './Container';

const meta: Meta<typeof Container> = {
    title: 'components/Container',
    component: Container,
};

export const Fluid: StoryObj<typeof Container> = {
    render: () => {
        return (
            <Stack justifyContent="center">
                <Container>
                    <Box sx={{
                        p: 2,
                        backgroundColor: ({ primary }) => primary.main
                    }}>
                        <Typography color="primary.contrastText">Container</Typography>
                    </Box>
                </Container>
            </Stack >
        );
    }
};

export default meta;