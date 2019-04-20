import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input, Message, Checkbox } from "semantic-ui-react";
import ReCAPTCHA from "react-google-recaptcha";
import StyledContainer from "./_reusable/StyledContainer";
import FormMessages from "./_reusable/FormMessages";
import useFormState from "../hooks/useFormState";
import useFormIcons from "../hooks/useFormIcons";
import useFormStatus from "../hooks/useFormStatus";
import { fetcher } from "../helpers/api";
import { validateEmail } from "../helpers";
import { addGooEvent } from "../helpers/analytics";
import { handleLogin } from "../store/actions/user";
import "./Auth.css";

const initState = { email: "", fullName: "", password: "", confirmPassword: "" };
const initStatus = { successStatus: null, errorStatus: null, errorMsg: null };
const initIcn = { name: "asterisk", color: "red" };
const succIcn = { name: "check", color: "green" };
const initPwIcn = { name: "lock open", color: "red" };
const succPwIcn = { name: "lock", color: "green" };

function SignUp({ handleLogin }) {
  const [validCaptcha, setCaptcha] = useState(false);
  const [isAgreed, toggleIsAgreed] = useState(false);
  const [activeUser, setActiveUser] = useState("");

  const { state, isProcessing, ...func } = useFormState(initState, signup);
  const { email, fullName, password, confirmPassword } = state;

  const { status, setStatus } = useFormStatus(initStatus);
  const { successStatus, errorStatus, errorMsg } = status;

  const isRealEmail = validateEmail(email);
  const isValidPass = password.length > 7 && password === confirmPassword;
  const [emIcon, emColor] = useFormIcons(isRealEmail, initIcn, succIcn);
  const [fnIcon, fnColor] = useFormIcons(!!fullName, initIcn, succIcn);
  const [pwIcon, pwColor] = useFormIcons(isValidPass, initPwIcn, succPwIcn);

  async function signup() {
    try {
      const body = JSON.stringify({ email, fullName, password });
      const resp = await fetcher("/users/signup", { method: "POST", body });
      const user = await resp.json();
      if (!resp.ok) throw user.errors[Object.keys(user.errors)[0]];
      localStorage.setItem("user", JSON.stringify(user));
      addGooEvent("Auth", "Signup Successful");
      setStatus({ ...initStatus, successStatus: true });
      setActiveUser(user.fullName);
      func.resetState();
      func.setProcessing(false);
      // send user to redux store
      handleLogin(user);
    } catch (err) {
      console.log(err);
      addGooEvent("Auth", "Signup Failed");
      setStatus({ ...initStatus, errorStatus: true, errorMsg: err.message });
      func.setProcessing(false);
    }
  }

  return (
    <>
      <Helmet
        title="Sign Up - Rescue Korea"
        meta={[
          {
            name: "description",
            content: "Sign up to create and share your pet adoption listing",
          },
          {
            property: "og:title",
            content: "Sign Up - Rescue Korea",
          },
          {
            property: "og:description",
            content: "Sign up to create and share your pet adoption listing",
          },
          {
            property: "og:url",
            content: "https://rescuekorea.netlify.com/signup",
          },
        ]}
      />

      <StyledContainer
        topHeader="Create an Account"
        btmHeader={<Link to="/login">Already have an account? Log in here.</Link>}
      >
        <Form
          loading={isProcessing}
          className="auth-form"
          success={successStatus}
          error={errorStatus}
          warning={!isValidPass && password.length > 7 && confirmPassword.length > 7}
          onSubmit={func.handleSubmit}
        >
          <Form.Group widths="equal">
            <Form.Field>
              <Input
                label={{ icon: fnIcon, color: fnColor }}
                labelPosition="right corner"
                placeholder="Full Name"
                name="fullName"
                value={fullName}
                onChange={func.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                label={{ icon: emIcon, color: emColor }}
                labelPosition="right corner"
                placeholder="Email"
                name="email"
                type="email"
                value={email}
                onChange={func.handleChange}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <Input
                label={{ icon: pwIcon, color: pwColor }}
                labelPosition="right corner"
                type="password"
                placeholder="Password (min. 8 characters)"
                name="password"
                value={password}
                onChange={func.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                label={{ icon: pwIcon, color: pwColor }}
                labelPosition="right corner"
                type="password"
                placeholder="Confirm Password (min. 8 characters)"
                name="confirmPassword"
                value={confirmPassword}
                onChange={func.handleChange}
              />
            </Form.Field>
          </Form.Group>
          <Message warning hidden={isValidPass} header="Passwords do not match" />
          <Form.Field inline required>
            <Checkbox
              name="isAgreed"
              checked={isAgreed}
              onClick={() => toggleIsAgreed(!isAgreed)}
              label={
                <label>
                  I Agree to the <Link to="/policy">Listing Policies</Link>
                </label>
              }
            />
          </Form.Field>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_CAPTCHA_KEY}
            onChange={() => setCaptcha(true)}
            onExpired={() => setCaptcha(false)}
            className="recaptcha"
          />
          <Form.Button
            color="purple"
            size="big"
            type="submit"
            content={isProcessing ? "Processing" : "Submit"}
            // SWITCH - for production
            // disabled={!isRealEmail || !fullName || !isValidPass || !isAgreed || !validCaptcha}
            disabled={!isRealEmail || !fullName || !isValidPass || !isAgreed}
          />
          <FormMessages
            successStatus={successStatus}
            successMsg={`Thanks for joining, ${activeUser}!`}
            errorStatus={errorStatus}
            errorMsg={errorMsg}
          />
        </Form>
      </StyledContainer>
    </>
  );
}

const mapDispatchToProps = { handleLogin };

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
