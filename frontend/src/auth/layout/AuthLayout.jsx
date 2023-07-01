import { Grid, Typography } from '@mui/material'

export const AuthLayout = ({children, title = ''}) => {
    return (
        <Grid 
            container 
            spacing={0} 
            direction="column"
            alignItems="center" 
            justifyContent="center"
            sx={{minHeight: '100vh', backgroundColor: 'primary.main', padding: 4}}
        >
            <Grid item
                className='box-shadow'
                xs={3}
                sx={{backgroundColor: 'white', padding: 3, borderRadius: 2, width: {md: 450}}}
            >   
                <Grid item mx='auto' width='50%' mb={2}>
                    <img src='../../../public/logo.png'></img>
                </Grid>

                <Typography variant='h3' textAlign='center' mb={2}>Cloudate</Typography>
                <Typography variant='h5' sx={{mb: 1}}>{title}</Typography>

                {children}
            </Grid>
        </Grid>
    )
}