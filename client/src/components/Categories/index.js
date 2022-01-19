import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../Styles/createGame/compCatagories/compcatagories.css'

export default function Categories({ input, setInput }) {
    const [ categoriesArray, setCategoriesArray ] = useState([])

    useEffect(() => {
        axios.get("https://opentdb.com/api_category.php")
        .then(res => {
            setCategoriesArray([...res.data.trivia_categories ])
        }).catch(e => console.warn(e))

        return 
    }, [])

    function handleChange (e) {
        const id = e.target.value
        // if (!id) { setInput({ ...input, topic: 0 })}
        setInput({ ...input, topic: id })
    }
    
    return (
        <>
            <label className='cat-label'>Select Category: </label>
            <select className='cat-select' name='category' id='category' onChange={handleChange}>
                <option value={0}>Any Category</option>
                {categoriesArray.map((topic, n) => <option key={n} value={topic.id}>{topic.name}</option>)}
            </select>
        </>
    )
}
