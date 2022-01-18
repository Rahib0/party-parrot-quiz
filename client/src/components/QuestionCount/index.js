import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SliderCount } from '..';
import {useRanger} from 'react-ranger';
import styled, { createGlobalStyle } from 'styled-components';



export default function QuestionCount({ input, setInput }) {
    const [ count, setCount ] = useState(10);
    const [ maxCount, setMaxCount ] = useState(50)
    // slider state
    const [values, setValues] = useState([25]);

    // for slider
    const [halfCount, setHalfCount] = useState(25);

    // for slider
    const [prevMaxCount, setPrevMaxCount] = useState(0);

    // slider parameters
    const { getTrackProps, ticks, handles } = useRanger({
        values, onChange: setValues, 
        min: 1,
        max: maxCount,
        stepSize: 1,
        ticks: [1, halfCount, maxCount],
        onDrag: setValues,
      });
      
    useEffect(() => {
        if(maxCount < prevMaxCount){
            const half = Math.floor(maxCount * 0.5);
            setHalfCount(half);
            setValues(half);
        } else{
        const half = Math.floor(maxCount * 0.5);
        setHalfCount(half);}
    }, [maxCount])
    
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
                setPrevMaxCount(maxCount);
                setMaxCount(50)
            } else {
                setPrevMaxCount(maxCount);
                setMaxCount(hold)
            }
        })
            .catch(e => console.warn(e))}
        else {
            setMaxCount(50)
        }
    }, [input.topic, input.difficulty])

    // useEffect(() => {
    //     setInput({ ...input, questions: count })
    // }, [count])

    // useEffect(() => {
    //     setInput({ ...input, questions: values})
    // }, [values])

    // useEffect(() => {
    //     if ( count > maxCount ) { setCount(maxCount) }
    // }, [ maxCount ])

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
            <br></br>
            <br></br>
            <br></br>

            <div
                {...getTrackProps({
                    style: {
                        height: '4px',
                        background: '#ddd',
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,.6)',
                        borderRadius: '2px',
                        width: '400px',
                },
                })}
            >
                {ticks.map(({ value, getTickProps }) => (
                    <div {...getTickProps()}>{value}</div>
                ))}
                {handles.map(({ value, active, getHandleProps }) => (
            <button
                {...getHandleProps({
                    style: {
                    width: '12px',
                    height: '12px',
                    borderRadius: '100%',
                    background: 'linear-gradient(to bottom, #eee 45%, #ddd 55%)',
                    border: 'solid 1px #888',
                },
                })}
            >
                <handle active={active}>{value}</handle>
            </button>
            
            ))}
            
            <br></br>
            {values}
            </div>
            <br></br>
            <br></br>
            <br></br>



            {/* <label>No. of Questions:</label> */}
            {/* <input type='number' id='amount' value={count} onChange={handleOnChange}  min='1' max={maxCount} /> */}
            {/* <br></br>
            <br></br>
            <SliderCount id='slider' values={values} setValues={setValues} onChange={handleOnChange}/>
            <br></br>
            
            <br></br>
            <p>The maximum number of questions is: {maxCount}</p> */}

        </div>
    )
}


