import React from 'react';
import { Link } from 'react-router-dom';

class HeaderC extends React.Component {
     loged_in = () =>{
        if (this.props.isSignedIn) {
            return <button className="btn btn-light action-button">Sign out</button>
        }
        else{
            return <button className="btn btn-light action-button">LOG IN</button>
        }
    
    }
    render() {
        return (
        <div className="header-dark">
            <nav className="navbar navbar-dark navbar-expand-md navigation-clean-search">
                <div className="container"><Link className="navbar-brand" to="/">BLOG APP</Link><button className="navbar-toggler" data-toggle="collapse" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse"
                        id="navcol-1">
                        <ul className="nav navbar-nav">
                            <li className="nav-item" role="presentation"><Link className="nav-link" to="/viewblogs">All Blogs</Link></li>
                            <li className="nav-item" role="presentation"><Link className="nav-link" to="/addblogs">Add Blogs</Link></li>
                        </ul>
                        <form className="form-inline mr-auto" target="_self">
                        </form><span className="navbar-text"><Link to="/Authentication" className="login">{loged_in()}</Link></span></div>
                </div>
            </nav>
        </div>
        );
    }
}

const mapStateToProps = state => {
   return { isSignedIn: state.isSignedIn, userId: state.userId };
};

export default connect(mapStateToProps)(HeaderC);