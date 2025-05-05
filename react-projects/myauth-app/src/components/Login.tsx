import {
    Box,
    Button,
    TextField,
    Typography,
    Link,
    Paper,
    InputAdornment,
    IconButton,
    Snackbar,
    Alert,
  } from '@mui/material';
  import { Visibility, VisibilityOff } from '@mui/icons-material';
  import { Formik, Form, Field } from 'formik';
  import { useState } from 'react';
  import { Link as RouterLink, useNavigate, Navigate } from 'react-router-dom';
  import * as Yup from 'yup';
  import bcrypt from 'bcryptjs';
  
  type LoginFormValues = {
    email: string;
    password: string;
    rememberMe: boolean;
  };
  
  type User = {
    email: string;
    password: string;
    isAdmin: boolean;
  };
  
  const LoginSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 chars').required('Required'),
  });
  
  export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();
  
    const currentUserEmail =
      localStorage.getItem('currentUserEmail') ||
      sessionStorage.getItem('currentUserEmail');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users.find((u: any) => u.email === currentUserEmail);
  
    if (currentUser?.isAdmin) {
      return <Navigate to="/admin" replace />;
    }
  
    const handleClickShowPassword = () =>
      setShowPassword((show) => !show);
  
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Paper elevation={4} sx={{ p: 4, width: '320px' }}>
          <Formik<LoginFormValues>
            initialValues={{
              email: '',
              password: '',
              rememberMe: false,
            }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setFieldTouched }) => {
                const emailField = document.querySelector<HTMLInputElement>('input[name="email"]');
                const passwordField = document.querySelector<HTMLInputElement>('input[name="password"]');

                const emailSchema = Yup.reach(LoginSchema, 'email') as Yup.StringSchema;
                const passwordSchema = Yup.reach(LoginSchema, 'pasword') as Yup.StringSchema;
            
                // Check email first
                const isEmailInvalid = !values.email || !emailSchema.isValidSync(values.email);
                if (isEmailInvalid) {
                    setFieldTouched('email', true);
                    emailField?.focus();
                    return;
                }
            
                // Then check password
                const isPasswordInvalid = !values.password || !passwordSchema.isValidSync(values.password);
                if (isPasswordInvalid) {
                    setFieldTouched('password', true);
                    passwordField?.focus();
                    return;
                }
            
                // Proceed with login
                const storedUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
                const matchedUser = storedUsers.find(user => user.email === values.email);
            
                if (!matchedUser) {
                    setLoginError("Account not found. Please sign up.");
                    setOpenSnackbar(true);
                } else if (!bcrypt.compareSync(values.password, matchedUser.password)) {
                    setLoginError('Invalid email or password');
                    setOpenSnackbar(true);
                } else {
                    if (values.rememberMe) {
                        localStorage.setItem('currentUserEmail', values.email);
                        sessionStorage.removeItem('currentUserEmail');
                    } else {
                        sessionStorage.setItem('currentUserEmail', values.email);
                        localStorage.removeItem('currentUserEmail');
                    }
            
                    if (matchedUser.isAdmin) {
                        navigate('/admin', { replace: true });
                    } else {
                        navigate('/welcome');
                    }
                }
            }}
            
          >
            {() => (
              <Form style={{ width: '300px' }}>
                <Typography>Email</Typography>
                <Field name="email">
                  {({ field, meta }: any) => (
                    <TextField
                      {...field}
                      placeholder="Enter email"
                      fullWidth
                      margin="normal"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
  
                <Typography>Password</Typography>
                <Field name="password">
                  {({ field, meta }: any) => (
                    <TextField
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      fullWidth
                      margin="normal"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Field>
  
                <Field name="rememberMe">
                  {({ field }: any) => (
                    <Box display="flex" alignItems="center" mt={1}>
                      <input
                        type="checkbox"
                        {...field}
                        id="rememberMe"
                      />
                      <label htmlFor="rememberMe" style={{ marginLeft: 8 }}>
                        Remember Me
                      </label>
                    </Box>
                  )}
                </Field>
  
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Login
                </Button>
  
                <Typography
                  mt={2}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  Don&apos;t have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/signup"
                    sx={{ ml: 1 }}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Form>
            )}
          </Formik>
        </Paper>
  
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="error"
            variant="filled"
          >
            {loginError}
          </Alert>
        </Snackbar>
      </Box>
    );
  }
  