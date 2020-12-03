"use strict";

var graphql = require('graphql');

var _ = require('lodash');

var GraphQLObjectType = graphql.GraphQLObjectType;

var Blog = require('./../model/Blog');

var User = require('./../model/User');

var BlogType = new GraphQLObjectType({
  name: 'Blog',
  fields: function fields() {
    return {
      id: {
        type: graphql.GraphQLString
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
      like: {
        type: graphql.GraphQLInt
      },
      user_id: {
        type: graphql.GraphQLString
      },
      user: {
        type: UserType,
        resolve: function resolve(parent, args) {
          return User.findById(parent.user_id);
        }
      }
    };
  }
});
var UserType = new GraphQLObjectType({
  name: 'User',
  fields: function fields() {
    return {
      name: {
        type: graphql.GraphQLString
      },
      id: {
        type: graphql.GraphQLString
      },
      saved: {
        type: new graphql.GraphQLList(graphql.GraphQLString)
      },
      posts: {
        type: new graphql.GraphQLList(BlogType),
        resolve: function resolve(parent, args) {
          // return _.filter(Blogs,{user_id:parent.id})
          return Blog.find({
            user_id: parent.id
          });
        }
      }
    };
  }
});
var RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    post: {
      type: BlogType,
      args: {
        id: {
          type: graphql.GraphQLString
        }
      },
      resolve: function resolve(parent, args) {
        //   return _.find(Blogs,{id:args.id})
        return Blog.findById(args.id);
      }
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: graphql.GraphQLString
        }
      },
      resolve: function resolve(parent, args) {
        // return _.find(Users,{id:args.id})
        return User.findById(args.id);
      }
    },
    posts: {
      type: graphql.GraphQLList(BlogType),
      resolve: function resolve(parent, args) {
        // return Blogs
        return Blog.find({});
      }
    },
    Users: {
      type: graphql.GraphQLList(UserType),
      resolve: function resolve(parent, args) {
        // return Users
        return User.find({});
      }
    }
  }
});
var Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: {
          type: graphql.GraphQLString
        },
        id: {
          type: graphql.GraphQLString
        },
        saved: {
          type: new graphql.GraphQLList(graphql.GraphQLString)
        }
      },
      resolve: function resolve(parents, args) {
        var user = new User({
          _id: args.id,
          name: args.name,
          saved: args.saved
        });
        return user.save();
      }
    },
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
        like: {
          type: graphql.GraphQLInt
        },
        user_id: {
          type: graphql.GraphQLString
        }
      },
      resolve: function resolve(parents, args) {
        var blog = new Blog({
          name: args.name,
          title: args.title,
          content: args.content,
          time: args.time,
          like: args.like,
          user_id: args.user_id
        });
        return blog.save();
      }
    }
  }
});
module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});