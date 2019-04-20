import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { Form, Divider, Button, Message } from "semantic-ui-react";
import StyledContainer from "./_reusable/StyledContainer";
import FormMessages from "./_reusable/FormMessages";
import useFormState from "../hooks/useFormState";
import useFormStatus from "../hooks/useFormStatus";
import { apiRequest } from "../helpers/api";
import { addGooEvent } from "../helpers/analytics";
import { handleLogin } from "../store/actions/user";
import "./Auth.css";

const initState = { email: "", password: "" };
const initStatus = { successStatus: null, errorStatus: null, errorMsg: null };

function LogIn({ handleLogin }) {
  const [activeUser, setActiveUser] = useState("");

  const { state, isProcessing, ...func } = useFormState(initState, login);
  const { email, password } = state;

  const { status, setStatus } = useFormStatus(initStatus);
  const { successStatus, errorStatus, errorMsg } = status;

  async function login() {
    try {
      const body = JSON.stringify({ email, password });
      const user = await apiRequest("/users/login", { method: "POST", body });
      addGooEvent("Auth", "Regular Login");
      onSuccess(user);
    } catch (err) {
      onError(err);
    }
  }

  async function socialLogin(email) {
    try {
      if (!email) throw new Error("Sorry, something went wrong");
      const body = JSON.stringify({ email });
      const user = await apiRequest("/users/social", { method: "POST", body });
      addGooEvent("Auth", "Social Login");
      onSuccess(user);
    } catch (err) {
      onError(err);
    }
  }

  function onSuccess(user) {
    localStorage.setItem("user", JSON.stringify(user));
    setStatus({ ...initStatus, successStatus: true });
    func.resetState();
    func.setProcessing(false);
    setActiveUser(user.fullName);
    handleLogin(user);
  }

  function onError(err) {
    console.log(err);
    addGooEvent("Auth", "Login Failed");
    setStatus({ ...initStatus, errorStatus: true, errorMsg: err.message });
    func.setProcessing(false);
  }

  return (
    <>
      <Helmet>
        <title>Log In - Rescue Korea</title>
        <meta
          name="description"
          content="Log in to create, edit or delete your pet adoption listing"
        />
        <meta property="og:title" content="Log In - Rescue Korea" />
        <meta
          property="og:description"
          content="Log in to create, edit or delete your pet adoption listing"
        />
        <meta property="og:url" content="https://rescuekorea.netlify.com/login" />
      </Helmet>

      <StyledContainer
        topHeader="Log into your Account"
        btmHeader={<Link to="/signup">No account? Register here.</Link>}
      >
        <Form
          loading={isProcessing}
          className="auth-form"
          success={successStatus}
          error={errorStatus}
          onSubmit={func.handleSubmit}
        >
          <Form.Group widths="equal">
            <Form.Input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={func.handleChange}
            />
            <Form.Input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={func.handleChange}
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
          callback={resp => socialLogin(resp.email)}
          render={renderProps => (
            <Button
              size="big"
              color="facebook"
              icon="facebook"
              className="social-auth"
              content="Login with Facebook"
              onClick={resp => renderProps.onClick(resp)}
            />
          )}
        />
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          onSuccess={resp => socialLogin(resp.profileObj.email)}
          onFailure={() => onError({ message: "Something went wrong." })}
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
      </StyledContainer>
    </>
  );
}

const mapDispatchToProps = { handleLogin };

export default connect(
  null,
  mapDispatchToProps
)(LogIn);
