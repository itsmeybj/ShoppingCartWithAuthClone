const express = require('express')
const authMiddleware = require("../middlewares/authMiddleware")
const { showContact, submitContact } = require('../controllers/contactCtrl')

const contactRouter = express.Router()

contactRouter.get('/',authMiddleware,showContact)

contactRouter.post('/submit-contact',authMiddleware,submitContact)

module.exports = contactRouter;