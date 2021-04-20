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
            .then(res => setCourse(res.data))
            .catch(error => console.log('Error fetching and parsing course data', error))
            .finally()

        return () => cancel()
    }, [id])

    const history = useHistory();

    function handleCancel(e) {
        e.preventDefault();
        history.push('/');
    }

    return (
        <div className="wrap">
            <h2>Update Course</h2>
            <form>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" value="Build a Basic Bookcase" />

                        <label htmlFor="courseAuthor">Course Author</label>
                        <input id="courseAuthor" name="courseAuthor" type="text" value="Joe Smith" />

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription">
                        </textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" value="14 hours" />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded">
                        
                        </textarea>
                    </div>
                </div>
                <button className="button" type="submit">Update Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}
