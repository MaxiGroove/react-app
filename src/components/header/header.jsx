import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';
import { AppRoute } from "../../const";
import './header.scss'

const Header = () => {
  const { id } = useParams()

  const logout = () => {
    localStorage.clear();
    window.location.href = AppRoute.MAIN;
  }

  const location = useLocation();

  return (
    <section className="main__header">
      <header className="header-wrap">
        <div className="header-logo">
          <img src="./images/logo.png" alt="Final Task" className="header-logo-img" />
        </div>
        <div className={`header-group-link ${location.pathname === AppRoute.MAIN && `link-disabled`}`}>
          <Link to={AppRoute.TASKLIST}
            className={`header-lnk ${location.pathname === AppRoute.USERLIST ? '' :
              location.pathname === `/user/${id}` ? '' : 'header-lnk-active'}`}>Задачи</Link>

          <Link to={AppRoute.USERLIST}
            className={`header-lnk ${location.pathname === AppRoute.USERLIST ? 'header-lnk-active' :
              location.pathname === `/user/${id}` ? 'header-lnk-active' : ''}`}>Сотрудники</Link>
        </div>
        <div className={`header-profile ${location.pathname === AppRoute.MAIN && `link-disabled`}`}>
          <span className="header-profile-name">{localStorage.getItem('username')}</span>

          <div className='header-profile-photo'>
            <img src={localStorage.getItem('photoUrl')} alt="UserAvatar" className="header-profile-avatar" />
          </div>

          <div className="header-profile-menu">
            <Link to={`/user/${localStorage.getItem('id')}`}className="header-profile-view">Посмотреть профиль</Link>
            <button onClick={logout} className="header-profile-logout">Выйти из системы</button>
          </div>
        </div>
      </header>
    </section>
  );
};

export default Header;