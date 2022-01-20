import React from 'react';
import '../../Styles/homepage/homepage.css'
import { p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24, p25, p26, p27, p28, p29, p30 } from '../../Styles/manyparrots';

export default function Homepage() {
    return (
        <div className='homepage'>
            <div id='home-title'>
                <table id='parrot-title-table'>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <img className='parrot' src={p4} alt='Party Parrot'/>
                                <img className='parrot' src={p5} alt='Party Parrot'/>
                                <img className='parrot' src={p6} alt='Party Parrot'/>
                                <img className='parrot' src={p7} alt='Party Parrot'/>
                                <img className='parrot' src={p8} alt='Party Parrot'/>
                                <img className='parrot' src={p9} alt='Party Parrot'/>
                                <img className='parrot' src={p10} alt='Party Parrot'/>
                                <img className='parrot' src={p11} alt='Party Parrot'/>
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
                        <td><img className='parrot-btn' src={p12} alt='Party Parrot'/></td>
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
                        <td><img className='parrot-btn' src={p13} alt='Party Parrot'/></td>
                    </tbody>
                </table>
            </div>




            <h2>"Do you have what it takes to answer the parrots questions?!"</h2>
            <h2 id='caution'>Proceed with Caution</h2>
            <table>
                <tr>
                    <img src={p14} alt='Party Parrot'/>
                    <img src={p15} alt='Party Parrot'/>
                    <img src={p16} alt='Party Parrot'/>
                    <img src={p17} alt='Party Parrot'/>
                    <img src={p18} alt='Party Parrot'/>
                    <img src={p19} alt='Party Parrot'/>
                    <img src={p20} alt='Party Parrot'/>

                </tr>
            </table>

            <img className='phone' src={p21}/>
        </div>
    )
}

