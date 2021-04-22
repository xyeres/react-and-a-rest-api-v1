import React, { useContext, useEffect, useState } from 'react';
import CourseList from './CourseList';
import NewCourse from './NewCourse';
import { Context } from '../Context';

export default function Courses() {
    const context = useContext(Context);
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await context.data.api("/courses")
                const data = await response.json();
                setData(data)
            } catch (error) {
                console.log('Error fetching and parsing courses data', error)
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
