import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";
import StyledContainer from "./_reusable/StyledContainer";
import useFormState from "../hooks/useFormState";
import useFormStatus from "../hooks/useFormStatus";
import useFormRequired from "../hooks/useFormRequired";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const required = ["name", "email", "content", "subject"];

const initState = { name: "", email: "", content: "", subject: "" };

const initStatus = {
  successStatus: null,
  successMsg: "",
  errorStatus: null,
  errorMsg: "",
};

function Contact({ name, email }) {
  const { state, isProcessing, ...func } = useFormState(initState, contact);
  const { status, setStatus } = useFormStatus(initStatus);
  const isFormFilled = useFormRequired(state, required);

  useEffect(() => {
    if (!name || !email) return;
    func.setState({ ...initState, name, email });
  }, [name, email]);

  function handleError(err) {
    func.setProcessing(false);
    setStatus({ ...initStatus, errorStatus: true, errorMsg: err });
  }

  async function contact() {
    try {
      if (!isFormFilled) return handleError("Please fill in all required fields");
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...state }),
      });
      func.setProcessing(true);
      setStatus({
        ...initStatus,
        successStatus: true,
        successMsg: "Success! Email sent.",
      });
    } catch (err) {
      console.log(err);
      func.setProcessing(false);
      setStatus({
        ...initStatus,
        errorStatus: true,
        errorMsg: "Error. Please try again later.",
      });
    }
  }

  return (
    <>
      <Helmet
        title="Contact Us - Rescue Korea"
        meta={[
          {
            name: "description",
            content:
              "If you have any questions, concerns or technical issues, please contact us here",
          },
          {
            property: "og:title",
            content: "Contact Us - Rescue Korea",
          },
          {
            property: "og:description",
            content:
              "If you have any questions, concerns or technical issues, please contact us here",
          },
          {
            property: "og:url",
            content: "https://rescuekorea.netlify.com/contact",
          },
        ]}
      />

      <StyledContainer topHeader="Contact Us" btmHeader="Please fill out the form below">
        <Form
          name="contact"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={func.handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="bot-field" onChange={func.handleChange} />
          <Form.Group widths="equal">
            <Form.Input
              error={status.errorStatus && !state.name}
              label="Name"
              name="name"
              placeholder="Name"
              value={state.name}
              onChange={func.handleChange}
            />
            <Form.Input
              error={status.errorStatus && !state.email}
              type="email"
              label="Email"
              name="email"
              placeholder="Email"
              value={state.email}
              onChange={func.handleChange}
            />
          </Form.Group>
          <Form.Input
            error={status.errorStatus && !state.subject}
            label="Subject"
            name="subject"
            placeholder="Subject"
            value={state.subject}
            onChange={func.handleChange}
          />
          <Form.TextArea
            error={status.errorStatus && !state.content}
            autoHeight
            label="Question"
            name="content"
            rows="4"
            placeholder="Your question here"
            value={state.content}
            onChange={func.handleChange}
          />
          <Form.Button
            size="big"
            type="submit"
            disabled={status.successStatus && state.errorStatus}
            loading={isProcessing}
            content={
              isFormFilled ? "Submit" : status.successMsg || status.errorMsg || "Submit"
            }
            color={
              isFormFilled || (!status.successStatus && !status.errorStatus)
                ? "purple"
                : status.successStatus
                ? "green"
                : "red"
            }
          />
        </Form>
      </StyledContainer>
    </>
  );
}

const mapStateToProps = ({ user }) => ({
  name: user.user.fullName,
  email: user.user.email,
});

export default connect(mapStateToProps)(Contact);
