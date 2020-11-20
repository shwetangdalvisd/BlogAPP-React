import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'

const Updateblog = ({ match }) => {
  const id = match.params.id;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const Titlechange = (e) => setTitle(e.target.value);
  const Contentchange = (e) => setContent(e.target.value);
  console.log(match);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/singleblog/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) =>
      response.json().then((data) => {
        setTitle(data.singleb[0].title);
        setContent(data.singleb[0].content);
      })
    );
  }, []);
  const onSubmitClick = (e) => {
    e.preventDefault();
    const blogs = { title, content };

    fetch(`http://127.0.0.1:5000/update/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogs),
    });
  };
  return (
    <form>
      <div className="container">
        <div className="form-group">
          <input type="text" value={title} onChange={Titlechange} />
          <br></br>
          <br></br>
          <textarea
            rows="10"
            cols="50"
            name="content"
            value={content}
            onChange={Contentchange}
          >
            {content}
          </textarea>
          {/* <span className="badge">Posted:{time}</span><div className="pull-right"><span className="badge">{name}</span></div> */}
          <br></br>
          <br></br>
          <button onClick={onSubmitClick}>UPDATE</button>
        </div>
      </div>
    </form>
  );
};

Updateblog.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.number
};

export default Updateblog;
