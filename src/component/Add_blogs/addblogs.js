import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { gql } from "apollo-boost";
import { graphql, Mutation } from "react-apollo";

const ADD_BLOGS = gql`
  mutation AddBlogs($name: String!, $id: String!,$title:String!,$content:String!,$time:String,$like:Int!,$user_id:String) {
    post(name: $name, id: $id,title:$title,content:$content,time:$time,like:$like,user_id:$user_id) {
      name
      title
      content
      time
      like
      user_id
    }
  }
`


const Addblogs = (props) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const time =  new Date().toLocaleString()
  const like = 0;
  const user_id = props.userId;
  const Namechange = (e) => setName(e.target.value);
  const Titlechange = (e) => setTitle(e.target.value);
  const Contentchange = (e) => setContent(e.target.value);
  const [error, setError] = useState({
    nameError: ``,
    titleError: ``,
    contentError: ``,
  });

  const validate = () => {
    let errors = {};
    console.log(errors);
    let isValid = true;
    if (name.length < 1) {
      errors.nameError = 'Name cannot be blank';
      isValid = false;
    }
    if (title.length < 1) {
      errors.titleError = 'Title cannot be blank';
      isValid = false;
    }
    if (content.length < 1) {
      errors.contentError = 'Content cannot be blank';
      isValid = false;
    }
    setError(errors);
    return isValid;
  };

  const onSubmitClick = (e) => {
    e.preventDefault()
    const blogs = { name, title, content,user_id };
    const ValidationCheck = validate();
    if (ValidationCheck) {
          fetch('http://127.0.0.1:5000/add_blogs', {
              method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogs),
        });
    }
    setName("");
    setTitle("");
    setContent("");
  };

  return (
    <div className="header-dark">
      <div className="container hero">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1 className="text-center">Add Your Blog Here</h1>
          </div>
        </div>
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="search-field"></label>
          <input
            type="text"
            name="name"
            required=""
            placeholder="Enter Your Name"
            value={name}
            onChange={Namechange}
          />
        </div>
        <div className="Error-form" data-testid='name error'>{error.nameError}</div>
        <div className="form-group">
          <label htmlFor="search-field"></label>
          <input
            type="text"
            name="title"
            required=""
            value={title}
            placeholder="Enter Title"
            onChange={Titlechange}
          />
        </div>
        <div className="Error-form" data-testid='title error'>
          {error.titleError}
          <div>
            <br />
            <br />
            <div className="form-group">
              <label htmlFor="search-field"></label>
              <textarea
                type="text"
                name="content"
                rows="10"
                placeholder="Write Your Content Here."
                cols="50"
                onChange={Contentchange}
              ></textarea>
            </div>
            <div className="Error-form" data-testid='content error'>{error.contentError}</div>
            <Mutation mutation={ADD_BLOGS} variables={{ name,title,content,time,like,user_id }}>
              {(Add_Blogs) => <button onClick={Add_Blogs}>Submit</button>}
            </Mutation>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.isSignedIn, userId: state.userId };
};

Addblogs.propTypes = {
  userId: PropTypes.number,
};

var addBlog = graphql(ADD_BLOGS)(Addblogs);
export default connect(mapStateToProps)(addBlog);
