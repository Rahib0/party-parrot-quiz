import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../../Styles/backButton/backbutton.css';

export default function Back() {
    let navigate = useNavigate();
    
    
    return (
        <button className='bk-btn' onClick={() => navigate(-1)}>Back</button>
    )
}
