const express = require("express")
const bodyParser = require('body-parser')
const userRouter = require("./routers/userRouter")
const aboutRouter = require("./routers/aboutRouter")
const contactRouter = require("./routers/contactRouter")
const homeRouter = require("./routers/homeRouter")

//const dbConnect = require("./config/dbconnect")
const cors = require('cors');
const cookieParser = require("cookie-parser")
const { default: mongoose } = require("mongoose")

const dotenv = require("dotenv").config()

const app = express()

//dbConnect()
mongoose.connect(process.env.DATABASE_URL)
console.log('connected');


const PORT = process.env.PORT || 5000
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.json)

const corsConfig = {
    origin: true,
    credentials: true,
  };

app.use(cors(corsConfig));
app.options('*', cors(corsConfig))

app.use(cookieParser())


app.use(express.static('public'))

app.use('/api/user',userRouter)
app.use('/api/about',aboutRouter)
app.use('/api/contact',contactRouter)
app.use('/api/home',homeRouter)

app.listen(PORT,()=>{
    console.log(`we are listening from port ${PORT}`);
})