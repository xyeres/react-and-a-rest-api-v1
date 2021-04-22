import React, { useContext, useEffect, useState } from 'react';
import CourseList from './CourseList';
import NewCourse from './NewCourse';
import { Context } from '../Context';

export default function Courses() {
    const context = useContext(Context);
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            const response = await context.data.api("/courses")
            if (!ignore) {
                response.json().then(data => setData(data))
                .catch(error => console.log('Error fetching and parsing courses data', error))
                .finally(setIsLoading(false))
            }
            
        }
        fetchData();
        return () => { ignore = true; }
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
