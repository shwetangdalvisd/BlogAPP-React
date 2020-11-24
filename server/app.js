const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema')

const app =express();

app.use('/graphql',graphqlHTTP({
    schema
}))

app.listen(4000,()=>{
    console.log('Now listening to port 4000')
})