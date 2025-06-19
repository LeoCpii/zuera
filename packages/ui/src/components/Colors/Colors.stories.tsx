import { Meta, StoryObj } from '@storybook/react';

import joinClass from '@/utils/joinClass';
import { Grid, GridItem } from '@/components/Grid';

import './Colors.scss';

const meta: Meta<any> = {
    title: 'docs/Colors',
};

function Color({ color }: { color: string }) {
    const name = color.replace('--', ' ').replace('-', ' ');

    return (
        <div className={joinClass([color, 'color'])}>
            <span>{name}</span>
        </div>
    );
}

export const Theme: StoryObj = {
    render: () => {
        return (
            <div className="colors">
                <p>Palette</p>
                <hr />
                <Grid lg={2}>
                    <GridItem>
                        <Color color="primary--main" />
                    </GridItem>
                    <GridItem>
                        <Color color="primary--light" />
                    </GridItem>
                    <GridItem>
                        <Color color="primary--dark" />
                    </GridItem>

                    <GridItem>
                        <Color color="secondary--main" />
                    </GridItem>
                    <GridItem>
                        <Color color="secondary--light" />
                    </GridItem>
                    <GridItem>
                        <Color color="secondary--dark" />
                    </GridItem>

                    <GridItem>
                        <Color color="success--main" />
                    </GridItem>
                    <GridItem>
                        <Color color="success--light" />
                    </GridItem>
                    <GridItem>
                        <Color color="success--dark" />
                    </GridItem>

                    <GridItem>
                        <Color color="error--main" />
                    </GridItem>
                    <GridItem>
                        <Color color="error--light" />
                    </GridItem>
                    <GridItem>
                        <Color color="error--dark" />
                    </GridItem>

                    <GridItem>
                        <Color color="warning--main" />
                    </GridItem>
                    <GridItem>
                        <Color color="warning--light" />
                    </GridItem>
                    <GridItem>
                        <Color color="warning--dark" />
                    </GridItem>

                    <GridItem>
                        <Color color="info--main" />
                    </GridItem>
                    <GridItem>
                        <Color color="info--light" />
                    </GridItem>
                    <GridItem>
                        <Color color="info--dark" />
                    </GridItem>
                </Grid>

                <p>Text</p>
                <hr />
                <Grid lg={2}>
                    <GridItem>
                        <Color color="text-primary" />
                    </GridItem>
                    <GridItem>
                        <Color color="text-secondary" />
                    </GridItem>
                    <GridItem>
                        <Color color="text-disabled" />
                    </GridItem>
                </Grid>

                <p>Background</p>
                <hr />
                <Grid lg={2}>
                    <GridItem>
                        <Color color="background-paper" />
                    </GridItem>
                    <GridItem>
                        <Color color="background-default" />
                    </GridItem>
                </Grid>

                <p>Divider</p>
                <hr />
                <Grid lg={2}>
                    <GridItem>
                        <Color color="divider" />
                    </GridItem>
                </Grid>
            </div >
        );
    }
};

export default meta;