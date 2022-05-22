import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { observer } from 'mobx-react-lite';
import { tasks, users } from '../../store';
import Header from '../../components/header/header';
import TaskHeader from '../../components/task-header/task-header';
import Paginator from '../../components/paginator/paginator';
import TaskItem from '../../components/task-item/task-item';
import Modal from '../../components/modal/modal';
import './user.scss'


const User = observer(() => {
  const { id } = useParams();
  const {page, limit, total} = {...tasks.pagination}
  const { getUser, editUser } = users;
  const [modalActive, setModalActive] = useState(false);
  const [userForm, setUserForm] = useState({
    username: '',
    about: '',
    photoUrl: '',
    password: '',
  });

  //   if(limit <= 10) {
  //       tasks.pagination.limit = 100;
  //   }
  const taskList = tasks.filtredData.filter(e => e.assignedId === id);

  const userTask = taskList.length

  const handleUserChange = (evt) => {
    const { name, value } = evt.target;
    setUserForm({ ...userForm, [name]: value })
  }

  const editUserHundler = (evt) => {
    evt.preventDefault();
    editUser({
      id: id,
      ...userForm,
    });
    setModalActive(false);
  }

  useEffect(() => {
    if (id) {
      getUser(id).then(result => setUserForm(result))
    }
  }, [id])

  return (
    <React.Fragment>
      <Header />
      <section className='main-wrapper'>
        <section className="main-task">
          <div className="task">
            <div className="task-wrapper">
              <TaskHeader events={userForm.username} setActive={setModalActive} />
              <div className="task-container">
                <div className="user">
                  <div className="user-column">
                    <div className="user-info">
                      <div className="user-photo">
                        <img src={userForm.photoUrl} alt="" className="user-photo-avatar" />
                      </div>
                      <div className="user-about">
                        <div className="user-about-title">О себе</div>
                        <p className="user-about-text">{userForm.about}</p>
                      </div>
                    </div>
                  </div>
                  <div className="user-column">
                    <div className="user-tasks">
                      <div className="user-tasks-wrap">
                        {taskList.length > 0 ? taskList.map(event => <TaskItem event={event} key={event.id}/>) : <p className='task-notask'>Нет задач</p>}
                      </div>
                      <Paginator page={page} limit={limit} total={userTask} item={tasks}/>
                    </div>
                  </div>

                </div>
                <Modal field={handleUserChange} edit={editUserHundler} active={modalActive} setActive={setModalActive} />     
              </div>
            </div>
          </div>
        </section>
      </section>
    </React.Fragment >
  );
});

export default User;