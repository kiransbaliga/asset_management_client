import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { LinkType } from './types';
import { removeToken } from '../../utils/token';
import { classNames } from '../../utils/funcs';
import Dialog from '../Dialog/Dialog';
import { useState } from 'react';
import { useUI } from '../../contexts/UIContexts';
import { TOAST_TIMOUT, TOAST_TYPE } from '../toast/consts';

const links: LinkType[] = [
  { label: 'Employee', icon: '/assets/icons/employees.svg', path: '/employees' },
  { label: 'Asset', icon: '/assets/icons/employees.svg', path: '/assets' },
  { label: 'Request', icon: '/assets/icons/employees.svg', path: '/requests' }
];

function Sidebar() {
  const [dialogState, setDialogState] = useState({ show: false });

  const location = useLocation();
  const navigate = useNavigate();
  const { createToast } = useUI();

  function logout() {
    removeToken();
    navigate('/login');
    createToast(TOAST_TYPE.SUCCESS, 'Logout success', '', TOAST_TIMOUT.SHORT);
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
              className={classNames(
                'item',
                location.pathname.startsWith(link.path) ? 'active' : ''
              )}
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
