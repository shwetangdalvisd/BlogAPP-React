import React from 'react';
import './App.css';
import Header from './component/Header_bar/Header'
import Addblogs from './component/Add_blogs/addblogs'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from "react-redux";
import configureStore from "./reducer/authstore"
import Viewblogs from './component/view_blogs/viewblogs'
import Singleblog from './component/view_blogs/Single_Blog/singleblog'
import GoogleAuth from './component/Authentication/GoogleAuth'
import Updateblog from './component/view_blogs/update_blog/updateblog'
import { LocalizeProvider } from "react-localize-redux";

function App() {
   return (

      <Provider store={configureStore}>
         <Router>
            <div className="App">
               <Switch>
                  <Header />
                  <Route path='/singleblog/:id' component={Singleblog} />
                  <Route path='/addblogs' component={Addblogs} />
                  <Route path='/viewblogs' component={Viewblogs} />
                  <Route path='/Authentication' component={GoogleAuth} />
                  <Route path='/updateblog/:id' component={Updateblog} />
               </Switch>
            </div>
         </Router>
      </Provider>
   );
}
export default App;
