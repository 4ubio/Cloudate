import { Grid, Typography } from '@mui/material'
import { useAuthStore } from '../../hooks'

export const UserInfo = () => {
    const {user} = useAuthStore();
    
    return (
        <>
            <Grid container direction='row' width='20%'>
                <img src={user.photoURL} alt="photo" className='profile-pic'/>
            </Grid>

            <Typography variant='h6' component='div'>{user.name}</Typography>
        </>
    )
}