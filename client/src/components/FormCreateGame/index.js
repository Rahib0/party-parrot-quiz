import React, { useState } from 'react'
import { Categories, QuestionCount } from '..'



export default function FormCreateGame() {
    const [ input, setInput ] = useState({ name: "", questions: 1, topic: 0, difficulty: "easy" })



    return (
        <div>
            {console.log("input is: ", input)}
            <form>
                <div>
                    <input type='text' onChange={(e) => {setInput({ ...input, name: e.target.value })}} placeholder='enter name' />
                </div>
                
                <div>
                    <QuestionCount input={input} setInput={setInput}/>
                </div>

                <div>
                    <Categories input={input} setInput={setInput} />
                </div>

                <div>
                    <label>Difficulty</label>
                    <select name='difficulty' onChange={(e) => {setInput({ ...input, difficulty: e.target.value })}}>
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
