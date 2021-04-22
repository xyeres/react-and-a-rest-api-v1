import React from 'react'

export default function UnhandledError({error}) {
    return (
        <div className="wrap">
            <h1>Whoops! Something appears to have gone wrong. {error}</h1>
        </div>
    )
}
