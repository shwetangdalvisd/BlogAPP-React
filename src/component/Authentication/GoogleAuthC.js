import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../../actions/authaction";

class GoogleAuthC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: "",
      isSignedin: null,
    };
  }
  componentDidMount() {
    const params = {
      clientId:
        "435510788094-lkvfdj5gnpi5emfs7m9l4ntkrml1agsd.apps.googleusercontent.com",
      scope: "email",
    };

    window.gapi.load("client:auth2", () => {
      window.gapi.client.init(params).then(() => {
        this.setState({ auth: window.gapi.auth2.getAuthInstance() });
        this.setState({
          isSignedIn: window.gapi.auth2.getAuthInstance().isSignedIn.get(),
        });
        this.onAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        window.gapi.auth2
          .getAuthInstance()
          .isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    this.setState({ isSignedIn: isSignedIn });
    isSignedIn
      ? this.props.dispatch(
        signIn(window.gapi.auth2.getAuthInstance().currentUser.get().getId())
      )
      : this.props.dispatch(signOut());
  };

  onSignInClick = () => {
    this.state.auth.signIn();
  };

  onSignOutClick = () => {
    this.state.auth.signOut();
  };

  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <div>
          {<span>{this.props.userId}</span>}
          <button onClick={this.onSignOutClick}>Signout</button>
        </div>
      );
    } else {
      return <button onClick={this.onSignInClick}>Sign In with Google</button>;
    }
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.isSignedIn, userId: state.userId };
};

export default connect(mapStateToProps)(GoogleAuthC);
