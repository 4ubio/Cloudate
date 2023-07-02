import Toolbar from 'react-big-calendar/lib/Toolbar';
import { Box, Divider, Drawer, Grid, IconButton, Button, Typography, Toolbar as Tool, List, ListItem } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { UserInfo } from './UserInfo';

export default class Sidebar extends Toolbar {
	componentDidMount() {const view = this.props.view;};    
    
	render() {
        const toggle = this.props.toggle;
        const width = this.props.width;
        const onToggle = () => {if (width < 900) this.props.setToggle(!toggle)};

        return (
            <Box
                component='nav'
                sx={{width: {md: 250}, flexShrink: {md: 0}}}
            >
                <Drawer
                    open={toggle}
                    variant='persistent'
                    sx={{ 
                        display: {xs: 'block'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: 250}
                    }}>
                    <Tool>
                        <Grid container direction='row' justifyContent='space-around' alignItems='center' textAlign='center' mt={1} mb={1}>
                            <UserInfo />

                            <IconButton edge='end' sx={{display: {md: 'none'}}} onClick={onToggle}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Tool>

                    <Divider />

                    <Grid>
                        <Typography variant='h5' textAlign='center' mt={2} mb={2}>{this.props.label}</Typography>

                        <List onClick={onToggle}>
                            <ListItem sx={{paddingTop: 0}}>
                                <Button sx={{width: '100%'}} variant="outlined" onClick={() => this.navigate('TODAY')}>Today</Button>
                            </ListItem>

                            <ListItem sx={{paddingTop: 0}}>
                                <Button sx={{width: '100%'}} variant="outlined" onClick={() => this.navigate('PREV')}>Previous</Button>
                            </ListItem>

                            <ListItem sx={{paddingTop: 0}}>
                                <Button sx={{width: '100%'}} variant="outlined" onClick={() => this.navigate('NEXT')}>Next</Button>
                            </ListItem>
                        </List>

                        <Typography variant='h6' textAlign='center' mt={2} mb={2}>Views</Typography>

                        <List onClick={onToggle}>
                            <ListItem sx={{paddingTop: 0}}>
                                <Button sx={{width: '100%'}} variant="outlined" onClick={this.view.bind(null, 'month')}>Month</Button>
                            </ListItem>

                            <ListItem sx={{paddingTop: 0}}>
                                <Button sx={{width: '100%'}} variant="outlined" onClick={this.view.bind(null, 'week')}>Week</Button>
                            </ListItem>

                            <ListItem sx={{paddingTop: 0}}>
                                <Button sx={{width: '100%'}} variant="outlined" onClick={this.view.bind(null, 'day')}>Day</Button>
                            </ListItem>

                            <ListItem sx={{paddingTop: 0}}>
                                <Button sx={{width: '100%'}} variant="outlined" onClick={this.view.bind(null, 'agenda')}>Agenda</Button>
                            </ListItem>

                        </List>
                    </Grid>

                </Drawer>
            </Box>
        );
	}
}