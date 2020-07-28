import React from "react";

import Col from "react-bootstrap/Col";

const Messages = ({ title, body, sendedBy, unreadMessages }) => {
  return (
    <Col className="green">
      <h3>Tienes {unreadMessages} sin leer</h3>
    </Col>
  );
};

export default Messages;
