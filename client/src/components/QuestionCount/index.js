import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function QuestionCount({ input }) {
    // const [ count, setCount ] = useState();
    // console.log(input)
    // console.log(count)
    
    // useEffect(() => {
    //     if(input.topic !== 0){
    //         console.log(input.topic)
    //         axios.get(`https://opentdb.com/api_count.php?category=${input.topic}`)
    //         .then(res => {
    //             console.log(res.data, "Also here")
    //             switch (input.difficulty) {
    //                 case "easy":
    //                     setCount(res.data.category_question_count.total_easy_question_count)
    //                     break;
    //                 case "medium":
    //                     setCount(res.data.category_question_count.total_medium_question_count)
    //                     break;
    //                 case "hard":
    //                     setCount(res.data.category_question_count.total_hard_question_count)
    //                     break;
    //         }
    //         if (count > 50) { 
    //             setCount(50)
    //             console.log("here")
    //         }})
    //         .catch(e => console.warn(e))}
    //     else {
    //         setCount(50)
    //         console.log('here')
    //     }
    // }, [])



    // return (
    //     <div>
    //         {/* {console.log(count)} */}
    //         <label>No. of Questions:</label>
    //         <input type='number' id='amount' min='1' max={count} placeholder='50 max' />
    //     </div>
    // )

    return (
        <>
        </>
    )
    
}


