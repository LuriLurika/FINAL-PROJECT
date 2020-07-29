import React, { Component } from 'react'

import { withRouter } from 'react-router'
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faChalkboard } from "@fortawesome/free-solid-svg-icons";

import AuthService from "./../../../service/AuthService"
import "./../../App.css";


class Side extends Component {

  constructor(props) {

    super(props)
    this.state = {}

    this.AuthService = new AuthService()

  }


  render() {


    if (window.location.pathname.match(/login/)) {
      return null
    }

      // console.log(this.props.loggedInUser, 'abajo')
    return (
      <div className="left-sidebar">
        <Nav
          className=" d-none d-md-block bg-light sidebar"
          activeKey="/home"
          onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
          <Nav.Item>
            <NavLink to="/messages">
              <FontAwesomeIcon className="myIcon" icon={faEnvelope} /> Mensajes
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/events">
              <FontAwesomeIcon className="myIcon" icon={faCalendarWeek} />{" "}
              Eventos
            </NavLink>
          </Nav.Item>

          <Nav.Item>
            <NavLink to="/profile">
              <FontAwesomeIcon className="myIcon" icon={faUser} /> Perfil
            </NavLink>
          </Nav.Item>

          {this.props.loggedInUser !== null &&
          this.props.loggedInUser.type === "DIRECTOR" ? (
            <>
              {" "}
              <Nav.Item>
                <NavLink to="/courses">
                  <FontAwesomeIcon className="myIcon" icon={faChalkboard} />{" "}
                  Cursos
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/subjects">
                  <FontAwesomeIcon className="myIcon" icon={faBook} />{" "}
                  Asignaturas
                </NavLink>
              </Nav.Item>
            </>
          ) : null}
          {this.props.loggedInUser !== null &&
          this.props.loggedInUser.type === "TEACHER" ? (
            <>
              {" "}
              <Nav.Item>
                <NavLink to="/courses">
                  <FontAwesomeIcon className="myIcon" icon={faChalkboard} />{" "}
                  Cursos
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/subjects">
                  <FontAwesomeIcon className="myIcon" icon={faBook} />{" "}
                  Asignaturas
                </NavLink>
              </Nav.Item>
            </>
          ) : null}

          {this.props.loggedInUser !== null &&
          this.props.loggedInUser.type === "DIRECTOR" ? (
            <>
              <Nav.Item>
                <NavLink to="/users">
                  <FontAwesomeIcon className="myIcon" icon={faUserGraduate} />
                  Estudiantes
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/teachers">
                  <FontAwesomeIcon
                    className="myIcon"
                    icon={faChalkboardTeacher}
                  />
                  Profesores
                </NavLink>
              </Nav.Item>
            </>
          ) : null}
        </Nav>
      </div>
    );
  }
}

const Sidebar = withRouter(Side)
export default Sidebar
