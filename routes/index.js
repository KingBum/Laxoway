// routes/index.js
const express = require('express');
const router = express.Router();

// Import individual route files
const carRoutes = require('./car');
const userRoutes = require('./user');
const routeRoutes = require('./route');
const authRoutes = require('./auth');
const tripRoutes = require('./trip');
const bookingRoutes = require('./booking');
const menuRoutes = require('./menu');
const offerRoutes = require('./offer');


router.use('/route', routeRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/car', carRoutes);
router.use('/trip', tripRoutes);
router.use('/booking', bookingRoutes);
router.use('/menu', menuRoutes);
router.use('/offer', offerRoutes);

module.exports = router;
