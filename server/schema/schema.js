const graphql = require('graphql');

// const sqlite3 = require('sqlite3').verbose();
const _=require('lodash')

// const database = new sqlite3.Database("D:/Blog_APP/BlogAPP-React/BlogAPP-React/server/api/database.db");
// // const database = new sqlite3.Database("./../api/database.db");
// console.log(database.all(`SELECT * FROM Blog;`))
const {GraphQLObjectType} = graphql;
const Blog = require('./../model/Blog')
const User = require('./../model/User')

// var Blogs =[
//     {id:'1',name:'Shwetang',title:'We The People!',content:'Thank You for visiting!',time:'Feb 1992',like:5,user_id:'dfer3'},
//     {id:'2',name:'Shwetang',title:'We Are Sparta',content:'Thank You for visiting APPle Store!',time:'Feb 1992',like:5,user_id:'dfer3'}
// ]
// var Users =[
//     {name:'Shwetang',id:'dfer3',saved:['localhostlink']}
// ]

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
                return User.findById(parent.user_id);
            }
        }
    })
})

const UserType =new GraphQLObjectType({
    name:'User',
    fields:()=>({
        name:{type:graphql.GraphQLString},
        id: { type: graphql.GraphQLString },
        saved: { type: new graphql.GraphQLList(graphql.GraphQLString) },
        posts:{
            type:new graphql.GraphQLList(BlogType),
            resolve(parent,args){
                // return _.filter(Blogs,{user_id:parent.id})
                return Blog.find({user_id:parent.id})
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
            //   return _.find(Blogs,{id:args.id})
                return Blog.findById(args.id)
            }
        },
        user:{
            type:UserType,
            args:{id:{type:graphql.GraphQLString}},
            resolve(parent,args){
                // return _.find(Users,{id:args.id})
                return User.findById(args.id)
            }
        },
        posts:{
            type:graphql.GraphQLList(BlogType),
            resolve(parent,args){
                // return Blogs
                return Blog.find({})
            }
        },
        Users:{
            type:graphql.GraphQLList(UserType),
            resolve(parent,args){
                // return Users
                return User.find({})
            }       
        }
    }
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addUser:{
            type:UserType,
            args:{
                name:{type:graphql.GraphQLString},
                id: { type: graphql.GraphQLString },
                saved: { type: new graphql.GraphQLList(graphql.GraphQLString) }
            },
            resolve(parents,args){
                let user = new User({
                    _id:args.id,
                    name:args.name,
                    saved:args.saved
                })
                return user.save()
            }
        },
        addBlog:{
            type:BlogType,
            args:{
                name:{type:graphql.GraphQLString},
                title: { type: graphql.GraphQLString },
                content: { type: graphql.GraphQLString },
                time: { type: graphql.GraphQLString },
                like: { type: graphql.GraphQLInt },
                user_id:{type: graphql.GraphQLString}
            },
            resolve(parents,args){
                let blog = new Blog({
                    name:args.name,
                    title:args.title,
                    content:args.content,
                    time:args.time,
                    like:args.like,
                    user_id:args.user_id
                })
                return blog.save()
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
})