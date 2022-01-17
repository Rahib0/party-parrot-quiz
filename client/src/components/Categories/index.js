import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Categories({ setInput }) {
    const [ categoriesArray, setCategoriesArray ] = useState([])

    useEffect(() => {
        axios.get("https://opentdb.com/api_category.php")
        .then(res => {
            setCategoriesArray([...res.data.trivia_categories ])
        })
    }, [])

    function handleChange (e) {
        const id = e.value
        
    }
    
    return (
        <>
            <label>Select Category: </label>
            <select name='category' id='category' onChange={handleChange}>
                {categoriesArray.map((topic, n) => <option key={n} value={topic.id}>{topic.name}</option>)}
            </select>
        </>
    )
}
