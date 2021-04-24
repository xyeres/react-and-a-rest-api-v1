import React, { useContext, useEffect, useState } from 'react';
import CourseList from './CourseList';
import NewCourse from './NewCourse';
import { Context } from '../Context';
import errorHandler from '../errorHandler';
import { useHistory } from 'react-router';

/**
  * Renders all courses, this is the main page of the site
*/
export default function Courses() {
    const history = useHistory();
    const context = useContext(Context);
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    
    
    useEffect(() => {
        // Get course from API
        context.data.getCourses()
            .then(data => setData(data))
            .catch(err => errorHandler(err, history))
            .finally(setIsLoading(false))
    }, [context.data, history])

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
