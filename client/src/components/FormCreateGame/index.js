import React, { useState } from 'react'
import { Categories, QuestionCount } from '..'



export default function FormCreateGame() {
    const [ input, setInput ] = useState({ name: "", questions: 0, topic: "", difficulty: "" })


    
    const updateInput = e => {
        const fieldInput = e.target.value
        const key = e.target.name
        setInput({ ...input, key: fieldInput })
    }

    const handleSubmit = e => {
        e.preventDefault()
        // getResult(location);
    }

    return (
        <div>
            <form>
                <div>
                    <input type='text' placeholder='enter name' />

                </div>
                
                <div>
                    <label>Number of questions</label>
                    <QuestionCount />
                </div>

                <div>
                    <Categories setInput={setInput} />
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
