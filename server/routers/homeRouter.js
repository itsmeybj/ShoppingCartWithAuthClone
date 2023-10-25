const express = require('express')
const authMiddleware = require("../middlewares/authMiddleware")
const showHome = require('../controllers/homeCtrl').showHome

const homeRouter = express.Router()

homeRouter.get('/',authMiddleware,showHome)

module.exports = homeRouter;