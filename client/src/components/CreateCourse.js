import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Context } from '../Context';
import errorHandler from '../errorHandler';
import Form from './Form';

/**
  * Allow a signed-in user to create a course
*/
export default function CreateCourse() {
    const context = useContext(Context);
    const authUser = context.authenticatedUser;
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [mats, setMats] = useState('');
    const [errors, setErrors] = useState([])

    function cancel() {
        history.push('/');
    }

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }
    function handleTimeChange(e) {
        setTime(e.target.value);
    }
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }
    function handleMatsChange(e) {
        setMats(e.target.value);
    }

    function submit() {
        const { emailAddress, password } = authUser;
        const course = {
            title,
            description,
            userId: authUser.id
        }
        if (mats) course['materialsNeeded'] = mats;
        if (time) course['estimatedTime'] = time;
        // create the course in the DB
        context.data.createCourse(emailAddress, password, course)
            .then(errors => {
                if (errors.length) {
                    setErrors(errors);
                } else {
                    history.push('/');
                }
            })
            .catch(err => errorHandler(err, history));
    }
    return (
        <div className="wrap">
            <h2>Create Course</h2>
            <Form
                cancel={cancel}
                errors={errors}
                submit={submit}
                submitButtonText="Create Course"
                elements={() => (
                    <React.Fragment>
                        <div className="main--flex">
                            <div>
                                <input
                                    id="courseTitle"
                                    name="courseTitle"
                                    type="text"
                                    value={title}
                                    onChange={handleTitleChange}
                                    placeholder="Title" />
                                <input
                                    id="courseAuthor"
                                    name="courseAuthor"
                                    type="text"
                                    value={`${authUser.firstName} ${authUser.lastName}`}
                                    disabled={true}
                                    placeholder="Author" />
                                <textarea
                                    id="courseDescription"
                                    name="courseDescription"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    placeholder="Course Description" />
                            </div>
                            <div>
                                <input
                                    id="estimatedTime"
                                    name="estimatedTime"
                                    type="text"
                                    value={time}
                                    onChange={handleTimeChange}
                                    placeholder="14 hours" />
                                <textarea
                                    id="materialsNeeded"
                                    name="materialsNeeded"
                                    type="password"
                                    value={mats}
                                    onChange={handleMatsChange}
                                    placeholder="Materials Needed" />
                            </div>
                        </div>
                    </React.Fragment>
                )} />
        </div>
    )
}
