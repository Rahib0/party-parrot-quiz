// import React, {useState} from 'react';
// import {useRanger} from 'react-ranger';

// export default function SliderCount() {
//     const [values, setValues] = useState([25]);

//     const { getTrackProps, ticks, handles } = useRanger({
//       values, onChange: setValues, 
//       min: 1,
//       max: 50,
//       stepSize: 1,
//       ticks: [1, 25, 50],
//       onDrag: setValues
//     });
  

//     return (
//         <div>
//             <div
//                 {...getTrackProps({
//                     style: {
//                         height: '4px',
//                         background: '#ddd',
//                         boxShadow: 'inset 0 1px 2px rgba(0,0,0,.6)',
//                         borderRadius: '2px',
//                 },
//                 })}
//             >
//                 {ticks.map(({ value, getTickProps }) => (
//                     <div {...getTickProps()}>{value}</div>
//                 ))}
//                 {handles.map(({ value, active, getHandleProps }) => (
//             <button
//                 {...getHandleProps({
//                     style: {
//                     width: '12px',
//                     height: '12px',
//                     borderRadius: '100%',
//                     background: 'linear-gradient(to bottom, #eee 45%, #ddd 55%)',
//                     border: 'solid 1px #888',
//                 },
//                 })}
//             >
//                 <handle active={active}>{value}</handle>
//             </button>
            
//             ))}
            
//             <br></br>
//             {values}
//             </div>

//         </div>
//     )
// }
