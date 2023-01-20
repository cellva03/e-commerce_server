// importing all the required modules such as express, mongoose, body-parser,cors
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

// creating a new express application
const app = express();
app.use(cors());

// creating a application port and mongodb port
const PORT = process.env.PORT || 3001;
const DBURL = 'mongodb+srv://Selva:Selva@e-commerce.kf94puy.mongodb.net/?retryWrites=true&w=majority';

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '50mb'}))
app.use(cors())

// connecting to mongodb
mongoose.connect(DBURL,(e)=>{
    if(e){
        console.log(e);
    }
    else{
        console.log(`DataBase is Connected!!`)
        // listening to the port
        app.listen(PORT,()=>{
            console.log(`App is running on ${PORT}`)
        })
    }
})

// setting the routes
app.use('/api/auth',userRoute)
app.use('/api/products',productRoute)

//Swagger UI
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));