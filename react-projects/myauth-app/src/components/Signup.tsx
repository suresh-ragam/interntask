import { Box, Button, TextField, Typography, Link, Snackbar, Alert, Paper, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import { Link as RouterLink, useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react'; 
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
//import AuthLayout from './AuthLayout';

const SignupSchema = Yup.object({
    email: Yup.string().email('Invalid email').required("Required"),
    password: Yup.string().min(6, 'Minimum 6 chars needed').required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required')
});

 

export default function Signup() {
    const [openSnackbar, setOpenSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const currentUserEmail = localStorage.getItem('currentUserEmail') || sessionStorage.getItem('currentUserEmail');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users.find((u: any) => u.email === currentUserEmail);

    if(currentUser?.isAdmin) {
        return <Navigate to='/admin' replace />
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleSnackbarClose = () => {
        setOpenSnackbar((prev) => ({ ...prev, open: false }));
    };

    return (
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100vh'>
            {/* <img src="https://images.stockcake.com/public/6/6/f/66f0fd4a-d088-46f4-9e64-2b6d789d1521_large/vintage-computer-workspace-stockcake.jpg" alt="" /> */}
            <Typography variant='h4' gutterBottom>Sign Up</Typography>
            <Paper elevation={4} sx = {{ p: 4, width: '320px' }}>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, {resetForm}) => {
                    console.log(values);
                    const users = JSON.parse(localStorage.getItem('users') || '[]');
                    const emailExists = users.some((u: { email: string }) => u.email === values.email);
                    if(emailExists) {
                        setOpenSnackbar ({
                            open: true,
                            message: 'Email already registered. Please login.',
                            severity: 'error'
                        });
                        return;
                    }
                    const hashedPassword = bcrypt.hashSync(values.password, 10);
                    users.push({
                        email: values.email,
                        password: hashedPassword,
                        isAdmin: values.email === 'admin@gmail.com'
                    })
                    
                    localStorage.setItem('users',JSON.stringify(users));
                    setOpenSnackbar({
                        open: true,
                        message: 'Account created. Please login.',
                        severity: 'success'
                    });
                    resetForm();

                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
                }}
            >
                {({errors,touched}) => (
                    <Form style={{ width: '300px' }}>
                        <Field 
                            as = {TextField}
                            name = 'email'
                            label = 'Email'
                            fullWidth
                            margin = 'normal'
                            errors = {touched.email && Boolean(errors.email)}
                            helperText = {touched.email && errors.email}
                            sx={
                                touched.email && errors.email
                                  ? {
                                      '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                          borderColor: 'error.main',
                                        },
                                        '&:hover fieldset': {
                                          borderColor: 'error.dark',
                                        },
                                        '&.Mui-focused fieldset': {
                                          borderColor: 'error.dark',
                                        },
                                      },
                                    }
                                  : {}
                              }
                        />
                        <Field 
                            name = 'password'
                            render = {({ field }: any) => (
                                <TextField 
                                    {...field}
                                    type = {showPassword ? 'text' : 'password'}
                                    label = 'Password'
                                    fullWidth
                                    margin='normal'
                                    error = {touched.password && Boolean(errors.password)}
                                    helperText = {touched.password && errors.password}
                                    slotProps = {{
                                        input : {
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={handleClickShowPassword} edge='end'>
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }
                                    }}
                                    sx={
                                        touched.password && errors.password
                                          ? {
                                              '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                  borderColor: 'error.main',
                                                },
                                                '&:hover fieldset': {
                                                  borderColor: 'error.dark',
                                                },
                                                '&.Mui-focused fieldset': {
                                                  borderColor: 'error.dark',
                                                },
                                              },
                                            }
                                          : {}
                                      }
                                />
                            )}
                        />
                        <Field 
                            name = 'confirmPassword'
                            render = {({ field }: any) => (
                                <TextField
                                    {...field}
                                    type = {showConfirmPassword ? 'text' : 'password'}
                                    label = "Confirm Password"
                                    fullWidth
                                    margin='normal'
                                    error = {touched.confirmPassword && Boolean(errors.confirmPassword)}
                                    helperText = {touched.confirmPassword && errors.confirmPassword}
                                    slotProps = {{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={handleClickShowConfirmPassword} edge='end'>
                                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }
                                    }}
                                    sx={
                                        touched.confirmPassword && errors.confirmPassword
                                          ? {
                                              '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                  borderColor: 'error.main',
                                                },
                                                '&:hover fieldset': {
                                                  borderColor: 'error.dark',
                                                },
                                                '&.Mui-focused fieldset': {
                                                  borderColor: 'error.dark',
                                                },
                                              },
                                            }
                                          : {}
                                      }
                                />
                            )}
                        />
                        
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            fullWidth
                            sx = {{ mt: 2 }}
                        >
                            Sign up
                        </Button>
                        <Typography mt = {2} sx = {{ display: 'flex', justifyContent: 'center' }}>
                            Already have an account?{' '}
                            <Link component={RouterLink} to = '/login'>
                                Login
                            </Link>
                        </Typography>
                    </Form>
                )}
            </Formik>
            </Paper>
            <Snackbar
                open = {openSnackbar.open}
                autoHideDuration = {3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose = {handleSnackbarClose} severity= {openSnackbar.severity as any} variant = 'filled'>
                    {openSnackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}