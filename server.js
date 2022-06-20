const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
require ('dotenv').config({path:'./config/.env'});
// lien avec mongo db dans le config
require('./config/db');
const {checkUser,requireAuth} =require('./middleware/auth.middleware');
const cors = require('cors');

const app=express();

// autorisation de cors a faire des requêtes
const corsOptions ={
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}
app.use(cors(corsOptions));

//aide à traiter les requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req,res)=>{
    res.status(200).send(res.locals.user._id)
});

//routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

//server
//process.env.PORT => retransmet la valeur de .env
app.listen(process.env.PORT,() =>{
    //en dynamique
    console.log(`Listening on port ${process.env.PORT}`)
})
