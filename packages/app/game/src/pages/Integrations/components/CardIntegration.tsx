import Stack from '@zuera/ui/components/Stack';
import Avatar from '@zuera/ui/components/Avatar';
import Typography from '@zuera/ui/components/Typography';
import { Card, CardContent } from '@zuera/ui/components/Card';

import { Integration } from '@zuera/services/integrations';

interface CardIntegrationProps { integration: Integration; onClick: (integration: Integration) => void; }
export default function CardIntegration({ integration, onClick }: CardIntegrationProps) {
    return (
        <Card onClick={onClick}>
            <CardContent>
                <Stack orientation="row" alignItems="center">
                    <Avatar src={integration.image} />
                    <Typography noMargin variant="h6">{integration.name}</Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}