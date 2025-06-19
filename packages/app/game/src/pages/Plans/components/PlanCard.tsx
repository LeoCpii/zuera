import Stack from '@zuera/ui/components/Stack';
import Typography from '@zuera/ui/components/Typography';
import { Card, CardContent } from '@zuera/ui/components/Card';

import { Plan } from '@zuera/services/plans';

import Dot from './Dot';

interface CardIntegrationProps { plan: Plan; onClick: (plan: Plan) => void; }
export default function PlanCard({ plan, onClick }: CardIntegrationProps) {
    return (
        <Card onClick={onClick}>
            <CardContent>
                <Stack orientation="row" alignItems="center" spacing="small">
                    <Dot color={plan?.color || ''} />
                    <Typography noMargin variant="h6">{plan.name}</Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}