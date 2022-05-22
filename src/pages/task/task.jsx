import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../../components/header/header';
import Modal from '../../components/modal/modal';
import TaskHeader from '../../components/task-header/task-header';
import { tasks, users } from '../../store';

import './task.scss';

const Task = observer(() => {
  const { id } = useParams();
  const { getTask, addComment, deleteComment, addWorkTime } = tasks;
  const { getUser, getUsers, allUsers } = users;
  const [modalActive, setModalActive] = useState(false);
  const [currentTask, setCurrentTask] = useState({ ...tasks.currentTask });
  const [currentUser, setCurrentUser] = useState({ ...users.currentUser });
  const [comment, setComment] = useState();
  const taskComments = [...tasks.currentComment];

  if (!currentTask.id) {
    getTask(id).then(() => setCurrentTask({ ...tasks.currentTask }))
  }
  const [userId, setUserId] = useState({});
  const [assignedId, setAssignedId] = useState({});

  useEffect(() => {
    if (currentTask.assignedId) {
      getUser(currentTask.userId).then(result => setUserId(result))
      getUser(currentTask.assignedId).then(result => setAssignedId(result))
    }
  }, [currentTask.assignedId])

  useEffect(() => {
    getUsers().then(() => setCurrentUser(allUsers));
  })

  const deleteTask = e => {
    e.preventDefault();
    tasks.deleteTask(id).then(() => window.location.href = `/task-list`);
  }

  const handleComment = e => {
    e.preventDefault();
    setComment(e.target.value)
  }

  const addNewComment = e => {
    e.preventDefault();
    addComment({
      taskId: currentTask.id,
      userId: localStorage.getItem('id'),
      text: comment,
    }).then(() => getTask(id));
    e.target.reset();
  }

  const deleteYourComment = e => {
    e.preventDefault();
    deleteComment(e.target.value).then(() => getTask(id));
  }

  const [timeForm, setTimeForm] = useState({
    timeInMinutes: 0,
    timeType: 1,
    comment: '',
    currentUser: localStorage.getItem('id'),
  })

  const handleTimeChange = e => {
    const { name, value } = e.target;
    setTimeForm({ ...timeForm, [name]: value })
  }

  const editWorkTime = e => {
    e.preventDefault();
    addWorkTime(id, {
      timeInMinutes: timeForm.timeInMinutes * timeForm.timeType,
      comment: timeForm.comment,
      currentUser: localStorage.getItem('id'),
    }).then(() => getTask(id));
    setModalActive(false);
  }

  const currentTime = tasks.currentTask.timeInMinutes;

  const { spentMinutes, spentHours, spentDays } = {
    spentMinutes: Math.floor(currentTime % 60),
    spentHours: Math.floor((currentTime % 1440) / 60),
    spentDays: Math.floor(currentTime / 1440),
  }

  return (
    <React.Fragment>
      <Header />
      <section className='main-wrapper'>
        <section className="main-task">
          <div className="task">
            <div className="task-wrapper">
              <TaskHeader currentTask={currentTask} deleteTask={deleteTask} />
              <div className="task-container">
                <div className="card">
                  <div className="card-column">
                    <div className="card-info">
                      <div className="card-info-user">
                        <div className="card-user">
                          <div className="card-user-title">Исполнитель</div>
                          <div className="card-user-name">{assignedId.username ? assignedId.username : 'Исполнитель не назначен'}</div>
                        </div>
                        <div className="card-user">
                          <div className="card-user-title">Автор задачи</div>
                          <div className="card-user-name">{userId.username}</div>
                        </div>
                        <div className="card-user">
                          <div className="card-user-title">Приоритет</div>
                          <div className="card-user-name">{currentTask.rank === 'low' ? "Низкий" : currentTask.rank === 'medium' ? "Средний" : "Высокий"}</div>
                        </div>
                        <div className="card-user">
                          <div className="card-user-title">Дата создания</div>
                          <div className="card-user-name">{moment(currentTask.dateOfCreation).format('DD.MM.YYYY HH:mm')}</div>
                        </div>
                        <div className="card-user">
                          <div className="card-user-title">Дата изменения</div>
                          <div className="card-user-name">{moment(currentTask.dateOfUpdate).format('DD.MM.YYYY HH:mm')}</div>
                        </div>
                        <div className="card-user">
                          <div className="card-user-title">Затрачено времени</div>
                          <div className="card-user-name">
                            <span>
                              {spentDays}{spentDays === 1 ? ' день' : (spentDays > 1 && spentDays < 5) ? ' дня' : (spentDays === 0 || spentDays >= 5) ? ' дней' : ''}
                            </span>
                            <span>
                              {` ${spentHours}`}{spentHours === 1 ? ' час' : (spentHours > 1 && spentHours < 5) ? ' часа' : (spentHours === 0 || spentHours >= 5) ? ' часов' : ''}
                            </span>
                            <span>
                              {` ${spentMinutes}`}{spentMinutes === 1 ? ' минута' : (spentMinutes > 1 && spentMinutes < 5) ? ' минуты' : (spentMinutes === 0 || spentMinutes >= 5) ? ' минут' : ''}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => setModalActive(true)} className="primary">Сделать запись о работе</button>
                    </div>
                  </div>
                  <div className="card-column">
                    <div className="card-description">
                      <div className="card-description-title">Описание</div>
                      <p className="card-description-text">{currentTask.description}</p>
                    </div>
                  </div>
                  <div className="card-column">

                    <div className="card-comments">
                      <form className="card-form" onSubmit={addNewComment}>
                        <fieldset className='card-field'>
                          <label htmlFor="comment" className='card-label'>{`Комментарии (${taskComments.length})`}</label>
                          <textarea
                            type='text'
                            placeholder='Текст комментария'
                            name="comment"
                            className="textarea textarea-primary card-textarea"
                            onChange={handleComment}
                            required
                          />
                        </fieldset>
                        <button className="success">Добавить комментарий</button>

                        <div className="card-comment">

                          {
                            taskComments.length === 0 ?
                              <div className='card-nocomment'>Комментарии отсутствуют</div> :
                              taskComments.map(item => (
                                <div className="card-comment-item" key={item.id}>
                                  <div className="card-comment-header">
                                    <div className="card-comment-name">{currentUser[item.userId]} ({moment(item.dateOfCreation).format('DD.MM.YYYY H:mm')})</div>
                                    {
                                      item.userId === localStorage.getItem('id') && <button className="card-comment-delete" onClick={deleteYourComment} value={item.id}>Удалить</button>
                                    }
                                  </div>
                                  <div className="card-comment-text">{item.text}</div>
                                </div>
                              ))
                          }

                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <Modal active={modalActive} setActive={setModalActive} timeForm={handleTimeChange} editTime={editWorkTime} />
              </div>
            </div>
          </div>
        </section>
      </section>
    </React.Fragment>
  );
});

export default Task;
