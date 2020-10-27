import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {signIn,signOut} from "../../redux/authaction";

const GoogleAuth = ({ userId ,dispatch }) => {
  const [auth, setAuth] = useState('');
  const [isSignedIn , setSignIn ] = useState(null)


  useEffect(() => {
    const params = {
      clientId:
        "435510788094-lkvfdj5gnpi5emfs7m9l4ntkrml1agsd.apps.googleusercontent.com",
      scope: "email",
    };

    window.gapi.load("client:auth2", () => {
      window.gapi.client.init(params).then(() => {
        setAuth(window.gapi.auth2.getAuthInstance());
        setSignIn(window.gapi.auth2.getAuthInstance().isSignedIn.get())
        onAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
      });
    });
  }, []);

  const onAuthChange = (isSignedIn) => {
    setSignIn(isSignedIn);

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

  const onSignInClick = () => {
    auth.signIn();
  };

  const onSignOutClick = () => {
    auth.signOut();
  };

  const renderAuthButton = () => {
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

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = state => {
  console.log(state,'state')
 return { isSignedIn: state.isSignedIn, userId: state.userId };
};

export default connect(mapStateToProps)(GoogleAuth);