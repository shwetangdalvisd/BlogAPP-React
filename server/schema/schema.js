const graphql = require('graphql');

const {GraphQLObjectType} = graphql;
import {GraphQLDateTime} from 'graphql-iso-date';

const BlogType =new GraphQLObjectType({
    name:'Blog',
    fields:()=>{
        id: {type: graphql.GraphQLString}
        name:{type:graphql.GraphQLString}
        title: { type: graphql.GraphQLString }
        content: { type: graphql.GraphQLString }
        time: { type: GraphQLDateTime }
        like: { type: graphql.GraphQLInt }
        user_id: { type: graphql.GraphQLString }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        post:{
            type:BlogType,
            args:{id:{type:graphql.GraphQLString}},
            resolve(parent,args){


            }

        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})