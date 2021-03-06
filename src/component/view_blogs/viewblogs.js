import React ,{ Component,useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Viewblogs = () => {
	const[blogs,setBlogs] = useState([]);

	useEffect(() => {
   		fetch('http://127.0.0.1:5000/blogs').then(response => response.json().then(data => {
        console.log(data.blogs)
   			setBlogs(data.blogs);
   		}))
   	},[]);
   return (
    <div>
		{blogs.map(post =>{
      return(
        <div className='container' >
          <div className="col-md-8">
            <Link to={"/singleblog/"+post.id}><h1>{post.title}</h1></Link>
            <p>{post.content}</p>
            <span className="badge">Posted:{post.time}</span><div className="pull-right"><span className="badge">{post.name}</span></div> 
            </div>
        </div>
        )
    })}
    </div>
   );
}

export default Viewblogs;