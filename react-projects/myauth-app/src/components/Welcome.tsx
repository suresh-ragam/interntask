import {Box, Button, Typography} from '@mui/material';
import {useNavigate } from 'react-router-dom';

export default function Welcome () {
    const navigate = useNavigate();
    //const userEmail = localStorage.getItem('currentUserEmail');

    const handleLogOut = () => {
        localStorage.removeItem('currentUserEmail');
        sessionStorage.removeItem('currentUserEmail');
        navigate('/login');
    }

    return (
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='100vh'>
            <Typography variant='h2'>Welcome, User!</Typography>
            <Button variant='contained' color='error' sx={{ mt: 2 }} onClick={handleLogOut}>Log out</Button>
        </Box>
    );
}