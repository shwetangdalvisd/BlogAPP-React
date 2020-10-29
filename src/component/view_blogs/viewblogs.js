import React ,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

const Viewblogs = (props) => {
  const[blogs,setBlogs] = useState([]);
  
  const onDelete = (id) =>{
    fetch(`http://127.0.0.1:5000/deleteblog/${id}`, {
      method: 'DELETE',
    }).then(response => response.json().then(data => {
      console.log(data.blogs)
       setBlogs(data.blogs);
     }));
    
  }

	useEffect(() => {
   		fetch('http://127.0.0.1:5000/blogs').then(response => response.json().then(data => {
        console.log(data.blogs)
   			setBlogs(data.blogs);
   		}))
     },[]);
     console.log(props.userId,'ser')
  const loged_in_up = (userid) =>{
    if (props.isSignedIn && props.userId===userid) {
          return <button>UPDATE</button>
      }
      else{
          return null
      }
  
  }

  const loged_in_del = (id,userid) =>{
    if (props.isSignedIn && props.userId===userid ) {
          return <button className="pull-right" onClick={() => onDelete(id)}>DELETE</button>
      }
      else{
          return null
      }
  
  }    
  return (
    <div>
		{blogs.map(post =>{
      return(
        <div className='container' >
          <div className="col-md-8">
            <Link to={"/singleblog/"+post.id}><h1>{post.title}</h1></Link>
            <p>{post.content}</p>
            <span className="badge">Posted:{post.time}</span><div className="pull-right"><span className="badge">{post.name}</span></div> 
            <Link className="pull-right" to={"/updateblog/"+post.id}>
              {loged_in_up(post.user_id)}</Link>
            {loged_in_del(post.id,post.user_id)}
            </div>
        </div>
        )
    })}
    </div>
   );
}
const mapStateToProps = state => {
  console.log(state,'state')
 return { isSignedIn: state.isSignedIn, userId: state.userId };
};

export default connect(mapStateToProps)(Viewblogs);