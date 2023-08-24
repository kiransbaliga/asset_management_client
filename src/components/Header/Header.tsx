import { useSelector } from 'react-redux';
import './Header.css';
import Dropdown from '../dropdown';

function Header() {
  const user = useSelector((state: any) => state.auth.user);

  return (
    <>
      <div className='flex-row header'>
        <div className='header-logo'>
          <img src='/assets/img/kv-logo.png' alt='KeyValue Logo' />
        </div>
        <div className='header-navbar'>
          <div className='name'>{user.name}</div>
          <Dropdown
            className='user-dropdown'
            toggler={
              <div className='circle center'>
                <img src='/assets/icons/user.svg' alt='User icon' />
              </div>
            }
            style={{ right: '0' }}
          >
            <div className='name'>{user.name}</div>
            <div className='flex-row user-content custom'>
              <div className='text-muted'>@{user.username}</div>
              <div className='chip chip-sm chip-primary'>{user.role}</div>
            </div>
          </Dropdown>
        </div>
      </div>
    </>
  );
}

export default Header;
