import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { tasks, users } from '../../store';
import Header from '../../components/header/header';
import TaskHeader from '../../components/task-header/task-header';
import './task-edit.scss';

const TaskEdit = observer(() => {
  const { id } = useParams();
  const [userList, setUserList] = useState({});
  const {propsId} = useLocation();

  useEffect(() => {
    users.getUsers().then(() => setUserList(users.allUsers))
  });

  console.log(propsId)
  
  const [form, setForm] = useState({
    userId: localStorage.getItem('id'),
    assignedId: '',
    title: '',
    description: '',
    type: '',
    status: 'opened',
    rank: '',
  });
  
  if(propsId) {
    form.assignedId = propsId;
  }

  const handleFieldChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (id) {
      e.preventDefault();
      console.log(form);
      tasks.editTask(form).then(() => window.location.href = `/task/${id}`);
    } else {
      e.preventDefault();
      console.log(form);
      tasks.addTask(form).then(() => window.location.href = `/task-list`);
    }
  }

  useEffect(() => {
    if (id) {
      tasks.getTask(id).then(() => setForm({ ...tasks.currentTask }))
    }
  }, [id])

  return (
    <React.Fragment>
      <Header />
      <section className='main-wrapper'>
        <section className="main-task">
          <div className="task">
            <div className="task-wrapper">
              <TaskHeader handleSubmit={handleSubmit} />
              <div className="task-container">
                <form className='form-taskedit' onSubmit={handleSubmit}>
                  <div className="taskedit">
                    <div className="taskedit-column">
                      <div className="taskedit-status">

                        {/* <div className="taskedit-status-item">
                          <Dropdown listValue={userList} nameOfFilter={'assignedId'} filterForm={form} setFilterForm={setForm} />
                        </div>
                        <div className="taskedit-status-item">
                          <Dropdown listValue={['task', 'bug']} nameOfFilter={'type'} filterForm={form} setFilterForm={setForm} />
                        </div>
                        <div className="taskedit-status-item">
                          <Dropdown listValue={['low', 'medium', 'high']} nameOfFilter={'rank'} filterForm={form} setFilterForm={setForm} />
                        </div> */}

                        <div className="taskedit-status-item">
                          <label className="taskedit-label">Исполнитель</label>
                          <select className="taskedit-input input-primary" name="assignedId" onChange={handleFieldChange}>
                            <option hidden selected>Исполнитель</option>
                            {Object.keys(userList).map(item => <option selected={item === form.assignedId} value={item} key={item} > {userList[item]}  </option>)}
                          </select>
                        </div>

                        <div className="taskedit-status-item">
                          <label className="taskedit-label">Тип запроса</label>
                          <select className="taskedit-input input-primary" name="type" onChange={handleFieldChange}>
                            <option hidden selected>Тип</option>
                            <option selected={form.type === 'task'} value={'task'} > Задача</option>
                            <option selected={form.type === 'bug'} value={'bug'} > Ошибка</option>
                          </select>
                        </div>

                        <div className="taskedit-status-item">
                          <label  className="taskedit-label">Приоритет</label>
                          <select className="taskedit-input input-primary" name="rank" onChange={handleFieldChange}>
                            <option hidden selected>Приоритет</option>
                            <option selected={form.rank === 'low'} value={'low'}> Низкий</option>
                            <option selected={form.rank === 'medium'} value={'medium'}> Средний</option>
                            <option selected={form.rank === 'high'} value={'high'}> Высокий</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="taskedit-column">
                      <div className="taskedit-info">
                        <div className="taskedit-info-item">
                          <label className="taskedit-label">Название</label>
                          <input type="text" className="taskedit-input input-primary" name='title' onChange={handleFieldChange} defaultValue={form.title} />
                        </div>
                        <div className="taskedit-info-item">
                          <label className="taskedit-label">Описание</label>
                          <textarea type='text' className="taskedit-textarea textarea textarea-primary" name='description' onChange={handleFieldChange} value={form.description}></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </section>
    </React.Fragment >
  );
});

export default TaskEdit;