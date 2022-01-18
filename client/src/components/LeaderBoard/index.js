import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function LeaderBoard() {
    const [ parameters, setParameters ] = useState({ difficulty: "easy", category: 0 })
    const [ categoriesArray, setCategoriesArray ] = useState([{id: 0, name: "Any Category"}])
    const [ playersArray, setPlayersArray ] = useState([{name: "Bob", score: 250}, {name: "Charlie", score: 200}, {name: "Alice", score: 150} ])
    
    function handleChange (e) {
        const key = e.target.name
        const value = e.target.value
        setParameters({ ...parameters, [key]: value })
    }
    
    useEffect(() => {
        axios.get("https://opentdb.com/api_category.php")
        .then(res => {
            setCategoriesArray([ ...categoriesArray, ...res.data.trivia_categories ])
        }).catch(e => console.warn(e))

        return 
    }, [])

    // UNCOMMENT WHEN BACKEND FINISHES LEADERBOARDS API ROUTE
    // useEffect(() => {
    //     axios.get("/")
    //     .then(res => {
    //         setPlayersArray([ ...res.data ])
    //     }).catch(e => console.warn(e))
    // }, [parameters])

    return (
        <>
            <div id='parameter_selection'>
                <label htmlFor="difficulty">Difficulty</label>
                <select name="difficulty" id="difficulty" value={parameters.difficulty} onChange={handleChange}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <label htmlFor="category">Category</label>
                <select name='category' id='category' value={parameters.category} onChange={handleChange}>
                    {categoriesArray.map((topic, n) => <option key={n} value={topic.id}>{topic.name}</option>)}
                </select>
            </div>
            <h1>Leaderboards</h1>
            <h2>{categoriesArray.find(topic => topic.id == parameters.category).name} - {parameters.difficulty.charAt(0).toUpperCase() + parameters.difficulty.slice(1)}</h2>
            
            <ol className='leaderboard'>
                {playersArray.map((player, i) => <li key={i}>
                    <div className='player_name'>{player.name}</div>
                    <div className='player_score'>{player.score} points</div>
                </li>)}
            </ol>
        </>
    )
}
