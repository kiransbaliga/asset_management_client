// import { useNavigate } from 'react-router-dom';
// import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

// function Home() {
//   const { rive, RiveComponent } = useRive({
//     src: 'assets/animation2.riv',
//     autoplay: true,
//     stateMachines: 'State Machine 1'
//   });
//   // const navigate = useNavigate();
//   const hover = useStateMachineInput(rive, 'State Machine 1', 'hover?');
//   const onclick = useStateMachineInput(rive, 'State Machine 1', 'clck?');

//   if (rive) console.log(rive.contents);

//   return (
//     <>
//       <RiveComponent
//         onMouseEnter={() => hover.fire()}
//         onMouseLeave={() => onclick.fire()}
//         onClick={() => {
//           onclick.fire();

//           // navigate('employees/login');
//         }}
//       />
//       {/* <Rive src='assets/animation2.riv' className='full-screen'></Rive>
//       <div className='full-screen center'>
//         <Link to='/login'>
//           <button className='btn btn-primary'>Login</button>
//         </Link>
//       </div> */}
//     </>
//   );
// }

// export default Home;

import { useNavigate } from 'react-router-dom';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

function Home() {
  const { rive, RiveComponent } = useRive({
    src: 'assets/cat.riv',
    autoplay: true,
    stateMachines: 'State Machine 1'
  });
  const navigate = useNavigate();
  const hover = useStateMachineInput(rive, 'State Machine 1', 'hover?');
  const onclick = useStateMachineInput(rive, 'State Machine 1', 'clicked?');
  const waveR = useStateMachineInput(rive, 'State Machine 1', 'waveR?');
  const waveL = useStateMachineInput(rive, 'State Machine 1', 'waveL?');

  if (rive) console.log(rive.contents);

  return (
    <>
      <RiveComponent
        onMouseUp={() => waveR.fire}
        onMouseLeave={() => waveL.fire()}
        onMouseEnter={() => hover.fire()}
        onClick={() => {
          onclick.fire();
          setTimeout(() => {
            console.log('hi');
            navigate('/login');
          }, 750);
        }}
      />
      {/* <Rive src='assets/animation2.riv' className='full-screen'></Rive>
      <div className='full-screen center'>
        <Link to='/login'>
          <button className='btn btn-primary'>Login</button>
        </Link>
      </div> */}
    </>
  );
}

export default Home;
