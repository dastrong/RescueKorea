import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import StyledContainer from "../reusable/StyledContainer";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class ContactForm extends Component {
  state = {
    name: "",
    email: "",
    content: "",
    subject: "",
  };

  componentDidMount() {
    const { user } = this.props;
    if (!user) return;
    this.setState({ name: user.fullName, email: user.email });
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (JSON.stringify(prevProps.user) === JSON.stringify(user)) return;
    !this.props.user
      ? this.setState({ name: "", email: "" })
      : this.setState({ name: user.fullName, email: user.email });
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = e => {
    this.setState({ loading: true });
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state }),
    })
      .then(({ status }) =>
        this.setState({
          status,
          loading: false,
          message:
            status === 200 ? "Success! Email sent." : "Error. Please try again later.",
        })
      )
      .catch(error => console.log(error));
    e.preventDefault();
  };

  render() {
    const { name, email, content, subject, status, message, loading } = this.state;
    return (
      <StyledContainer topHeader="Contact Us" btmHeader="Please fill out the form below">
        <Form
          name="contact"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={this.handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="bot-field" onChange={this.handleChange} />
          <Form.Group widths="equal">
            <Form.Input
              required
              label="Name"
              name="name"
              placeholder="Name"
              value={name}
              onChange={this.handleChange}
            />
            <Form.Input
              required
              type="email"
              label="Email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Input
            required
            label="Subject"
            name="subject"
            placeholder="Subject"
            value={subject}
            onChange={this.handleChange}
          />
          <Form.TextArea
            required
            autoHeight
            label="Question"
            name="content"
            rows="4"
            placeholder="Your question here"
            value={content}
            onChange={this.handleChange}
          />
          <Form.Button
            size="big"
            type="submit"
            disabled={message !== undefined}
            loading={loading}
            content={message || "Submit"}
            color={!status ? "purple" : status === 200 ? "green" : "red"}
          />
        </Form>
      </StyledContainer>
    );
  }
}

export default ContactForm;
