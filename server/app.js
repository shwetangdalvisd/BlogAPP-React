const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema')
const mongoose = require('mongoose');
const cors = require('cors');

const app =express();

app.use(cors());


mongoose.connect('mongodb+srv://shwetangdalvi:shwetsan1997@cluster0.3u1t0.mongodb.net/GQL_Blog?retryWrites=true&w=majority')
mongoose.connection.once('open',()=>{
    console.log('connected to Database')
})

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(4000,()=>{
    console.log('Now listening to port 4000')
})