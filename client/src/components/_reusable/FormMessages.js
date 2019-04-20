import React from "react";
import { Link } from "react-router-dom";
import { Message } from "semantic-ui-react";

const FormMessages = ({ successStatus, errorStatus, successMsg, errorMsg }) => (
  <Message
    compact
    hidden={!successStatus && !errorStatus}
    success={successStatus}
    error={errorStatus}
  >
    <Message.Content>
      <Message.Header>
        {successStatus ? successMsg : "Error, please try again."}
      </Message.Header>
      {successStatus ? (
        <p>
          Create a post <Link to="/create">here</Link>.
        </p>
      ) : (
        errorMsg
      )}
    </Message.Content>
  </Message>
);

export default FormMessages;
