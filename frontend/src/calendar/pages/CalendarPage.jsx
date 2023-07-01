import { useEffect, useState } from 'react';

import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, Navbar, FabAddNew, FabDelete } from "../"

import { useAuthStore, useCalendarStore, useUIStore } from '../../hooks';
import { getMessagesES, localizer } from '../helpers';

export const CalendarPage = () => {
    
    const {user} = useAuthStore();
    const {openDateModal} = useUIStore();
    const {events, setActiveEvent, startLoadingEvents} = useCalendarStore();
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    useEffect(() => {
      startLoadingEvents();
    }, [])
    
    const onSelected = (event) => {
        setActiveEvent(event)
    }

    const onDoubleClick = () => {
        openDateModal();
    }
    
    const onViewChange = (event) => {
        localStorage.setItem('lastView', event);
        setLastView(event);
    }

    const eventStyleGetter = (event) => {
        const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);
        
        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }
        return {style}
    }
    
    return (
        <>
            <Navbar />
            <Calendar
                culture='es'
                localizer={localizer}
                defaultView={lastView}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                style={{ height: 'calc( 100vh - 80px )'}}
                components={{
                    event: CalendarEvent,
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelected}
                onView={onViewChange}
            />
            <CalendarModal/>
            <FabAddNew />
            <FabDelete />
        </>
    )
}