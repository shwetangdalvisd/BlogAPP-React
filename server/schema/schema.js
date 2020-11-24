const graphql = require('graphql');

const sqlite3 = require('sqlite3').verbose();
const _=require('lodash')

let db = new sqlite3.Database('./../api/database.db', sqlite3.OPEN_READWRITE)
// const database = new sqlite3.Database("./../api/database.db");

const {GraphQLObjectType} = graphql;

var Blogs =[
    {id:'1',name:'Shwetang',title:'We The People!',content:'Thank You for visiting!',time:'Feb 1992',like:5,user_id:'dfer3'},
    {id:'2',name:'Shwetang',title:'We Are Sparta',content:'Thank You for visiting APPle Store!',time:'Feb 1992',like:5,user_id:'dfer3'}
]
var Users =[
    {name:'Shwetang',id:'dfer3'}
]
const BlogType =new GraphQLObjectType({
    name:'Blog',
    fields:()=>({
        id: {type: graphql.GraphQLString},
        name:{type:graphql.GraphQLString},
        title: { type: graphql.GraphQLString },
        content: { type: graphql.GraphQLString },
        time: { type: graphql.GraphQLString },
        like: { type: graphql.GraphQLInt },
        user_id:{type: graphql.GraphQLString},
        user: { 
            type: UserType,
            resolve(parent,args){
                return _.find(Users,{id:parent.user_id})
            }
        }
    })
})

const UserType =new GraphQLObjectType({
    name:'User',
    fields:()=>({
        name:{type:graphql.GraphQLString},
        id: { type: graphql.GraphQLString },
        posts:{
            type:new graphql.GraphQLList(BlogType),
            resolve(parent,args){
                return _.filter(Blogs,{user_id:parent.id})
            }
        }
    })
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        post:{
            type:BlogType,
            args:{id:{type:graphql.GraphQLString}},
            resolve(parent,args){
              return _.find(Blogs,{id:args.id}) 
            }
        },
        user:{
            type:UserType,
            args:{id:{type:graphql.GraphQLString}},
            resolve(parent,args){
                return _.find(Users,{id:args.id})
            }
        },
        posts:{
            type:graphql.GraphQLList(BlogType),
            resolve(parent,args){
                return Blogs
            }
        },
        Users:{
            type:graphql.GraphQLList(UserType),
            resolve(parent,args){
                return Users
            }       
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})