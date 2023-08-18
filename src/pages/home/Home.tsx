import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <div className='full-screen center'>
        <Link to='/login'>
          <button className='btn btn-primary'>Login</button>
        </Link>
      </div>
    </>
  );
}

export default Home;
