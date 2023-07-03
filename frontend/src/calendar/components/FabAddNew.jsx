import { addHours } from "date-fns";
import { IconButton } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'
import { useCalendarStore, useUIStore } from "../../hooks"

export const FabAddNew = () => {

    const {openDateModal} = useUIStore();
    const {setActiveEvent} = useCalendarStore();

    const onClickNewEvent = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
        })
        openDateModal();
    }

    return (
        <IconButton 
            onClick={onClickNewEvent}
            size='large' 
            sx={{
                color: 'white', 
                backgroundColor: 'primary.main', 
                ':hover': {backgroundColor: 'primary.main', opacity: 0.9},
                position: 'fixed',
                right: 30,
                bottom: 30
            }}>
                <AddOutlined sx={{fontSize: 40}} />
        </IconButton>
    )
}