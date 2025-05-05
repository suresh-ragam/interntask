/*
import { Grid, Box } from '@mui/material';

type AuthLayoutProps = {
    imageUrl: string;
    children: React.ReactNode;
};

export default function AuthLayout({ imageUrl, children }: AuthLayoutProps) {
    return (
        <Grid container sx = {{ height: '100vh' }}>
            {/* left image }
            <Grid item xs={12} md={6} sx={{height:'100vh'}}>
                <Box 
                    sx = {{
                        height: '100%',
                        backgroundImage: `url(${imageUrl})`,
                
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></Box>
            </Grid>
            {/* right form }
            <Grid 
                item
                xs={12} 
                md={6} 
                sx = {{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box width='100%' maxWidth='400px' px={3}>
                    {children}
                </Box>
            </Grid>
        </Grid>
    );
}

*/