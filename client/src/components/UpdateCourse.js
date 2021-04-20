import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import config from '../config';



export default function UpdateCourse(props) {
    let id = props.match.params.id;
    const [course, setCourse] = useState([]);

    useEffect(() => {
        let url = config.apiBaseUrl + `/courses/${id}`
        let cancel;
        axios.get(url, {
            cancelToken: new axios.CancelToken(c => cancel = c)
        })
            .then(res => {
                setCourse(res.data)
                console.log(res.data)
            })
            .catch(error => console.log('Error fetching and parsing course data', error))

        return () => cancel()
    }, [id])

    const history = useHistory();

    function handleCancel(e) {
        e.preventDefault();
        history.push('/');
    }

    return (
        <>
            {course.map(c => (
                <div key={c.title}>
                    <div className="wrap">
                        <h2>Update Course</h2>
                        <form>
                            <div className="main--flex">
                                <div>
                                    <label htmlFor="courseTitle">Course Title</label>
                                    <input id="courseTitle" name="courseTitle" type="text" value={c.title} />

                                    <label htmlFor="courseAuthor">Course Author</label>
                                    <input id="courseAuthor" name="courseAuthor" type="text" disabled={true} defaultValue={`${c.user.firstName} ${c.user.lastName}`} />

                                    <label htmlFor="courseDescription">Course Description</label>
                                    <textarea id="courseDescription" name="courseDescription" value={c.description}></textarea>
                                </div>
                                <div>
                                    <label htmlFor="estimatedTime">Estimated Time</label>
                                    <input id="estimatedTime" name="estimatedTime" type="text" value={c.estimatedTime} />

                                    <label htmlFor="materialsNeeded">Materials Needed</label>
                                    <textarea id="materialsNeeded" name="materialsNeeded" value={c.materialsNeeded}></textarea>
                                </div>
                            </div>
                            <button className="button" type="submit">Update Course</button>
                            <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                        </form>
                    </div>
                </div>
            ))}
        </>
    )
}
