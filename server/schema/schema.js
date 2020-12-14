const graphql = require('graphql');
const _=require('lodash')

const {GraphQLObjectType} = graphql;
const Blog = require('./../model/Blog')
const User = require('./../model/User')
const {GraphQLDateTime} = require('graphql-iso-date')


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
        },
        updateBlog:{
            type:BlogType,
            args:{
                id: {type: graphql.GraphQLString},
                title: { type: graphql.GraphQLString },
                content: { type: graphql.GraphQLString }
            },
            resolve(parents,args){
                return new Promise((resolve, reject) => {
                    Blog.findOneAndUpdate(
                        {"_id": args.id},
                        { "$set":{title: args.title, content: args.content}},
                        {"new": true} //returns new document
                    ).exec((err, res) => {
                        console.log('test', res)
                        if(err) reject(err)
                        else resolve(res)
                    })
                })
            }
        },
        deleteBlog:{
            type:BlogType,
            args:{
                id: {type: graphql.GraphQLString}
            },
            resolve(parents,args){
                return Blog.findByIdAndRemove(args.id)
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
})