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
                            <td><img src={parrot} /></td>
                            <td>
                                <img src={parrot} />
                                <img src={parrot} />
                                <img src={parrot} />
                                <img src={parrot} />
                                <img src={parrot} />
                                <img src={parrot} />
                            </td>
                            <td><img src={parrot} /></td>
                        </tr>
                        <tr>
                            <td><img src={parrot} /></td>
                            <td><h1>Party Parrot Quiz</h1></td>
                            <td><img src={parrot} /></td>
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
            <table>
                <tr>
                    <img src={parrot} />
                    <img src={parrot} />
                    <img src={parrot} />
                    <img src={parrot} />
                    <img src={parrot} />
                    <img src={parrot} />
                    <img src={parrot} />
                    
                </tr>
            </table>
        </div>
    )
}

