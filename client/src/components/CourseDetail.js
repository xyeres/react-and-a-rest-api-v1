import ReactMarkdown from 'react-markdown'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Context } from '../Context';
import errorHandler from '../errorHandler';

export default function CourseDetail(props) {
    const history = useHistory();
    // Get global context
    const context = useContext(Context);
    const authUser = context.authenticatedUser;
    const [course, setCourse] = useState([]);
    let id = props.match.params.id;


    useEffect(() => {
        context.data.getCourse(id)
            .then(data => setCourse(data))
            .catch(err => errorHandler(err, history));
    }, [context.data, id, history])

    function handleDelete(e) {
        e.preventDefault();
        const { emailAddress, password } = authUser;
        context.data.deleteCourse(emailAddress, password, id)
            .then(history.push('/'))
            .catch(err => errorHandler(err, history))
    }

    return (
        <>{course.map(c => (
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
                                <ReactMarkdown>
                                    {c.description}
                                </ReactMarkdown>
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
                                            c.materialsNeeded.split('\n').map(item => <ReactMarkdown key={item}>{item}</ReactMarkdown>)
                                            : <ReactMarkdown>Just your imagination</ReactMarkdown>
                                    }
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        ))
        }
        </>
    )
}
