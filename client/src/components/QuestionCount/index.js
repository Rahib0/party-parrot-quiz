import React, { useEffect, useState } from 'react'
import axios from 'axios'
//import {useRanger} from 'react-ranger';
//import styled, { createGlobalStyle } from 'styled-components';
import '../../Styles/createGame/compQuestionCount/compquestion.css'



export default function QuestionCount({ input, setInput }) {
    const [ count, setCount ] = useState(10);
    const [ maxCount, setMaxCount ] = useState(50)

    
    useEffect(() => {
        if(input.topic > 0){
            axios.get(`https://opentdb.com/api_count.php?category=${input.topic}`)
            .then(res => {
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
            if (hold > 50) {
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
        setInput({ ...input, questions: count })
    }, [count])


    useEffect(() => {
        if ( count > maxCount ) { setCount(maxCount) }
    }, [ maxCount ])

    function handleOnChange (e) {
        // if (e.target.value < 0) {
        //     setCount(1)
        // } else {
        //     setCount(e.target.value)
        // }
        console.log(e.target.value)
        if(e.target.value > maxCount){
            alert('There is not enough questions in this category. Please reduce the number of questions or select a different category!')
        } else {
        setInput({ ...input, questions: count })}
    }







    return (
        <div>


<div className='q-div-border'><p></p></div>

            <label className='q-label'>No. of Questions:</label>
            <input className='q-input' type='number' id='amount' value={count} onChange={handleOnChange}  min='1' max={maxCount} />
            
            <br></br>
            <p className='q-p'>The maximum number of questions is: {maxCount}</p> 
            <div className='q-div-border'><p></p></div>
        </div>
    )
}


