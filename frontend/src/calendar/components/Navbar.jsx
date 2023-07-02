import { AppBar, IconButton, Toolbar, Typography, Grid } from '@mui/material'
import { Instagram, LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { useAuthStore } from "../../hooks"

export const Navbar = ({toggle, setToggle}) => {
    const onToggle = () => setToggle(!toggle);
    const {startLogout} = useAuthStore();

    return (
        <AppBar 
        position='fixed' 
        sx={{ 
            width: { md: 'calc(100% - 250px)' },
            ml: { md: '250px' }
        }}
        >
        <Toolbar>
            <IconButton 
                color='inherit' 
                edge='start' 
                sx={{mr: 2, display: {md: 'none'}}} 
                onClick={onToggle}
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography noWrap variant='h6' component='div'>☁️ Cloudate</Typography>

                <Grid item>
                    <IconButton sx={{color: 'white', mr: 1}} onClick={() => window.open('https://www.instagram.com/4ubio/')}>
                        <Instagram/>
                    </IconButton>
                    
                    <IconButton color='error' onClick={startLogout}>
                        <LogoutOutlined />
                    </IconButton>
                </Grid>
            </Grid>
        </Toolbar>
        </AppBar>
    )
}