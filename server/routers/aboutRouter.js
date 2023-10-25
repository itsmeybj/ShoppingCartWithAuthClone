const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const showAbout = require('../controllers/aboutCtrl').showAbout;

const aboutRouter = express.Router();

aboutRouter.get("/",authMiddleware, showAbout);

module.exports = aboutRouter;