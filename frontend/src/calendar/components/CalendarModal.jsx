import { useEffect, useState } from 'react';

import { Button, Grid, TextField, Typography } from '@mui/material';

import Modal from 'react-modal';

import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import enUS from 'date-fns/locale/en-US'
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { useCalendarStore, useForm, useUIStore } from '../../hooks';

registerLocale('en', enUS);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

//Initial state
const formFields = {
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2)
};

//Validations
const formValidations = {
    title: [(value) => value.length >= 1, 'Title is required']
}

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const {isDateModalOpen, closeDateModal} = useUIStore();
    const {activeEvent, startSavingEvent, startDeletingEvent} = useCalendarStore();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const isNewEvent = (activeEvent !== null) && (activeEvent.title === '') ? true : false;

    const {
        formState, title, notes, start, end, 
        isFormValid, titleValid,
        onInputChange, onDateChange, setFormState
    } = useForm(formFields, formValidations);

    useEffect(() => {
        if (activeEvent !== null) {setFormState({...activeEvent});}
    },[activeEvent]);
    
    const onSubmit = async(event) => {
        event.preventDefault();
        setFormSubmitted(true);

        //Other validations
        if(!isFormValid) return;
        
        //Date validation
        const difference = differenceInSeconds(end, start);
        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Error in dates', 'Check selected dates and hours', 'error')
            return;
        }

        //Finish
        await startSavingEvent({...formState});
        Swal.fire('Event saved!', `${title} saved successfully!`, 'success');
        onCloseModal();
        setFormSubmitted(false);
    }
            
    const onDelete = () => {
        startDeletingEvent();
        onCloseModal();
    }
    
    const onCloseModal = () => closeDateModal();
    
    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >
            <Typography variant='h4' textAlign='center' mb={1} mt={2}>
                {(isNewEvent) ? 'New Event' : 'Edit Event'}
            </Typography>

            <form className="container" onSubmit={onSubmit}> 
                <Grid container>
                    <Grid container className='date-container'>
                        <Grid item xs={12} sx={{mt:2}}>
                            <Typography variant='h6' mb={1}>Start date</Typography>
                            <DatePicker 
                                selected={start}
                                className='form-control'
                                onChange={(event) => onDateChange(event, 'start')}
                                dateFormat='Pp'
                                showTimeSelect
                                locale='en'
                                timeCaption='Hour'
                            />
                        </Grid>

                        <Grid item xs={12} sx={{mt:2}}>
                            <Typography variant='h6' mb={1}>End date</Typography>
                            <DatePicker 
                                minDate={start}
                                selected={end}
                                className='form-control'
                                onChange={(event) => onDateChange(event, 'end')}
                                dateFormat='Pp'
                                showTimeSelect
                                locale='en'
                                timeCaption='Hour'
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{mt:2}}>
                        <Typography variant='h6' mb={1}>Title</Typography>
                        <TextField 
                            label="Title" 
                            type='text' 
                            placeholder='Type a title 📝' 
                            fullWidth
                            name='title'
                            value={title}
                            onChange={onInputChange}
                            error={!!titleValid && formSubmitted}
                            helperText={(!isFormValid && formSubmitted) ? titleValid : ''}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt:2}}>
                        <Typography variant='h6' mb={1}>Notes</Typography>
                        <TextField 
                            label="Notes" 
                            type='text' 
                            placeholder='Type notes 📝 (Optional)' 
                            fullWidth
                            minRows={6}
                            multiline
                            name='notes'
                            value={notes}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid item xs={12} mt={2}> 
                        <Button variant='contained' fullWidth type="submit">
                            Save
                        </Button>
                    </Grid>

                    <Grid item xs={12} mt={1} 
                        sx={{display: `${(isNewEvent) ? 'none' : ''}`}}
                    > 
                        <Button variant='contained' fullWidth color='error' onClick={onDelete}>
                            Delete
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </Modal>
    )
}