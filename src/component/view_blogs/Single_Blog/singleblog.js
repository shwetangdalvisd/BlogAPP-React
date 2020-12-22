import React from 'react';
import PropTypes from 'prop-types';
import { gql, useQuery } from "@apollo/client";

export const getBlogsQuery = gql`
  query($id:Int){
    post(id:$id) {
      name
      id
      title
      content
      time
      user_id
    }
  }
`;

const Singleblog = (props) => {
  // const [post, setPost] = useState([]);

  // const id = match.params.id;
 const id = parseInt(props.match.params.id)
 console.log(typeof id,"p")
 const { loading, data,error } = useQuery(getBlogsQuery,{
   variables:{id:id},
 })
  if (loading) return <p>Loading ...</p>;
  if (error) return console.log(error);
  if (data) {
    console.log(data,"data")}
  const post = data.post;
  return(
    <div key={post.id} className="container">
        <div className="col-md-16">
          <h1 data-testid='title'>{post.title}</h1>
          <p>{post.content}</p>
          <span className="badge">Posted:</span>
          <div className="pull-right">
            <span className="badge">{post.name}</span>
          </div>
        </div>
    </div>
  )

};

Singleblog.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string
};

export default Singleblog;
