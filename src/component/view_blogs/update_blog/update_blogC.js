import React, { Component } from 'react'

class Update_blogC extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            title: '',
            content: ''
        }
    }
    Titlechange = e => this.state({ title: e.target.value });
    Contentchange = e => this.state({ content: e.target.value });
    id = this.props.match.params.id
    componentDidMount() {
        fetch(`http://127.0.0.1:5000/singleblog/${this.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json().then(data => {
            this.state({ posts: data.singleb })
            this.state({ title: data.singleb[0].title })
            this.state({ content: data.singleb[0].content })
        }))

    }
    onSubmitClick = e => {
        e.preventDefault()
        const blogs = { title, content };

        const response = fetch(`http://127.0.0.1:5000/update/${this.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blogs),
        });
    }

    render() {
        return (
            <form>
                <div className='container' >
                    <div className="form-group">
                        <input type='text' value={title} onChange={Titlechange} />
                        <br></br>
                        <br></br>
                        <textarea rows="10" cols="50" name="content" value={content} onChange={Contentchange}>{content}</textarea>
                        {/* <span className="badge">Posted:{time}</span><div className="pull-right"><span className="badge">{name}</span></div> */}
                        <br></br>
                        <br></br>
                        <button onClick={onSubmitClick}>UPDATE</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default Update_blogC