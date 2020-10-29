import React, { Component, useState } from 'react';
import { connect } from 'react-redux';

const Addblogs = (props) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const user_id = props.userId
  const Namechange = (e) => setName(e.target.value);
  const Titlechange = (e) => setTitle(e.target.value);
  const Contentchange = (e) => setContent(e.target.value);
  const [error, setError] = useState({
    nameError: ``,
    titleError: ``,
    contentError: '',
  });
  console.log(props.isSignedIn,'ssn')
  const validate = () => {
    let errors = {};
    console.log(errors);
    let isValid = true;
    if (name.length < 1) {
      errors.nameError = 'Name Cannot be blank';
      isValid = false;
    }
    if (title.length < 1) {
      errors.titleError = 'title cannot be Blank';
      isValid = false;
    }
    if (content.length < 1) {
      errors.contentError = 'content cannot be Blank';
      isValid = false;
    }
    setError(errors);
    return isValid;
  };

 const onSubmitClick = (e) => {
 				e.preventDefault()
                  const blogs = { name, title, content,user_id };
                  const ValidationCheck = validate();
                  if (ValidationCheck && props.isSignedIn ) {
                    const response = fetch('http://127.0.0.1:5000/add_blogs', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(blogs),
                    });
                  }
                  setName('');
                  setTitle('');
                  setContent('');
                }

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
          <div className="Error-form">{error.nameError}</div>
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
          <div className="Error-form">
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
              <div className="Error-form">
              {error.contentError}
              </div>
              <button
                type="submit"
                value="submit"
                onClick={onSubmitClick}>
                Submit
              </button>
            </div>
            </div>
        </form>
      </div>
  );
};

const mapStateToProps = state => {
  console.log(state,'state')
 return { isSignedIn: state.isSignedIn, userId: state.userId };
};

export default connect(mapStateToProps)(Addblogs);
