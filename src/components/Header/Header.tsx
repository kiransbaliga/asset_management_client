import './Header.css';

function Header() {
  return (
    <>
      <div className='row header'>
        <div className='header-logo'>
          <img src='/assets/img/kv-logo.png' alt='KeyValue Logo' />
        </div>
        <div className='header-navbar'></div>
      </div>
    </>
  );
}

export default Header;
