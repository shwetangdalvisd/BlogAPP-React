import React ,{ Component } from 'react'
import './Header'
import { connect } from "react-redux";


const Header = (props) => {
    console.log(props.isSignedIn,'hed')
    const loged_in = () =>{
        if (props.isSignedIn) {
            return <button className="btn btn-light action-button">Sign out</button>
        }
        else{
            return <button className="btn btn-light action-button">LOG IN</button>
        }
    
    }
  return ( 
        <div className="header-dark">
            <nav className="navbar navbar-dark navbar-expand-md navigation-clean-search">
                <div className="container"><a className="navbar-brand" href="/">BLOG APP</a><button className="navbar-toggler" data-toggle="collapse" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse"
                        id="navcol-1">
                        <ul className="nav navbar-nav">
                            <li className="nav-item" role="presentation"><a className="nav-link" href="/viewblogs">All Blogs</a></li>
                            <li className="nav-item" role="presentation"><a className="nav-link" href="/addblogs">Add Blogs</a></li>
                        </ul>
                        <form className="form-inline mr-auto" target="_self">
                        </form><span className="navbar-text"><a href="/Authentication" className="login">{loged_in()}</a></span></div>
                </div>
            </nav>
        </div>
  )
}

const mapStateToProps = state => {
    console.log(state,'state')
   return { isSignedIn: state.isSignedIn, userId: state.userId };
};

export default connect(mapStateToProps)(Header);
