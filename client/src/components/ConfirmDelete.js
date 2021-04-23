import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Context } from '../Context';
import errorHandler from '../errorHandler';
import Form from './Form';

  /**
    * Very simple delete confirmation screen to check wether 
    * user want's to actually delete the course
  */
export default function ConfirmDelete(props) {
    const context = useContext(Context);
    const history = useHistory();
    let id = props.match.params.id;

    const [errors, setErrors] = useState([])

    function cancel() {
        history.push(`/courses/${id}`);
    }

    function submit() {
        const authUser = context.authenticatedUser;
        const { emailAddress, password } = authUser;
        context.data.deleteCourse(emailAddress, password, id)
            .then(errors => {
                if (errors.length) {
                    setErrors(errors);
                } else {
                    history.push(`/`);
                }
            })
            .catch(err => {
                setErrors(err);
                errorHandler(err, history);
            });
    }

    return (
        <div className="form--centered">
            <h2>Are you sure you'd like to delete this course?</h2>
            <Form
                cancel={cancel}
                errors={errors}
                submit={submit}
                submitButtonText="Delete Course"
                // send null elements so all there is a submit and cancel btn
                elements={() => {return null}} /> 
        </div>
    );
}