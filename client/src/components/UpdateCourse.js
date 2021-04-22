import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Context } from '../Context';
import Form from './Form';

export default function UpdateCourse(props) {
    const context = useContext(Context);
    const authUser = context.authenticatedUser;
    const history = useHistory();
    let id = props.match.params.id;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [mats, setMats] = useState('');
    const [errors, setErrors] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await context.data.api(`/courses/${id}`)
                if (response.status === 404) {
                    history.push('/notfound');
                } else {
                    const data = await response.json();
                    setTitle(data[0].title)
                    setDescription(data[0].description)
                    if (data[0].estimatedTime) setTime(data[0].estimatedTime)
                    if (data[0].materialsNeeded) setMats(data[0].materialsNeeded)
                }
            } catch (error) {
                console.log('Error fetching and parsing courses data', error)
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])





    function cancel() {
        history.push(`/courses/${id}`);
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
        context.data.updateCourse(emailAddress, password, course, id)
            .then(errors => {
                if (errors === 403) {
                    history.push('/forbidden')
                }
                else if (errors.length) {
                    setErrors(errors);
                } else {
                    history.push(`/courses/${id}`);
                }
            })
            .catch(err => console.log(err));
    }


    return (
        <div className="wrap">
            <h2>Create Course</h2>
            <Form
                cancel={cancel}
                errors={errors}
                submit={submit}
                submitButtonText="Update Course"
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
