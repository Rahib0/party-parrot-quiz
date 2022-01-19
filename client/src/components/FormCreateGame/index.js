import React, { useState } from 'react'
import { Categories, QuestionCount } from '..'
import '../../Styles/createGame/createform.css'


export default function FormCreateGame() {
    const [ input, setInput ] = useState({ name: "", questions: 10, topic: 0, difficulty: "easy" })


    function handleSubmit (e) {
        e.preventDefault()
        if (!input.name) {
            alert("Please enter a name")
        } 
        else{

        }
    }


    return (
        <div>
            {console.log("input is: ", input)}
            <form onSubmit={handleSubmit}>
                <div className='name'>
                    <input type='text' onChange={(e) => {setInput({ ...input, name: e.target.value })}} placeholder='enter your name' />
                </div>
                
                <div>
                    <QuestionCount input={input} setInput={setInput}/>
                </div>

                <div>
                    <Categories input={input} setInput={setInput} />
                </div>

                <div>
                    <label className='diff-label' htmlFor="difficulty">Difficulty:</label>
                    <select className='diff-select' name='difficulty' onChange={(e) => {setInput({ ...input, difficulty: e.target.value })}}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <div>
                    <input className='create-btn' type="submit" value='Create Game'/>
                    
                </div>
            </form>
        </div>
    )
}
