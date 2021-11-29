import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'; //** */

// importing the routes
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';  //***************** */


const app = express();

dotenv.config() //** */

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes); //creating a route for the post
app.use('/user', userRoutes); // Route for the user //******* */

app.get('/', (req,res) => {
    res.send('App is running')
})


// connecting server application to a real data base using mongodb cloud atlas

// const CONNECTION_URL = 'mongodb+srv://kolade:oluwashina@cluster0.qa2rl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));

// mongoose.set("useFindAndModify", false);