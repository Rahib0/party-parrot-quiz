import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function QuestionCount({categoriesArray, }) {
    const [ count, setCount ] = useState([]);
    
    useEffect(() => {
        axios.get(`https://opentdb.com/api_count.php?category=${category}`)
        .then(res => {
            setCount([...res.data])
        })
    }, [])

    return (
        <div>
            <label>No. of Questions:</label>
            <input type='number' id='amount' min='1' max={count} />
        </div>
    )
}


