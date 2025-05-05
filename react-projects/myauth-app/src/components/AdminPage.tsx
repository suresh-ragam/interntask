import {Box, Button, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

export default function AdminPage() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('currentUserEmail');
    sessionStorage.removeItem('currentUserEmail');
    navigate('/login');
  }
  return (
    <Box display='flex' flexDirection='column' alignItems='center' justifyContent = 'center' height='100vh'>
        <Typography variant='h4'>Welcome, Admin</Typography>
        <Typography variant='body1' color='green'>You have admin access to this dashboard.</Typography>
        <Button variant='contained' color='error' sx = {{ mt: 2}} onClick={handleLogOut}>Log out</Button>
    </Box>
  )
}
