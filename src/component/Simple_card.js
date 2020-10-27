import React from 'react'

function Card(props) {
   return (
	<div class="card">
 
		<div class="container">
			<h4><b>Contact Name : {props.name}</b></h4>
			<p>Contact Number : {props.number}</p>
  		</div>
	</div> 
   );
}

export default Card;