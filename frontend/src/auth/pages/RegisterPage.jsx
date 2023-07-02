import { useMemo, useState } from 'react';
import { Link as RouterLink } from "react-router-dom";

import { Grid, TextField, Button, Typography, Link, Alert } from '@mui/material'
import { Google } from '@mui/icons-material'

import { AuthLayout } from "../layout/AuthLayout";
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';

//Initial state
const formFields = {name: '', email: '', password: ''};

//Validations
const formValidations = {
    name: [(value) => value.length >= 1, 'Name is required'],
    email: [(value) => value.includes('@'), 'Email need to have @'],
    password: [(value) => value.length >= 8, 'Password need to have at least 8 characters']
}

export const RegisterPage = () => {

    const [formSubmitted, setFormSubmitted] = useState(false); //Prevent error messages when page is reloaded
    const {status, errorMessage, startCreating, registerWithGoogle } = useAuthStore();

    const {
        name, email, password, onInputChange, 
        nameValid, emailValid, passwordValid, isFormValid
    } = useForm(formFields, formValidations)

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        if(!isFormValid) return;
        startCreating({name, email, password});
    }

    const onRegisterWithGoogle = () => registerWithGoogle();
    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    return (
        <AuthLayout title="Register">
            <form action="" onSubmit={onSubmit} className='animate__animated animate__fadeIn'>
                <Grid container>
                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField 
                            label="Name" 
                            type='text' 
                            placeholder='John Doe' 
                            fullWidth
                            name="name"    
                            value={name}
                            onChange={onInputChange}
                            error={!!nameValid && formSubmitted}
                            helperText={(!isFormValid && formSubmitted) ? nameValid : ''}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField 
                            label="Email" 
                            type='email' 
                            placeholder='email@gmail.com' 
                            fullWidth
                            name="email"    
                            value={email}
                            onChange={onInputChange}
                            error={!!emailValid  && formSubmitted}
                            helperText={(!isFormValid && formSubmitted) ? emailValid : ''}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField 
                            label="Password" 
                            type='password' 
                            placeholder='*****' 
                            fullWidth
                            name="password"    
                            value={password}
                            onChange={onInputChange}
                            error={!!passwordValid && formSubmitted}
                            helperText={(!isFormValid && formSubmitted) ? passwordValid : ''}
                        />
                    </Grid>

                    <Grid item xs={12} mt={2} display={(errorMessage !== undefined) ? '' : 'none'}>
                        <Alert severity='error'>{errorMessage}</Alert>
                    </Grid>

                    <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
                        <Grid item xs={12} sm={6}> 
                            <Button disabled={isAuthenticating} variant='contained' fullWidth type="submit">
                                Create account
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6}> 
                            <Button disabled={isAuthenticating} variant='contained' fullWidth onClick={onRegisterWithGoogle}>
                                <Google />
                                <Typography sx={{ml: 1}}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Link component={RouterLink} color='inherit' to='/auth/login'>
                            Already have an account?
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    )
}