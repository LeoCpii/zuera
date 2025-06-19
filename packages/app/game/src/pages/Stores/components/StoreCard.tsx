import { CSSProperties } from 'react';

import Stack from '@zuera/ui/components/Stack';
import Avatar from '@zuera/ui/components/Avatar';
import Typography from '@zuera/ui/components/Typography';
import { Card, CardContent } from '@zuera/ui/components/Card';

import { Site } from '@zuera/services/sites';

const TEXT_OVERFLOW: CSSProperties = {
    maxWidth: 'calc(100% - 32px)',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
};

interface CardIntegrationProps { site: Site; onClick: (site: Site) => void; }
export default function StoreCard({ site, onClick }: CardIntegrationProps) {
    return (
        <Card onClick={() => onClick(site)}>
            <CardContent>
                <Stack orientation="row" alignItems="center" spacing="small">
                    <Avatar src={site.theme.logo} />
                    <Stack spacing="small">
                        <Typography noMargin variant="body1" style={TEXT_OVERFLOW}>
                            {site.information.name}
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}