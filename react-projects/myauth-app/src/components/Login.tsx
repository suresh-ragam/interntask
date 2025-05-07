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

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('This field is required'),
  password: Yup.string().min(6, 'Minimum 6 chars').required('This field is required'),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const currentUserEmail =
    localStorage.getItem('currentUserEmail') || sessionStorage.getItem('currentUserEmail');
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const currentUser = users.find((u: any) => u.email === currentUserEmail);

  if (currentUserEmail && currentUser) {
    return <Navigate to={currentUser.isAdmin ? '/admin' : '/welcome'} replace />;
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Paper elevation={4} sx={{ p: 4, width: '320px' }}>
        <Formik<LoginFormValues>
          initialValues={{ email: '', password: '', rememberMe: false }}
          validateOnChange={true}
          validateOnBlur={false}
          onSubmit={async (values, actions) => {
            // Custom validation
            try {
              await (LoginSchema.fields.email as Yup.StringSchema).validate(values.email);
            } catch (err: any) {
              actions.setFieldTouched('email', true, false);
              actions.setFieldError('email', err.message);
              document.querySelector<HTMLInputElement>('input[name="email"]')?.focus();
              return;
            }

            try {
              await (LoginSchema.fields.password as Yup.StringSchema).validate(values.password);
            } catch (err: any) {
              actions.setFieldTouched('password', true, false);
              actions.setFieldError('password', err.message);
              document.querySelector<HTMLInputElement>('input[name="password"]')?.focus();
              return;
            }

            // Proceed with login logic
            const storedUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
            const matchedUser = storedUsers.find((user) => user.email === values.email);

            if (!matchedUser) {
              setLoginError('Account not found. Please sign up.');
              setOpenSnackbar(true);
              return;
            }

            if (!bcrypt.compareSync(values.password, matchedUser.password)) {
              setLoginError('Invalid email or password');
              setOpenSnackbar(true);
              return;
            }

            if (values.rememberMe) {
              localStorage.setItem('currentUserEmail', values.email);
              sessionStorage.removeItem('currentUserEmail');
            } else {
              sessionStorage.setItem('currentUserEmail', values.email);
              localStorage.removeItem('currentUserEmail');
            }

            navigate(matchedUser.isAdmin ? '/admin' : '/welcome', { replace: true });
          }}
        >
          {(meta) => (
            <Form style={{ width: '300px' }}>
              <Field name="email">
                {({ field, meta, form }: any) => (
                  <>
                  <Typography  
                  sx = {(theme) => ({
                    color : meta.touched && meta.error ? theme.palette.error.main : theme.palette.text.primary,
                    fontWeight :meta.touched && meta.error ? 'bold' : 'normal'
                  })}>
                    Email
                  </Typography>
                  <TextField
                    {...field}
                    placeholder="Enter email"
                    fullWidth
                    margin="normal"
                    onBlur = {async (e) => {
                      field.onBlur(e);
                      try {
                        await (LoginSchema.fields.email as Yup.StringSchema).validate(field.value);
                        form.setFieldError('email','');
                      } catch(err: any) {
                        form.setFieldError('email',err.message);
                      }
                    }}
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                    
                  />
                  </>
                )}
              </Field>

              <Field name="password">
                {({ field, meta, form }: any) => (
                  <>
                  <Typography  
                  sx = {(theme) => ({
                    color : meta.touched && meta.error ? theme.palette.error.main : theme.palette.text.primary,
                    fontWeight :meta.touched && meta.error ? 'bold' : 'normal'
                  })}>
                    Password
                  </Typography>
                  <TextField
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    fullWidth
                    margin="normal"
                    onBlur = {async (e) => {
                      field.onBlur(e);
                      try {
                        await (LoginSchema.fields.password as Yup.StringSchema).validate(field.value);
                        form.setFieldError('password','');
                      } catch(err: any) {
                        form.setFieldError('password',err.message);
                      }
                    }}
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                    
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  </>
                )}
              </Field>

              <Field name="rememberMe">
                {({ field }: any) => (
                  <Box display="flex" alignItems="center" mt={1}>
                    <input type="checkbox" {...field} id="rememberMe" />
                    <label htmlFor="rememberMe" style={{ marginLeft: 8 }}>
                      Remember Me
                    </label>
                  </Box>
                )}
              </Field>

              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Login
              </Button>

              <Typography mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                Don&apos;t have an account?{' '}
                <Link component={RouterLink} to="/signup" sx={{ ml: 1 }}>
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
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" variant="filled">
          {loginError}
        </Alert>
      </Snackbar>
    </Box>
  );
}
