"use strict";

var graphql = require("graphql");

var _ = require("lodash");

var GraphQLObjectType = graphql.GraphQLObjectType;

var Blog = require("./../model/Blog");

var User = require("./../model/User");

var _require = require("graphql-iso-date"),
    GraphQLDateTime = _require.GraphQLDateTime;

var fetch = require("node-fetch");

var BlogType = new GraphQLObjectType({
  name: "Blog",
  fields: function fields() {
    return {
      id: {
        type: graphql.GraphQLInt
      },
      name: {
        type: graphql.GraphQLString
      },
      title: {
        type: graphql.GraphQLString
      },
      content: {
        type: graphql.GraphQLString
      },
      time: {
        type: graphql.GraphQLString
      },
      user_id: {
        type: graphql.GraphQLString
      } // user: {
      //     type: UserType,
      //     resolve(parent,args){
      //         return User.findById(parent.user_id);
      //     }
      // }

    };
  }
}); // const UserType =new GraphQLObjectType({
//     name:'User',
//     fields:()=>({
//         name:{type:graphql.GraphQLString},
//         id: { type: graphql.GraphQLString },
//         saved: { type: new graphql.GraphQLList(graphql.GraphQLString) },
//         posts:{
//             type:new graphql.GraphQLList(BlogType),
//             resolve(parent,args){
//                 // return _.filter(Blogs,{user_id:parent.id})
//                 return Blog.find({user_id:parent.id})
//             }
//         }
//     })
// })

var RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    post: {
      type: BlogType,
      args: {
        id: {
          type: graphql.GraphQLInt
        }
      },
      resolve: function resolve(parent, args) {
        return fetch("http://127.0.0.1:5000/singleblog/".concat(args.id)).then(function (response) {
          return response.json();
        });
      }
    },
    // user:{
    //     type:UserType,
    //     args:{id:{type:graphql.GraphQLString}},
    //     resolve(parent,args){
    //         // return _.find(Users,{id:args.id})
    //         return User.findById(args.id)
    //     }
    // },
    posts: {
      type: graphql.GraphQLList(BlogType),
      resolve: function resolve(parent, args) {
        return fetch("http://127.0.0.1:5000/blogs").then(function (response) {
          return response.json();
        }); // return Blog.find({})
      }
    } // Users:{
    //     type:graphql.GraphQLList(UserType),
    //     resolve(parent,args){
    //         // return Users
    //         return User.find({})
    //     }
    // }

  }
});
var Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // addUser:{
    //     type:UserType,
    //     args:{
    //         name:{type:graphql.GraphQLString},
    //         id: { type: graphql.GraphQLString },
    //         saved: { type: new graphql.GraphQLList(graphql.GraphQLString) }
    //     },
    //     resolve(parents,args){
    //         let user = new User({
    //             _id:args.id,
    //             name:args.name,
    //             saved:args.saved
    //         })
    //         return user.save()
    //     }
    // },
    addBlog: {
      type: BlogType,
      args: {
        name: {
          type: graphql.GraphQLString
        },
        title: {
          type: graphql.GraphQLString
        },
        content: {
          type: graphql.GraphQLString
        },
        time: {
          type: graphql.GraphQLString
        },
        user_id: {
          type: graphql.GraphQLString
        }
      },
      resolve: function resolve(parents, args) {
        var blog = {
          name: args.name,
          title: args.title,
          content: args.content,
          time: args.time,
          user_id: args.user_id
        };
        return fetch("http://127.0.0.1:5000/add_blogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(blog)
        });
      }
    },
    updateBlog: {
      type: BlogType,
      args: {
        id: {
          type: graphql.GraphQLInt
        },
        title: {
          type: graphql.GraphQLString
        },
        content: {
          type: graphql.GraphQLString
        }
      },
      resolve: function resolve(parents, args) {
        var blogs = {
          title: args.title,
          content: args.content
        };
        return fetch("http://127.0.0.1:5000/update/".concat(args.id), {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(blogs)
        });
      }
    },
    deleteBlog: {
      type: BlogType,
      args: {
        id: {
          type: graphql.GraphQLInt
        }
      },
      resolve: function resolve(parents, args) {
        return fetch("http://127.0.0.1:5000/deleteblog/".concat(args.id), {
          method: "DELETE"
        }).then(function (response) {
          return response.json();
        });
      }
    }
  }
});
module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});