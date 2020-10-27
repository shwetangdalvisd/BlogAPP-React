import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {signIn,signOut} from "/home/shwetang.dalvi/WS/my-app/src/redux/authaction";

const GoogleAuth = ({ dispatch, isSignedIn, userId }) => {
  const [auth, setAuth] = useState('');

  useEffect(() => {
    const params = {
      clientId:
        "ID",
      scope: "email",
    };

    window.gapi.load("client:auth2", () => {
      window.gapi.client.init(params).then(() => {
        setAuth(window.gapi.auth2.getAuthInstance());
        onAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
      });
    });
  }, []);

  const onAuthChange = (isSignedIn) => {
    console.log(isSignedIn,'isSig')
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
          <span>{userId}</span>
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
  // return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStateToProps)(GoogleAuth);
