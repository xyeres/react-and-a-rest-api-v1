import React, { useEffect, useState } from 'react';
import CourseList from './CourseList';
import NewCourse from './NewCourse';
import errorHandler from '../errorHandler';
import { useHistory } from 'react-router';
import axios from 'axios';

/**
  * Renders all courses, this is the main page of the site
*/
export default function Courses() {
    const history = useHistory();
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Get courses using an in-line axios call,
        // This was done for educational purposes, 
        let cancel;
        axios.get("http://localhost:5000/api/courses", {
            cancelToken: new axios.CancelToken(c => cancel = c)
        })
        .then(res => {
            if (res.status === 200) {
                setData(res.data);
            } else {
                let err = new Error();
                err.status = res.status;
                err.message = 'An error occurred while fetching courses.'
                throw err;
            }
        })
        .catch((err) => {
            errorHandler(err, history);
        })
        .finally(setIsLoading(false));

        return () => cancel();
    }, [history])

    return (
        <div className="wrap main--grid">
            {
                isLoading ?
                    <p>Loading courses...</p>
                    : <> <CourseList data={data} />  <NewCourse /> </>
            }
        </div>
    )
}
