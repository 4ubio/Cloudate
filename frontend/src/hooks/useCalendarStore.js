import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents } from "../store";
import calendarAPI from "../api/calendarApi";
import { convertEventsToDateEvents } from "../calendar/helpers";

export const useCalendarStore = () => {

    const {events, activeEvent} = useSelector(state => state.calendar);
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async(calendarEvent) => {
        try {
            if (calendarEvent.id) { //I'm updating an event
                await calendarAPI.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({...calendarEvent, user}));
                return;
            } 
    
            //I'm creating an event
            const {data} = await calendarAPI.post('/events', calendarEvent);
            dispatch(onAddNewEvent({...calendarEvent, id: data.event.id, user }));
        } catch (error) {
            console.log(error);
            Swal.fire('Error saving event', error.response.data?.msg, 'error');
        }
    }

    const startDeletingEvent = async() => {
        try {
            await calendarAPI.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent());
        } catch (error) {
            console.log(error);
            Swal.fire('Error saving event', error.response.data?.msg, 'error');
        }
    }

    const startLoadingEvents = async(calendarEvent) => {
        try {
            const {data} = await calendarAPI.get(`/events/${user.uid}`);
            const events = convertEventsToDateEvents(data.events);
            dispatch(onLoadEvents(events));
        } catch (error) {
            console.log('Error loading events');
            console.log(error);
        }
    }

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
}