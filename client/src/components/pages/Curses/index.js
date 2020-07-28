import React, { Component } from "react";

import "./index.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import SchoolHackApi from "../../../service/SchoolHackApi";
import Spinner from "../../ui/Spinner";
import CustomTable from "../../common/Table";

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: undefined,
    };
    this.schoolHackApi = new SchoolHackApi();
  }

  componentDidMount = () => {
    this.schoolHackApi
      .getAllCourses()
      .then((response) => {
        const ord = response.data.sort();

        this.setState({ courses: ord });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { courses } = this.state;

    return (
      <>
        <h1>Courses</h1>

        {!this.state.courses ? (
          <p>
            <Spinner />
          </p>
        ) : (
          <CustomTable
            data={courses}
            header={
              <>
                <th>Nombre</th>
                <th>Asignaturas</th>
              </>
            }
            rowMap={(elm) => (
              <tr>
                <td>
                  {elm.title}
                  <button>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>

                <td>
                  <ul>
                    {elm.subjects.map((Element) => (
                      <li>{Element.title} </li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
          />
        )}
      </>
    );
  }
}

export default Courses;
