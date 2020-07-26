import React from 'react'


const Events = ({title, description, creator, participants, eventDate, location}) => {

    return (
        <div className="pink">

            <h3>Events</h3>
            <p>{title}</p>
            <p>{description}</p>
            <p>Organizado por: {creator}</p>
            <p>Asisten: {participants} alumnos</p>
            <p>Fecha: {eventDate}</p>
            <p>Lugar: {location}</p>



        </div>

    )
}

Events.defaultProps = {
    title: 'Excursión al Jardín Botánico de Madrid',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim reiciendis tenetur vero dignissimos',
    creator: 'Rocío Jurado',
    participants: 27,
    eventDate: '27 - 09 - 2020',
    location: '¿MAPITA?'

}
export default Events