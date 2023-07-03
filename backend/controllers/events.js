const {response} = require('express');
const Event = require('../models/Event');

const getEvents = async(req, res = response) => {
    const uid = req.params.id;                                              //Get user ID
    const events = await Event.find({user: uid}).populate('user', 'name');  //Get all events
    res.json({
        ok: true,
        events
    });
}

const createEvent = async(req, res = response) => {
    const event = new Event(req.body);                                      //Get event to create
    try {
        event.user = req.uid;                                               //Set author of event
        const eventSaved = await event.save();                              //Create event
        res.json({
            ok: true,
            event: eventSaved
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the admin'
        })
    }
}

const updateEvent = async(req, res = response) => {
    const eventID = req.params.id;                                          //Get event id
    const uid = req.uid;                                                    //Get user id
    try {

        //Validations
        const event = await Event.findById(eventID);
        if (!event) {                                                       //Verify if event exists
            return res.status(404).json({
                ok: false,
                msg: 'Event doesnt exists'
            })
        }
        if (event.user.toString() !== uid) {                                //Verify if user can edit event
            return res.status(401).json({
                ok: false,
                msg: 'You dont have privilege to edit this event'
            })
        }

        //Continue updating
        const newEvent = {
            ...req.body,
            user: uid
        }
        const eventUpdated = await Event.findByIdAndUpdate(eventID, newEvent, {new: true});
        res.json({
            ok: true,
            event: eventUpdated
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the admin'
        })
    }
}

const deleteEvent = async(req, res = response) => {
    const eventID = req.params.id;                                          //Get event id
    const uid = req.uid;                                                    //Get user id
    try {

        //Validations
        const event = await Event.findById(eventID);
        if (!event) {                                                       //Verify if event exists
            return res.status(404).json({
                ok: false,
                msg: 'Event doesnt exists'
            })
        }
        if (event.user.toString() !== uid) {                                //Verify if user can edit event
            return res.status(401).json({
                ok: false,
                msg: 'You dont have privilege to edit this event'
            })
        }

        //Continue deleting
        await Event.findByIdAndDelete(eventID);
        res.json({
            ok: true,
            msg: 'Event deleted'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the admin'
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}