import React, { Component } from 'react'

class SingleblogC extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: []
        }
    }
    id = this.props.match.params.id

    componentDidMount() {
        fetch(`http://127.0.0.1:5000/singleblog/${this.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json().then(data => {

            this.state({ posts: data.singleb })
        }))

    }
    render() {
        return (
            <div className="num">
                {posts.map(post => {
                    return (
                        <div className='container' >
                            <div className="col-md-16">
                                <h1>{post.title}</h1>
                                <p>{post.content}</p>
                                <span className="badge">Posted:{post.time}</span><div className="pull-right"><span className="badge">{post.name}</span></div>
                            </div>
                        </div>

                    )
                })}

            </div>

        )
    }
}

export default SingleblogC