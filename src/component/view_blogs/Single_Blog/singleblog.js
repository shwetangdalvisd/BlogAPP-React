import React ,{ Component,useEffect,useState } from 'react'


const Singleblog = ({match}) =>{
	const[posts,setPost] = useState([]);
	const id =match.params.id
	console.log(id)
	useEffect(() => {
	 fetch(`http://127.0.0.1:5000/singleblog/${id}`,{
  			method: 'GET',
  			headers:{
  				'Content-Type': 'application/json'
  			},
  		}).then(response => response.json().then(data => {
   
        setPost(data.singleb)
	}))},[]);
  	console.log(posts)
   return (
      <div className="num">
      {posts.map(post =>{
      return(
      	<div className='container' >
          <div className="col-md-16">
           <h1>{post.title}</h1>
            <p>{post.content}</p>
            <span className="badge">Posted:{post.time}</span><div className="pull-right"><span className="badge">{post.name}</span></div> 
           </div>
        </div>

      	)})}
         
      </div>
   );
}

export default Singleblog;

