import React, { Component } from 'react';
import './App.css';
import HeaderC from './component/Header_bar/Header'
import AddblogsC from './component/Add_blogs/addblogs'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from "react-redux";
import configureStore from "./reducer/authstore"
import viewblogsC from './component/view_blogs/viewblogs'
import singleblogC from './component/view_blogs/Single_Blog/singleblog'
import updateblogC from './component/view_blogs/update_blog/updateblog'
import GoogleAuthC from './component/Authentication/GoogleAuthC';
class AppC extends Component {
    render() {
        return (
            <Provider store={configureStore}>
                <Router>
                    <div className="App">
                        <HeaderC />
                        <Route path='/singleblog/:id' component={singleblogC} />
                        <Route path='/addblogs' component={AddblogsC} />
                        <Route path='/viewblogs' component={viewblogsC} />
                        <Route path='/Authentication' component={GoogleAuthC} />
                        <Route path='/updateblog/:id' component={updateblogC} />
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default AppC