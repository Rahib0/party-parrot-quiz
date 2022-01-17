import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function QuestionCount({ input, setInput }) {
    const [ count, setCount ] = useState(10);
    const [ maxCount, setMaxCount ] = useState(50)

    
    useEffect(() => {
        if(input.topic > 0){
            axios.get(`https://opentdb.com/api_count.php?category=${input.topic}`)
            .then(res => {
                console.log(res.data)
                let hold
                switch (input.difficulty) {
                    case "easy":
                        // setMaxCount(res.data.category_question_count.total_easy_question_count)
                        hold = res.data.category_question_count.total_easy_question_count
                        break;
                    case "medium":
                        // setMaxCount(res.data.category_question_count.total_medium_question_count)
                        hold = res.data.category_question_count.total_medium_question_count
                        break;
                    case "hard":
                        // setMaxCount(res.data.category_question_count.total_hard_question_count)
                        hold = res.data.category_question_count.total_hard_question_count
                        break;
                    default:
                        hold = 50
            }
            console.log('here')
            console.log(hold)
            console.log(maxCount)
            if (hold > 50) {
                console.log("I am being run") 
                setMaxCount(50)
            } else {
                setMaxCount(hold)
            }
        })
            .catch(e => console.warn(e))}
        else {
            setMaxCount(50)
        }
    }, [input.topic, input.difficulty])

    useEffect(() => {
        console.log(count)
        setInput({ ...input, questions: count })
    }, [count])

    useEffect(() => {
        if ( count > maxCount ) { setCount(maxCount) }
    }, [ maxCount ])

    function handleOnChange (e) {
        console.log(e.target.value)
        setCount(e.target.value)
        console.log(count)
        setInput({ ...input, questions: count })
    }




    return (
        <div>
            {console.log("current question count: ", count)}
            <label>No. of Questions:</label>
            <input type='number' id='amount' value={count} onChange={handleOnChange}  min='1' max={maxCount}/>
            <p>The maximum number of questions is: {maxCount}</p>

        </div>
    )
}


