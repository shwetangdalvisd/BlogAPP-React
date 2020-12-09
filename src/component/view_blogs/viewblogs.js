import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchdataV, fetchdataVD } from "./../Fetchdata/fetchdata";
import PropTypes from "prop-types";
import { gql, useQuery, useMutation} from "@apollo/client";
import { graphql, Query } from "react-apollo";

export const getBlogsQuery = gql`
  {
    posts {
      name
      id
      title
      content
      time
      like
      user_id
    }
  }
`;

const deleteBlogsquery = gql`
  mutation($id: String) {
    deleteBlog(id: $id) {
      id
    }
  }
`;

const Viewblogs = (props) => {
  console.log(props);
  const [del_blog, { d }] = useMutation(deleteBlogsquery);

  const onDelete = (id) => {
    del_blog({
      variables:{
        id:id
      },
      refetchQueries:[{query:getBlogsQuery}]
    })
  };
  const loged_in_up = (userid) => {
    if (props.isSignedIn && props.userId === userid) {
      return <button>UPDATE</button>;
    } else {
      return null;
    }
  };

  const loged_in_del = (id, userid) => {
    if (props.isSignedIn && props.userId === userid) {
      return (
        <button className="pull-right" onClick={() => onDelete(id)}>
          DELETE
        </button>
      );
    } else {
      return null;
    }
  };
  const { loading, error, data } = useQuery(getBlogsQuery);
  if (loading) return <p data-testid="loading">Loading ...</p>;
  if (data) {
    console.log(data)};
  const blogs = data.posts;
  return (
    <div>
      {blogs.map((post) => (
        <div key={post.id} className="container">
          <div className="col-md-8">
            <Link to={`/singleblog/${post.id}`}>
              <h1 data-testid="title">{post.title}</h1>
            </Link>
            <p data-testid="content">{post.content}</p>
            <span className="badge" data-testid="content">
              Posted:{post.time}
            </span>
            <div className="pull-right">
              <span className="badge">{post.name}</span>
            </div>
            <Link className="pull-right" to={`/updateblog/${post.id}`}>
              {loged_in_up(post.user_id)}
            </Link>
            {loged_in_del(post.id, post.user_id)}
          </div>
        </div>
      ))}
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(state, "state");
  return { isSignedIn: state.isSignedIn, userId: state.userId };
};

Viewblogs.propTypes = {
  isSignedIn: PropTypes.bool,
  userId: PropTypes.string,
};

export default connect(mapStateToProps)(Viewblogs);
