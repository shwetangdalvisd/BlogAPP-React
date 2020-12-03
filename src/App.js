import React from "react";
import "./App.css";
import Header from "./component/Header_bar/Header";
import Addblogs from "./component/Add_blogs/addblogs";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./reducer/authstore";
import Viewblogs from "./component/view_blogs/viewblogs";
import Singleblog from "./component/view_blogs/Single_Blog/singleblog";
import GoogleAuth from "./component/Authentication/GoogleAuth";
import Updateblog from "./component/view_blogs/update_blog/updateblog";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <Provider store={configureStore}>
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <Header />
            <Route path="/singleblog/:id" component={Singleblog} />
            <Route path="/addblogs" component={Addblogs} />
            <Route path="/viewblogs" component={Viewblogs} />
            <Route path="/Authentication" component={GoogleAuth} />
            <Route path="/updateblog/:id" component={Updateblog} />
          </div>
        </Router>
      </ApolloProvider>
    </Provider>
  );
}
export default App;
