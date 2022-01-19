import React from 'react';
import '../../Styles/homepage/homepage.css'
import { parrot } from '../../Styles/manyparrots';

export default function Homepage() {
    return (
        <div className='homepage'>
            <div id='home-title'>
                <table id='parrot-title-table'>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <img className='parrot' src={parrot} alt='Party Parrot'/>
                                <img className='parrot' src={parrot} alt='Party Parrot'/>
                                <img className='parrot' src={parrot} alt='Party Parrot'/>
                                <img className='parrot' src={parrot} alt='Party Parrot'/>
                                <img className='parrot' src={parrot} alt='Party Parrot'/>
                                <img className='parrot' src={parrot} alt='Party Parrot'/>
                                <img className='parrot' src={parrot} alt='Party Parrot'/>
                                <img className='parrot' src={parrot} alt='Party Parrot'/>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><h1 className='title'>Party Parrot Quiz</h1></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <table>
                    <tbody>
                        <td><img className='parrot-btn' src={parrot} alt='Party Parrot'/></td>
                        <td>
                            <tr>
                                <div id='create-btn'>
                                    <a href='/create' className='create-game-btn'><button>Create Game</button></a>
                                </div>
                            </tr>
                            <tr>
                                <div id='join-btn'>
                                    <a href='/join'><button>Join Game</button></a> 
                                </div>
                            </tr>
                            <tr>
                                <div id='leader-btn'>
                                    <a href='/leaderboards'><button>Leaderboards</button></a>
                                </div>
                            </tr>
                        </td>
                        <td><img className='parrot-btn' src={parrot} alt='Party Parrot'/></td>
                    </tbody>
                </table>
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

            <img className='phone' src={parrot}/>
        </div>
    )
}

