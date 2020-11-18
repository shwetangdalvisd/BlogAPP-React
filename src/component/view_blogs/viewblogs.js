import React ,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import {fetchdataV,fetchdataVD} from './../Fetchdata/fetchdata'

const Viewblogs = (props) => {
  const[blogs,setBlogs] = useState([]);
  
  const onDelete = (id) =>{
    fetchdataVD(id).then(data => {
       setBlogs(data.blogs);
     });
    
  }

	useEffect(() => {
   		fetchdataV().then(data => {
         const da = data.blogs
        setBlogs(da);
        console.log(da,blogs,'test')
      })
     },[]);
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
      console.log(blogs,'ssd')
      return(
        <div className='container' >
          <div className="col-md-8">
            <Link to={`/singleblog/${post.id}`}><h1 data-testid='title' >{post.title}</h1></Link>
            <p data-testid='content'>{post.content}</p>
            <span className="badge" data-testid='content'>Posted:{post.time}</span><div className="pull-right"><span className="badge">{post.name}</span></div> 
            <Link className="pull-right" to={`/updateblog/${post.id}`}>
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