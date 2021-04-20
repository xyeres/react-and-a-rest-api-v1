import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

export default function CreateCourse(props) {
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('Joe Blow');
    const [desc, setDesc] = useState('');
    const [time, setTime] = useState('');
    const [mats, setMats] = useState('');

    // TODO: Add current user's to author field
    // !Also, make this form post to backend....
    function handleCancel(e) {
        e.preventDefault();
        history.push('/');
    }
    
    function handleTitleChange(e) {
        setTitle(e.target.value);
    }
    function handleTimeChange(e) {
        setTime(e.target.value);
    }
    function handleDescChange(e) {
        setDesc(e.target.value);
    }
    function handleMatsChange(e) {
        setMats(e.target.value);
    }


    return (
        <div className="wrap">
            <h2>Create Course</h2>
            <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                    <li>Please provide a value for "Title"</li>
                    <li>Please provide a value for "Description"</li>
                </ul>
            </div>
            <form>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" onChange={handleTitleChange} value={title} />

                        <label htmlFor="courseAuthor">Course Author</label>
                        <input id="courseAuthor" disabled={true} name="courseAuthor" type="text" value={author} />

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription" onChange={handleDescChange} value={desc}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" onChange={handleTimeChange} value={time} />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" onChange={handleMatsChange} value={mats}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}
