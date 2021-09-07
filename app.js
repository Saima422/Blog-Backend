const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogRouter');
const { getRandomBlog } = require('./controllers/blogController');
const { GlobalErrorhandling } = require('./middleware/globalError');
const { sendError } = require('./utils/HandleResponse');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

app.use('/blogs', blogRouter);
app.get('/random', getRandomBlog);

app.all('*', (req, res, next) => {
    return next(new GlobalErrorhandling({
        message: 'Route does not exist on server',
        error: '404: NOT FOUND',
    }).notFoundError());
})

app.use(sendError);

mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((db) => {
        console.log('Connected to the Database');

        port = process.env.PORT || 3000;

        app.listen(port, () => {
            console.log('Server listening to port ', port);
        });
    }).catch((error) => {
        console.log('Error occured while connecting to Database ', error);
    })
