import React from 'react'
import './Header'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const Header = (props) => {
    console.log(props)
    const loged_in = () =>{
        if (props.isSignedIn) {
            return <button data-testid='login_button' className="btn btn-light action-button">Sign out</button>
        }
        else{
            return <button  data-testid='login_button' className="btn btn-light action-button">LOG IN</button>
        }
    
    }
  return (
        <div className="header-dark">
            <nav className="navbar navbar-dark navbar-expand-md navigation-clean-search">
                <div className="container"><Link data-testid='Blog App' className="navbar-brand" to="/">BLOG APP</Link><button className="navbar-toggler" data-toggle="collapse" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse"
                        id="navcol-1">
                        <ul className="nav navbar-nav">
                            <li className="nav-item" role="presentation"><Link className="nav-link" data-testid='All Blogs' to="/viewblogs">All Blogs</Link></li>
                            <li className="nav-item" role="presentation"><Link className="nav-link" data-testid='Add Blogs' to="/addblogs">Add Blogs</Link></li>
                        </ul>
                        <form className="form-inline mr-auto" target="_self">
                        </form><span className="navbar-text"><Link to="/Authentication" className="login">{loged_in()}</Link></span></div>
                </div>
            </nav>
        </div>
  )
}

const mapStateToProps = state => {
   return { isSignedIn: state.isSignedIn, userId: state.userId };
};

Header.propTypes = {
    isSignedIn: PropTypes.bool
  };

export default connect(mapStateToProps)(Header);
