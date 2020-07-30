import React from "react";
import Col from "react-bootstrap/Col";
import EventCard from "../../../common/Event-Card";

const Events = ({
  events,
  onAcceptEvent,
  onDismissEvent,
  currentUserLoggedId,
}) => {
  return (
    <Col md={12}>
      <h3> Tus eventos</h3>
      <Col md={12} className='flex-map'>
      {events.map((elm) => (
        <EventCard
          key={elm._id}
          {...elm}
          canEdit={false}
          currentUserLoggedId={currentUserLoggedId}
          onAcceptEvent={() => onAcceptEvent(elm)}
          onDismissEvent={() => onDismissEvent(elm)}
        />
      ))}
      </Col>
    </Col>
  );
};

Events.defaultProps = {
  title: "Excursión al Jardín Botánico de Madrid",
  description:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim reiciendis tenetur vero dignissimos",
  creator: "Rocío Jurado",
  participants: 27,
  eventDate: "27 - 09 - 2020",
  location: "¿MAPITA?",
};
export default Events;
