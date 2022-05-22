import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { users } from '../../store';
import Header from '../../components/header/header';
import './login.scss'
import '../../components/app/btn.scss'

const Login = observer(() => {
  const { loginUser } = users;
  
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();

  const loginHandler = async (e) => {
      e.preventDefault();
      const data = await loginUser(login, password);
      console.log(data)
      if(data.id) {
        localStorage.setItem('id', data.id);
        localStorage.setItem('username', data.username);
        localStorage.setItem('photoUrl', data.photoUrl);
        localStorage.setItem('password', password)
        window.location.href = '/task-list';
      }
  }

  return (
    <React.Fragment>
      <Header />
      <section className='main__wrapper'>
        <section className="login">
          <form className='login__form'>
            <h2 className='login__title'>Авторизация</h2>

            <div className="login__name">
              <label className='login__label' htmlFor="login">Логин</label>
              <input
                className='input-primary'
                id="login"
                type="text"
                placeholder='Login'
                name='login'
                value={login}
                onChange={e => setLogin(e.target.value)} />
            </div>

            <div className="login__name">
              <label className='login__label' htmlFor="password">Пароль</label>
              <input
                className='input-primary'
                id="password"
                type="password"
                placeholder='Password'
                name='password'
                value={password}
                onChange={e => setPassword(e.target.value)} />
            </div>

            <button className='success btn-login' type='submit' onClick={loginHandler}>Вход</button>
          </form>
        </section>
      </section>
    </React.Fragment>
  )
});

export default Login;