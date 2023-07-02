import React, { useEffect, useState } from 'react';

import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Toolbar } from '@mui/material'

import { CalendarEvent, CalendarModal, Navbar, FabAddNew, FabDelete } from "../"
import Sidebar from '../components/Sidebar';

import { useAuthStore, useCalendarStore, useUIStore, useWindowSize } from '../../hooks';
import { localizer } from '../helpers';

export const CalendarPage = () => {
    
    const {user} = useAuthStore();
    const {openDateModal} = useUIStore();
    const {events, setActiveEvent, startLoadingEvents} = useCalendarStore();

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
    const [toggle, setToggle] = useState(false);
    const [width] = useWindowSize();
    
    const container = document.getElementsByClassName("rbc-calendar")[0];

    useEffect(() => {startLoadingEvents();}, [])

    useEffect(() => {
        if (width >= 900) {
            setToggle(true);
            if (container !== undefined) {container.classList.add('display-above-md')};
        };
        if (width < 900) {                                  //Hide and unhide sidebar only in small screens
            setToggle(false);
            if (container !== undefined) {container.classList.remove('display-above-md')};
        };         
    }, [width])
    
    const onSelected = (event) => {setActiveEvent(event)}
    const onDoubleClick = () => {openDateModal();}

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
            <Navbar toggle={toggle} setToggle={setToggle} />
            <Toolbar sx={{mb: 2}}></Toolbar>
            <Calendar
                culture='en'
                localizer={localizer}
                defaultView={lastView}
                events={events}
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={eventStyleGetter}
                style={{ height: 'calc( 100vh - 80px )', padding: 3}}
                components={{
                    event: CalendarEvent,
                    toolbar: props => (<Sidebar {...props} toggle={toggle} setToggle={setToggle} width={width} />)
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