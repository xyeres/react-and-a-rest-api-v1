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
        // Get courses using an in-line async fetch,
        // This was done for educational purposes, 
        // TODO future: use our custom Data.js API method to get data
        async function fetchData() {
            try {
                const response = await context.data.api("/courses")
                const data = await response.json();
                setData(data)
            } catch (error) {
                errorHandler(error, history)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
