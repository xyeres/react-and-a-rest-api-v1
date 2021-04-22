import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import config from '../config';
import { Context } from '../Context';

export default function CourseDetail(props) {
    const history = useHistory();
    // Get global context
    const context = useContext(Context);
    const authUser = context.authenticatedUser;

    const [course, setCourse] = useState([]);
    let id = props.match.params.id;

    useEffect(() => {
        let url = config.apiBaseUrl + `/courses/${id}`

        axios(url)
            .then(res => setCourse(res.data))
            .catch(error => console.log('Error fetching and parsing course data', error))
    }, [id])

    function handleDelete(e) {
        e.preventDefault();
        const { emailAddress, password } = authUser;
        context.data.deleteCourse(emailAddress, password, id)
            .then(history.push('/'))
            .catch(err => console.log(err))
    }

    return (
        <>
            {course.map(c => (
                <div key={c.title}>
                    <div className="actions--bar">
                        <div className="wrap">
                            {
                                authUser ?
                                authUser.id === c.user.id ?
                                    <React.Fragment>
                                        <Link className="button" to={`/courses/${c.id}/update`}>Update Course</Link>
                                        <button className="button" onClick={handleDelete}>Delete Course</button>
                                    </React.Fragment>
                                    : null
                                : null
                            }
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
                                    <p>
                                        {
                                            c.estimatedTime ?
                                                c.estimatedTime
                                                : <em>None provided</em>
                                        }
                                    </p>

                                    <h3 className="course--detail--title">Materials Needed</h3>
                                    <ul className="course--detail--list">
                                        {
                                            c.materialsNeeded ?
                                                c.materialsNeeded.replace('* ', '').split('\n*').map(item => <li key={item}>{item}</li>)
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
