import { useSelector } from 'react-redux';
import './Header.css';
import Dropdown from '../dropdown';
import Icon from '../icon';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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
                <Icon icon={faUser} />
              </div>
            }
            style={{ right: '0' }}
          >
            <div className='flex-row user-content custom'>
              <div className='name'>{user.name}</div>
              <div className='chip chip-sm chip-primary'>{user.role}</div>
            </div>
            <div className='text-muted'>@{user.username}</div>
          </Dropdown>
        </div>
      </div>
    </>
  );
}

export default Header;
