import React from "react";
import { withRouter, Link } from "react-router-dom";
import StyledContainer from "./_reusable/StyledContainer";
import LogInForm from "./Auth/LogInForm";
import SignUpForm from "./Auth/SignUpForm";
import "./Auth.css";

const AuthHolder = ({ match, handleUser }) => {
  const isLogin = match.url.slice(1) === "login";
  return (
    <StyledContainer
      topHeader={isLogin ? "Log into your Account" : "Create an Account"}
      btmHeader={
        <Link to={isLogin ? "/signup" : "/login"}>
          {isLogin
            ? "No account? Register here."
            : "Already have an account? Log in here."}
        </Link>
      }
    >
      {isLogin ? (
        <LogInForm handleUser={handleUser} />
      ) : (
        <SignUpForm handleUser={handleUser} />
      )}
    </StyledContainer>
  );
};

export default withRouter(AuthHolder);
