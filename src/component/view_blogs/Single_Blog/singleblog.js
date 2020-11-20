import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'

const Singleblog = ({ match }) => {
  const [posts, setPost] = useState([]);

  const id = match.params.id;
  useEffect(() => {
    const fetchRes = () => {
      fetch(`http://127.0.0.1:5000/singleblog/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) =>
        response.json().then((data) => {
          setPost(data.singleb);
        })
      );
    };
    fetchRes();
  }, []);
  

  console.log(posts,'posts')
  return (
    <div>
      {posts.map((post) => {
        return (
          <div key={post.id} className="container">
            <div className="col-md-16">
              <h1 data-testid='title'>{post.title}</h1>
              <p>{post.content}</p>
              <span className="badge">Posted:{post.time}</span>
              <div className="pull-right">
                <span className="badge">{post.name}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Singleblog.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.number
};

export default Singleblog;
