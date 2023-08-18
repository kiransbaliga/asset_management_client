import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { LinkType } from './types';
import { removeToken } from '../../utils/token';
import { classNames } from '../../utils/funcs';
import Dialog from '../Dialog/Dialog';
import { useState } from 'react';

const links: LinkType[] = [
  { label: 'Employee List', icon: '/assets/icons/employees.svg', path: '/employees' }
];

function Sidebar() {
  const [dialogState, setDialogState] = useState({ show: false });

  const location = useLocation();
  const navigate = useNavigate();

  function logout() {
    removeToken();
    navigate('/login');
  }

  const handleLogout = () => {
    setDialogState({ show: true });
  };

  return (
    <>
      <Dialog
        state={dialogState}
        setState={setDialogState}
        title='Logout'
        successLabel='Logout'
        onSuccess={logout}
      >
        <p>Do you want to logout?</p>
      </Dialog>
      <div className='sidebar'>
        <ul>
          {links.map((link, i) => (
            <Link
              className={classNames('item', location.pathname === link.path ? 'active' : '')}
              key={i}
              to={link.path}
            >
              <li>
                <div className='circle'>
                  {link.icon && <img src={link.icon} alt={link.label + ' icon'} />}
                </div>
                <span>{link.label}</span>
              </li>
            </Link>
          ))}
          <div className='item'>
            <li onClick={handleLogout}>
              <div className='circle'>
                <img src='/assets/icons/logout.svg' alt={'Logout icon'} />
              </div>
              <span>Logout</span>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
