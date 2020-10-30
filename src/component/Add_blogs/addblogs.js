import React, { useState } from "react";
import { connect } from "react-redux";

const Addblogs = (props) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user_id = props.userId;
  const Namechange = (e) => setName(e.target.value);
  const Titlechange = (e) => setTitle(e.target.value);
  const Contentchange = (e) => setContent(e.target.value);
  const [error, setError] = useState(
    []
  );

  const validate_length = (length, errortype) => {
    if (length < 1) {
      setError([...error, errortype])
    }
  }
  const validate = () => {
    validate_length(name.length, 'name')
    validate_length(title.length, 'title')
    validate_length(content.length, 'content')

  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    const blogs = { name, title, content, user_id };
    console.log(error)
    validate()
    if (error.length < 1 && props.isSignedIn) {
      const response = fetch("http://127.0.0.1:5000/add_blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        <div className="Error-form">{error['name']}</div>
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
          {error['title']}
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
            <div className="Error-form">{error['content']}</div>
            <button type="submit" value="submit" onClick={onSubmitClick}>
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

export default connect(mapStateToProps)(Addblogs);
