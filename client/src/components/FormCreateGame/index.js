import React, { useState } from 'react'
import { Categories, QuestionCount } from '..'



export default function FormCreateGame() {
    const [ input, setInput ] = useState({ name: "", questions: 1, topic: 0, difficulty: "easy" })


    
    // const updateInput = e => {
    //     const fieldInput = e.target.value
    //     const key = e.target.name
    //     setInput({ ...input, key: fieldInput })
    // }

    // const handleSubmit = e => {
    //     e.preventDefault()
    //     // getResult(location);
    // }

    return (
        <div>
            {console.log(input)}
            <form>
                <div>
                    <input type='text' placeholder='enter name' />
                </div>
                
                <div>
                    <label>Number of questions</label>
                    <QuestionCount input={input} />
                </div>

                <div>
                    <Categories input={input} setInput={setInput} />
                </div>

                <div>
                    <label>Difficulty</label>
                    <select name='difficulty'>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <div>
                    <button>Create Game</button>
                </div>

                



            </form>
        </div>
    )
}
