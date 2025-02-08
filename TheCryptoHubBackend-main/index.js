require('dotenv').config();
const express= require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const multer = require("multer");
const upload = multer();
app.use(upload.any());
const cors = require("cors");
//app.use(cors());
const allowedOrigins = ['https://www.thecryptohub.com', 'https://thecryptohub.com','https://www.thecryptohub.info', 'https://thecryptohub.info', 'http://localhost:3000'];


app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow requests with no origin (like mobile apps or curl requests)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use("/uploads", express.static("uploads"));

const connectDB= require('./db/connect')

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
//if i use following commented line of code, it will apply authenticateUser middlewear to all routes but right now i am specifying to specific routes
//const authenticateUser = require('./middleware/authentication');
//app.use(authenticateUser);

//routers for routes
const authRouter= require('./routes/auth');
const projectRouter= require('./routes/Project');
const blogRouter= require('./routes/Blog');
const eventRouter= require('./routes/Event');
const partnerRouter= require('./routes/Partner');
const SubscriberRouter= require('./routes/Subscriber');
const podcastRouter= require('./routes/Podcast');
const announcementRouter= require('./routes/Announcement');

//MiddleWears
//app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);  
app.use(express.json())
app.use('/api/v1/', authRouter);
app.use('/api/v1/', projectRouter);
app.use('/api/v1/', blogRouter);
app.use('/api/v1/', eventRouter);
app.use('/api/v1/', partnerRouter);
app.use('/api/v1/', SubscriberRouter);
app.use('/api/v1/', podcastRouter);
app.use('/api/v1/', announcementRouter);

const port=process.env.PORT;
const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>{
        console.log(`Server is listening on port ${port}`)
        })
    }catch(error){
        console.log(error);
    }
}
start();
