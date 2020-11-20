import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class viewblogsC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
    };
  }

  onDelete = (id) => {
    fetch(`http://127.0.0.1:5000/deleteblog/${id}`, {
      method: "DELETE",
    }).then((response) =>
      response.json().then((data) => {
        this.state({ blogs: data.blogs });
      })
    );
  };

  componentDidMount() {
    fetch("http://127.0.0.1:5000/blogs").then((response) =>
      response.json().then((data) => {
        this.state({ blogs: data.blogs });
      })
    );
  }
  loged_in_up = (userid) => {
    if (this.props.isSignedIn && this.props.userId === userid) {
      return <button>UPDATE</button>;
    } else {
      return null;
    }
  };

  loged_in_del = (id, userid) => {
    if (this.props.isSignedIn && this.props.userId === userid) {
      return (
        <button className="pull-right" onClick={() => onDelete(id)}>
          DELETE
        </button>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <div>
        {blogs.map((post) => {
          return (
            <div className="container">
              <div className="col-md-8">
                <Link to={`/singleblog/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{post.content}</p>
                <span className="badge">Posted:{post.time}</span>
                <div className="pull-right">
                  <span className="badge">{post.name}</span>
                </div>
                <Link className="pull-right" to={`/updateblog/${post.id}`}>
                  {loged_in_up(post.user_id)}
                </Link>
                {loged_in_del(post.id, post.user_id)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.isSignedIn, userId: state.userId };
};

export default connect(mapStateToProps)(viewblogsC);
