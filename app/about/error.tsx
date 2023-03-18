"use client"

export default function Error ({ error, reset }){
    return (
        <div>
            Sorry, couldn't load anything up: { error.message}
            <button onClick={() => reset()}>Go back</button>
        </div>
    )
}