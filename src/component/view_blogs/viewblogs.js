import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchdataV, fetchdataVD } from "./../Fetchdata/fetchdata";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { graphql, Query } from "react-apollo";


const getBlogsQuery = gql`
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

const Viewblogs = (props) => {
  console.log(props);
  const [blogs, setBlogs] = useState([]);

  const onDelete = (id) => {
    fetchdataVD(id).then((data) => {
      setBlogs(data.blogs);
    });
  };

  //   useEffect (() => {var data = props.data;
  //   if(data.loading === false){
  //         setBlogs(data.posts)
  //       }
  //       console.log(blogs,"latest")
  // },[])
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
  return (
    <div>
      <Query query={getBlogsQuery}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;

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
        }}
      </Query>
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(state, "state");
  return { isSignedIn: state.isSignedIn, userId: state.userId };
};

Viewblogs.propTypes = {
  isSignedIn: PropTypes.bool,
  userId: PropTypes.number,
};

var viewBlog = graphql(getBlogsQuery)(Viewblogs);
export default connect(mapStateToProps)(viewBlog);
