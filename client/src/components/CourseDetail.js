import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import config from '../config';

export default function CourseDetail(props) {
    let id = props.match.params.id;

    const [course, setCourse] = useState([]);

    useEffect(() => {
        let url = config.apiBaseUrl + `/courses/${id}`

        axios(url)
            .then(res => setCourse(res.data))
            .catch(error => console.log('Error fetching and parsing course data', error))
    }, [id])


    return (
        <>
            {course.map(c => (
                <div key={c.title}>
                    <div className="actions--bar">
                        <div className="wrap">
                            <Link className="button" to={`/courses/${c.id}/update`}>Update Course</Link>
                            <Link className="button" to={`/courses/${c.id}`}>Delete Course</Link>
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                    <div className="wrap">
                        <h2>Course Detail</h2>
                        <form>
                            <div className="main--flex">
                                <div>
                                    <h3 className="course--detail--title">Course</h3>
                                    <h4 className="course--name">{c.title}</h4>
                                    <p>By {c.user.firstName} {c.user.lastName}</p>

                                    <p>{c.description}</p>
                                </div>
                                <div>
                                    <h3 className="course--detail--title">Estimated Time</h3>
                                    <p>{
                                        c.estimatedTime
                                        ? c.estimatedTime
                                        : <em>None provided</em>}</p>

                                    <h3 className="course--detail--title">Materials Needed</h3>
                                    <ul className="course--detail--list">
                                        {
                                            c.materialsNeeded
                                                ? c.materialsNeeded.replace('* ', '').split('\n*').map(item => <li key={item}>{item}</li>)
                                                : <em>Just your imagination</em>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            ))}
        </>
    )
}
