import React from 'react'


const ProfileDetail = ({ name, lastname, email }) => {

    return (
        <div className="blue">

            <h3>Tus datos</h3>
            <p>nombre: {name}</p>
            <p>apellidos: {lastname}</p>
            <p>nombre: {email}</p>
            <button>Guardar cambios</button>
        


        </div>

    )
}
ProfileDetail.defaultProps = {
    name: 'Laura',
    lastname: 'Martínez',
    email: 'laura@gmail.com'
    
}

export default ProfileDetail