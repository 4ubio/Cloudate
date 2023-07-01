const {Router} = require('express');
const router = Router();

const {check} = require('express-validator');

const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');
const { isDate } = require('../helpers/isDate');

//Validate JWT
router.use(validateJWT);

//Get events
router.get('/', getEvents);

//Create event
router.post(
    '/', 
    [   
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom(isDate),
        check('end', 'End date is required').custom(isDate),
        validateFields
    ],
    createEvent
);

//Update event
router.put(
    '/:id', 
    [   
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom(isDate),
        check('end', 'End date is required').custom(isDate),
        validateFields
    ],
    updateEvent
);

//Delete event
router.delete('/:id', deleteEvent);

module.exports = router;