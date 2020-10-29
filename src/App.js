import React ,{useEffect,usestate} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './component/Header_bar/Header'
import Addblogs from './component/Add_blogs/addblogs' 
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import { Provider } from "react-redux";
import  configureStore from "./redux/authstore"
import viewblogs from './component/view_blogs/viewblogs'
import singleblog from './component/view_blogs/Single_Blog/singleblog'  
import GoogleAuth from './component/Authentication/GoogleAuth'
import updateblog from './component/view_blogs/update_blog/updateblog'

function App() {
   return (
      <Provider store={configureStore}>
   	<Router>
      <div className="App">
         <Header />
         <Route path = '/singleblog/:id' component={singleblog} />
         <Route path = '/addblogs' component={Addblogs} />
         <Route path='/viewblogs' component={viewblogs} />
         <Route path='/Authentication' component={GoogleAuth} />
         <Route path='/updateblog/:id' component={updateblog} />
      </div>
      </Router>
      </Provider>
	);
}
export default App;
