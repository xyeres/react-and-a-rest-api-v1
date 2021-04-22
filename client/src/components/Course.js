import React from 'react'
import { Link } from 'react-router-dom'

export default function Course(props) {
    const course = props.course;
    return (
        <Link className="course--module course--link" to={"/courses/" + course.id}>
            <h2 className="course--label">{course.title}</h2>
            <h3 className="course--title">{course.description}</h3>
        </Link>
    )
}