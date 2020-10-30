import React from 'react';

class addblogsC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:``,
            title:``,
            content:``,
            error : []
        };
    }
    user_id = this.props.userId
    Namechange = e => this.state({name:e.target.value});
    Titlechange = e => this.state({title:e.target.value});
    Contentchange = e => this.state({content:e.target.value});
    validate_length = (length, errortype) => {
      if (length < 1) {
        setError([...error, errortype])
      }
    }
    validate = () => {
      this.validate_length(name.length, 'name')
      this.validate_length(title.length, 'title')
      this.validate_length(content.length, 'content')
  
    };
    
     onSubmitClick = (e) => {
                     e.preventDefault()
                      const blogs = {name:this.state.name,title:this.state.title, content:this.state.content,user_id:this.user_id };
                      validate();
                      if (error.length < 1 && this.props.isSignedIn ) {
                        const response = fetch('http://127.0.0.1:5000/add_blogs', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(blogs),
                        });
                      }
                      this.state({name:''});
                      this.state({title:''});
                      this.content({content:''});
                    }
    
    


    render() {
        return (
            <div className="header-dark">
            <div className="container hero">
              <div className="row">
                <div className="col-md-8 offset-md-2">
                  <h1 className="text-center">Add Your Blog Here</h1>
                </div>
              </div>
            </div>
            <form>
                <div className="form-group">
                  <label htmlFor="search-field"></label>
                  <input
                    type="text"
                    name="name"
                    required=""
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={Namechange}
                  />
                </div>
                <div className="Error-form">{error.nameError}</div>
                <div className="form-group">
                  <label htmlFor="search-field"></label>
                  <input
                    type="text"
                    name="title"
                    required=""
                    value={title}
                    placeholder="Enter Title"
                    onChange={Titlechange}
                  />
                </div>
                <div className="Error-form">
                  {error.titleError}
                  <div>
                    <br />
                    <br />
                    <div className="form-group">
                      <label htmlFor="search-field"></label>
                      <textarea
                        type="text"
                        name="content"
                        rows="10"
                        placeholder="Write Your Content Here."
                        cols="50"
                        onChange={Contentchange}
                      ></textarea>
                    </div>
                    <div className="Error-form">
                    {error.contentError}
                    </div>
                    <button
                      type="submit"
                      value="submit"
                      onClick={onSubmitClick}>
                      Submit
                    </button>
                  </div>
                  </div>
              </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
   return { isSignedIn: state.isSignedIn, userId: state.userId };
  };
  
  export default connect(mapStateToProps)(addblogsC);
  