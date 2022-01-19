import React from 'react';
import '../../Styles/homepage/homepage.css'
import { parrot } from '../../Styles/manyparrots';

export default function Homepage() {
    return (
        <div className='homepage'>
            <div id='home-title'>
                <table>
                    <tbody>
                        <tr>
                            <td><img src={parrot} alt='Party Parrot' /></td>
                            <td>
                                <img src={parrot} alt='Party Parrot'/>
                                <img src={parrot} alt='Party Parrot'/>
                                <img src={parrot} alt='Party Parrot'/>
                                <img src={parrot} alt='Party Parrot'/>
                                <img src={parrot} alt='Party Parrot'/>
                                <img src={parrot} alt='Party Parrot'/>
                            </td>
                            <td><img src={parrot} alt='Party Parrot'/></td>
                        </tr>
                        <tr>
                            <td><img src={parrot} alt='Party Parrot'/></td>
                            <td><h1>Party Parrot Quiz</h1></td>
                            <td><img src={parrot} alt='Party Parrot'/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id='create-btn'>
                <a href='/create' className='create-game-btn'><button>Create Game</button></a>
            </div>

            <div id='join-btn'>
                <a href='/join'><button>Join Game</button></a> 
            </div>
            <div id='leader-btn'>
                <a href='/leaderboards'><button>Leaderboards</button></a>
            </div>

            <h2>"Do you have what it takes to answer the parrots questions?!"</h2>
            <h2 id='caution'>Proceed with Caution</h2>
            <table>
                <tr>
                    <img src={parrot} alt='Party Parrot'/>
                    <img src={parrot} alt='Party Parrot'/>
                    <img src={parrot} alt='Party Parrot'/>
                    <img src={parrot} alt='Party Parrot'/>
                    <img src={parrot} alt='Party Parrot'/>
                    <img src={parrot} alt='Party Parrot'/>
                    <img src={parrot} alt='Party Parrot'/>

                </tr>
            </table>
        </div>
    )
}

