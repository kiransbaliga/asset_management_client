import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { LinkType } from './types';
import { removeToken } from '../../utils/token';
import { classNames } from '../../utils/funcs';
import Dialog from '../Dialog/Dialog';
import { useState } from 'react';
import { useUI } from '../../contexts/UIContexts';
import { TOAST_TIMOUT, TOAST_TYPE } from '../toast/consts';
import { faCubes, faHand, faRightFromBracket, faUsers } from '@fortawesome/free-solid-svg-icons';
import Icon from '../icon';

const links: LinkType[] = [
  { label: 'Employee', icon: faUsers, path: '/employees' },
  { label: 'Asset', icon: faCubes, path: '/assets' },
  { label: 'Request', icon: faHand, path: '/requests' }
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
                <div className='circle'>{link.icon && <Icon icon={link.icon} />}</div>
                <span>{link.label}</span>
              </li>
            </Link>
          ))}
          <div className='item'>
            <li onClick={handleLogout}>
              <div className='circle'>
                <Icon icon={faRightFromBracket} />
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
