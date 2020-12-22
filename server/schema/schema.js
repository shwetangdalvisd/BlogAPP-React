const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType } = graphql;
const Blog = require("./../model/Blog");
const User = require("./../model/User");
const { GraphQLDateTime } = require("graphql-iso-date");
const fetch = require("node-fetch");

const BlogType = new GraphQLObjectType({
  name: "Blog",
  fields: () => ({
    id: { type: graphql.GraphQLInt },
    name: { type: graphql.GraphQLString },
    title: { type: graphql.GraphQLString },
    content: { type: graphql.GraphQLString },
    time: { type: graphql.GraphQLString },
    user_id: { type: graphql.GraphQLString },
  }),
});


const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    post: {
      type: BlogType,
      args: { id: { type: graphql.GraphQLInt } },
      resolve(parent, args) {
        return fetch(
          `http://127.0.0.1:5000/singleblog/${args.id}`
        ).then((response) => response.json());
      },
    },
    posts: {
      type: graphql.GraphQLList(BlogType),
      resolve(parent, args) {
        return fetch("http://127.0.0.1:5000/blogs").then((response) =>
          response.json()
        );
        // return Blog.find({})
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBlog: {
      type: BlogType,
      args: {
        name: { type: graphql.GraphQLString },
        title: { type: graphql.GraphQLString },
        content: { type: graphql.GraphQLString },
        time: { type: graphql.GraphQLString },
        user_id: { type: graphql.GraphQLString },
      },
      resolve(parents, args) {
        let blog = {
          name: args.name,
          title: args.title,
          content: args.content,
          time: args.time,
          user_id: args.user_id,
        };
        return fetch("http://127.0.0.1:5000/add_blogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blog),
        });
      },
    },
    updateBlog: {
      type: BlogType,
      args: {
        id: { type: graphql.GraphQLInt },
        title: { type: graphql.GraphQLString },
        content: { type: graphql.GraphQLString },
      },
      resolve(parents, args) {
        let blogs = { title: args.title, content: args.content };
        return fetch(`http://127.0.0.1:5000/update/${args.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blogs),
        });
      },
    },
    deleteBlog: {
      type: BlogType,
      args: {
        id: { type: graphql.GraphQLInt },
      },
      resolve(parents, args) {
        return fetch(`http://127.0.0.1:5000/deleteblog/${args.id}`, {
          method: "DELETE",
        }).then((response) => response.json());
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
