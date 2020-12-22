const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema')
const mongoose = require('mongoose');
const cors = require('cors');

const app =express();

app.use(cors());



app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(4000,()=>{
    console.log('Now listening to port 4000')
})