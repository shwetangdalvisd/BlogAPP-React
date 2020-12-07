import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { gql } from "apollo-boost";
import { graphql, Query } from "react-apollo";

const getBlogsQuery = gql`
  query($id:String){
    post(id:$id) {
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

const Singleblog = (props) => {
  // const [post, setPost] = useState([]);

  // const id = match.params.id;
 console.log(props,"p")
  const displayblog = ()=>{
    const {post} = props.data;
    if (post){
      return(
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
      )
    }else{
      return(
        <div>Nothing to Return</div>
      )
    }
  }
        return (
          <div className="container">
            {displayblog()}
          </div>
        );
};

Singleblog.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.number
};

export default graphql(getBlogsQuery,{
  options:(props) =>{
    return{
      variables:{
        id:props.match.params.id
      }
    }
  }
})(Singleblog);
