import React from 'react'
import { Link } from 'react-router-dom'


  /**
    * Course fragment for main courses page
  */
export default function Course(props) {
    const course = props.course;
    return (
        <Link className="course--module course--link" to={"/courses/" + course.id}>
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
        </Link>
    )
}