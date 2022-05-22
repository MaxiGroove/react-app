import React from 'react';
import { observer } from 'mobx-react-lite';
import { users } from '../../store';
import Header from '../../components/header/header';
import Paginator from '../../components/paginator/paginator';
import TaskHeader from '../../components/task-header/task-header';
import UserItem from '../../components/user-item/user-item';
import './user-list.scss'

const UserList = observer(() => {
  const usersList = [...users.data];
  const {page, limit, total} = {...users.pagination}
  
  return (
    <React.Fragment>
      <Header />
      <section className='main-wrapper'>
        <section className="main-task">
          <div className="task">
            <div className="task-wrapper">
              <TaskHeader />
              <div className="task-container">
                <div className="users">
                  <div className="users-list">
                    {usersList.map(event => <UserItem event={event} key={event.id} />)}
                  </div>
                </div>
                <Paginator page={page} limit={limit} total={total} item={users}/>
              </div>
            </div>
          </div>
        </section>
      </section>
    </React.Fragment >
  );
});

export default UserList;