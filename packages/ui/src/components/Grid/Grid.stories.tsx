import { Meta, StoryObj } from '@storybook/react';

import Grid from './Grid';
import GridItem from './GridItem';

const meta: Meta<typeof Grid> = {
    title: 'components/Grid',
    component: Grid,
};

function Item() {
    return (
        <div style={{ backgroundColor: 'rgba(0,0,0,.3)' }}>
            <span>col</span>
        </div>
    );
}

export const SameGrid: StoryObj<typeof Grid> = {
    render: () => {
        return (
            <Grid xl={3} lg={4} md={6} sm={12}  >
                <GridItem>
                    <Item />
                </GridItem>
                <GridItem>
                    <Item />
                </GridItem>
                <GridItem>
                    <Item />
                </GridItem>
                <GridItem>
                    <Item />
                </GridItem>
            </Grid>
        );
    }
};

export const ChildrenWithDifferentGrid: StoryObj<typeof Grid> = {
    render: () => {
        return (
            <Grid xl={3} lg={4} md={6} sm={12}>
                <GridItem md={12} lg={8}>
                    <Item />
                </GridItem>
                <GridItem lg={4}>
                    <Item />
                </GridItem>
                <GridItem lg={3}>
                    <Item />
                </GridItem>
                <GridItem md={8} lg={6}>
                    <Item />
                </GridItem>
                <GridItem md={4}>
                    <Item />
                </GridItem>
            </Grid>
        );
    }
};

export default meta;