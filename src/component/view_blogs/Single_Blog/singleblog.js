import React, { Component, useEffect, useState } from 'react';
import {fetchdataS} from './../../Fetchdata/fetchdata'

// const Singleblog = ({ match }) => {
//   const [posts, setPost] = useState([]);

//   const id = match.params.id;
//   console.log(id, `+++++++++++++++++++`)
//   useEffect(() => {fetchdataS(id).then(data => {
//       setPost(data.singleb)
//     })}
      // try {
        // const data = fetch(`http://127.0.0.1:5000/singleblog/${id}`, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // }).then((response) =>
        //   response.json().then((data) => {
        //     console.log(data, `+++++++++++++++`)
        //     setPost(data.singleb);
        //   })
        // );
        // setPost(data.singleb);
      // } catch (e) {
      //   console.log(e);
      // }
// , []);

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
          <div className="container">
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

export default Singleblog;
