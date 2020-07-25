import React from 'react'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit} from "@fortawesome/free-solid-svg-icons";


const ProfileDetail = ({ name, lastname, email }) => {

    return (
        <div className="blue">

            <h3>Tus datos</h3> <Button><FontAwesomeIcon icon={faUserEdit} /></Button> 
            <p>nombre: {name}</p>
            <p>apellidos: {lastname}</p>
            <p>nombre: {email}</p>
        


        </div>

    )
}
ProfileDetail.defaultProps = {
    name: 'Laura',
    lastname: 'Martínez',
    email: 'laura@gmail.com'
    
}

export default ProfileDetail