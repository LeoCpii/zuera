import Box from '@zuera/ui/components/Box';
import Logo from '@zuera/ui/components/Logo';
import Slide from '@zuera/ui/animations/Slide';
import Stack from '@zuera/ui/components/Stack';
import Button from '@zuera/ui/components/Button';
import Container from '@zuera/ui/components/Container';
import Typography from '@zuera/ui/components/Typography';
import { Card, CardContent } from '@zuera/ui/components/Card';

import { useAuth } from '@zuera/common/Auth';

import { release, url } from '@/services/core';

export default function Signin() {
    const { loginWithGoogle } = useAuth();

    const handleLoginWithGoogle = async () => {
        loginWithGoogle()
            .then(async (token) => {
                window.open(`${url.game}?token=${token}`, '_self');
            });
    };

    return (
        <Slide enter direction="top">
            <Stack
                spacing="medium"
                justifyContent="center"
                style={{ height: '100vh' }}
                sx={{ backgroundColor: ({ background }) => background.paper }}
            >
                <Container sm="100%" md={500} lg={500}>
                    <Box sx={{ mb: 2 }} textAlign="center">
                        <Logo
                            width={150}
                            secondary='text.primary'
                            style={{ margin: 'auto' }}
                        />
                    </Box>
                    <Button
                        fullWidth
                        size="large"
                        type="button"
                        variant="outlined"
                        startIcon={
                            <img
                                src="https://cdn.clubedoafiliado.com/assets/icons/google.svg"
                                width={15}
                            />
                        }
                        sx={{ color: ({ text }) => text.secondary }}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onClick={handleLoginWithGoogle}
                    >
                        Entrar com o Google
                    </Button>
                    <Box sx={{ mt: 2 }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            style={{ textAlign: 'center' }}
                        >
                            Joga jogos - © 2025
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            style={{ textAlign: 'center' }}
                        >
                            Versão: {release}
                        </Typography>
                    </Box>
                </Container>
            </Stack>
        </Slide>
    );
}