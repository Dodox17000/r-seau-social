const mongoose=require('mongoose');
require ('dotenv').config({path:'./config/.env'});

mongoose
.connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.49urt.mongodb.net/reseau-social",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
}
)
.then(()=> console.log('Connecter à Mongo'))
.catch((err) => console.log("Pas connecter" + err));