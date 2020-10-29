import React, { Component } from 'react'

class GoogleAuthC extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth : '',
            isSignedin : null           
        }
    }
    componentDidMount() {
        const params = {
            clientId:
              "435510788094-lkvfdj5gnpi5emfs7m9l4ntkrml1agsd.apps.googleusercontent.com",
            scope: "email",
          };
      
          window.gapi.load("client:auth2", () => {
            window.gapi.client.init(params).then(() => {
              this.state.auth(window.gapi.auth2.getAuthInstance());
              this.state.isSignedin(window.gapi.auth2.getAuthInstance().isSignedIn.get())
              onAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
              window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
            });
          });
        
    }
    onAuthChange = (isSignedIn) => {
        this.state.isSignedin(isSignedIn);
    
        if (isSignedIn) {
          dispatch(
            signIn(
              window.gapi.auth2.getAuthInstance().currentUser.get().getId()
            )
          );
        } else {
          dispatch(signOut());
        }
      };
    
    onSignInClick = () => {
        auth.signIn();
      };
    
    onSignOutClick = () => {
        auth.signOut();
      };
    
    renderAuthButton = () => {
        console.log(isSignedIn,'sghhdg')
        if (isSignedIn === null) {
          return null;
        } else if (isSignedIn) {
          return (
            <div>
              { <span>{userId}</span> }
              <button onClick={onSignOutClick}>Signout</button>
            </div>
          );
        } else {
          return <button onClick={onSignInClick}>Sign In with Google</button>;
        }
      };

    render() {
        return (
            <div>{renderAuthButton()}</div>
            
        )
    }
}

export default GoogleAuthC