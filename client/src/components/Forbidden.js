import React from 'react'
/**
  * Simple user message if they are not allowed to access a route
*/
export default function Forbidden() {
    return (
        <div className="wrap">
            <h1>You're not authorized to do that.</h1>
        </div>
    )
}
