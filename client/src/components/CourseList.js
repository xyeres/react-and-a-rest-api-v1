import React from 'react';
import Course from './Course';
import NoCourses from './NoCourses'

/**
  * Renders the course list and if there are no courses, renders the NoCourse
  * component
*/
export default function CourseList(props) {
    let courses;
    const results = props.data;
    if (results.length) {
        courses = results.map(c => <Course key={c.id} course={c} />);
    } else {
        courses = <NoCourses />;
    }

    return (
        <React.Fragment>
            {courses}
        </React.Fragment>
    )
}