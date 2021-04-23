import ReactMarkdown from 'react-markdown'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Context } from '../Context';
import errorHandler from '../errorHandler';


/**
  * Renders a course's full details, and will conditionally
  * render update and delete buttons if user has perms
*/
export default function CourseDetail(props) {
    // Get the ID of the course we want to show
    const id = props.match.params.id;
    // Generate glorious history
    const history = useHistory();
    // Set context
    const context = useContext(Context);
    const authUser = context.authenticatedUser;

    const [course, setCourse] = useState([]);


    useEffect(() => {
        // Get course from API
        context.data.getCourse(id)
            .then(data => setCourse(data))
            .catch(err => errorHandler(err, history));
    }, [context.data, id, history])


    return (
        // Loop result and render course details
        <>{course.map(c => (
            <div key={c.title}>
                <div className="actions--bar">
                    <div className="wrap">
                        {
                            authUser ? // if the user is signed in...
                                authUser.id === c.user.id ? // show update and delete btns if they are the course owner
                                    <React.Fragment>
                                        <Link className="button" to={`/courses/${c.id}/update`}>Update Course</Link>
                                        <Link className="button" to={`${c.id}/delete`}>Delete Course</Link>
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
                                {/* Not all courses have esitmated time so we check for it */}
                                {c.estimatedTime ?
                                    <>
                                        <h3 className="course--detail--title">Estimated Time</h3>
                                        <p>{c.estimatedTime}</p>
                                    </>
                                    : null}
                                {c.materialsNeeded ?
                                    <>
                                        <h3 className="course--detail--title">Materials Needed</h3>
                                        <ul className="course--detail--list">
                                            <ReactMarkdown>{c.materialsNeeded}</ReactMarkdown>
                                        </ul>
                                    </>
                                    : null}
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
