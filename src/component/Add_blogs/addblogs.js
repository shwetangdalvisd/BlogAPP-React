import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';
import { getBlogsQuery } from "../view_blogs/viewblogs";

const Mutation_ADD_BLOGS = gql`
  mutation($name: String!,$title:String!,$content:String!,$time:String!,$user_id:String) {
    addBlog(name: $name ,title:$title,content:$content,time:$time,user_id:$user_id) {
      name
      title
      content
      time
      user_id
    }
  }
`
const Addblogs = (props) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user_id = props.userId;
  console.log(user_id,"user_id")
  const Namechange = (e) => setName(e.target.value);
  const Titlechange = (e) => setTitle(e.target.value);
  const Contentchange = (e) => setContent(e.target.value);
  const [error, setError] = useState({
    nameError: ``,
    titleError: ``,
    contentError: ``,
  });
  const [M_ADD_BLOGS] = useMutation(Mutation_ADD_BLOGS);

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
    const ValidationCheck = validate();
    if (ValidationCheck) {
     const time =  new Date().toString()
      // console.log(typeof time,"timr")
      M_ADD_BLOGS({
        variables:{
          name:name,
          title:title,
          time:time,
          content:content,
          user_id:user_id,
        },
        refetchQueries:[{query:getBlogsQuery}]
      })
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
            <button type="submit" value="submit" data-testid='submit' onClick={onSubmitClick}>
                Submit
            </button>

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
  userId: PropTypes.string,
};

export default connect(mapStateToProps)(Addblogs);
