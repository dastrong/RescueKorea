import React, { Component, Fragment } from "react";
import { Form, Divider, Button, Message } from "semantic-ui-react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { fetcher } from "../../helpers";
import FormMessages from "../reusable/FormMessages";
import { addGooEvent } from "../../helpers/analytics";

const initialState = {
  email: "",
  password: "",
  isProcessing: false,
  successStatus: null,
  activeUser: "",
  errorStatus: null,
  errorMsg: "",
};

class LogInForm extends Component {
  state = initialState;

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isProcessing: true }, this.handleLogIn);
  };

  handleLogIn = async () => {
    try {
      const { password, email } = this.state;
      const resp = await fetcher("/users/login", {
        method: "post",
        body: JSON.stringify({ email, password }),
      });
      const user = await resp.json();
      addGooEvent("Auth", "Regular Login");
      if (!resp.ok) {
        throw user;
      }
      this.onSuccess(user);
    } catch (err) {
      this.onError(err);
    }
  };

  handleSocialLogin = async email => {
    try {
      if (!email) throw new Error("Sorry, something went wrong");
      const blob = await this.socialFetch(email);
      const user = await blob.json();
      addGooEvent("Auth", "Social Login");
      if (!blob.ok) throw user;
      this.onSuccess(user);
    } catch (err) {
      this.onError(err);
    }
  };

  socialFetch = email =>
    fetcher("/users/social", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

  onSuccess = user => {
    addGooEvent("Auth", "Login Successful");
    // put user in storage
    localStorage.setItem("user", JSON.stringify(user));
    // reset our state and show a successful message
    this.setState(
      {
        ...initialState,
        successStatus: true,
        activeUser: user.fullName,
      },
      // send the user obj back to Navbar
      // this will update the UI
      // logout button, etc
      () => this.props.handleUser(user)
    );
  };

  onError = err => {
    console.log(err);
    addGooEvent("Auth", "Login Failed");
    this.setState({
      ...initialState,
      errorStatus: true,
      errorMsg: err.message,
    });
  };

  render() {
    const {
      email,
      password,
      successStatus,
      errorStatus,
      errorMsg,
      activeUser,
      isProcessing,
    } = this.state;
    return (
      <Fragment>
        <Form
          loading={isProcessing}
          className="auth-form"
          success={successStatus}
          error={errorStatus}
          onSubmit={this.handleSubmit}
        >
          <Form.Group widths="equal">
            <Form.Input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <Form.Input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button
            color="purple"
            size="big"
            type="submit"
            content={isProcessing ? "Processing" : "Submit"}
            disabled={!email || !password}
          />
          <FormMessages
            successStatus={successStatus}
            successMsg={`Welcome back, ${activeUser}!`}
            errorStatus={errorStatus}
            errorMsg={errorMsg}
          />
        </Form>
        <Divider section horizontal content="OR" />
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_APP_ID}
          fields="email"
          callback={resp => this.handleSocialLogin(resp.email)}
          render={renderProps => (
            <Button
              size="big"
              color="facebook"
              icon="facebook"
              className="social-auth"
              content="Login with Facebook"
              onClick={resp =>
                this.setState({ isProcessing: true }, renderProps.onClick(resp))
              }
            />
          )}
        />
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          onSuccess={resp => this.handleSocialLogin(resp.profileObj.email)}
          onFailure={() => this.onError({ message: "Something went wrong." })}
          render={renderProps => (
            <Button
              size="big"
              color="google plus"
              icon="google"
              className="social-auth"
              content="Login with Google"
              onClick={renderProps.onClick}
            />
          )}
        />
        <Message color="purple">
          <Message.Header>Social Login Information</Message.Header>
          <Message.Content>
            Only your email is used for account verification purposes.
          </Message.Content>
          <Message.Content>
            Your account email has to match your social platform's email.
          </Message.Content>
          <Message.Content>We don't save anything.</Message.Content>
        </Message>
      </Fragment>
    );
  }
}

export default LogInForm;
