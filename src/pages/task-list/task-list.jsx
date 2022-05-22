import React, { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import TaskItem from '../../components/task-item/task-item';
import TaskHeader from '../../components/task-header/task-header';
import Paginator from '../../components/paginator/paginator';
import { observer } from 'mobx-react-lite';
import { tasks, users } from '../../store';
import Dropdown from '../../components/dropdown/dropdown';
import { action } from 'mobx';
import './task-list.scss';

const TaskList = observer(() => {
  const taskList = tasks.filtredData;

  const { page, limit, total } = { ...tasks.pagination }

  const [userList, setUserList] = useState({});

  useEffect(() => {
    users.getUsers().then(() => setUserList(users.allUsers))
  });

  const [filterForm, setFilterForm] = useState({
    type: [],
    query: '',
    assignedUsers: [],
    status: [],
    rank: [],
  });

  const handleFieldChange = e => {
    const { name, value } = e.target;
    setFilterForm({ ...filterForm, [name]: value })
  };

  const handleFiltred = action(e => {
    e.preventDefault();
    tasks.getTaskOnFilter(filterForm);
  })

  return (
    <React.Fragment>
      <Header />
      <section className='main__wrapper'>
        <section className="task">
          <div className="task-wrapper">
            <TaskHeader />
            <div className="task-container">
              <div className="task-sort">
                <form className="task-sort-form" onSubmit={handleFiltred}>
                  <div className="sort-item">
                    <Dropdown listValue={['task', 'bug']} nameOfFilter={'type'} filterForm={filterForm} setFilterForm={setFilterForm} />
                  </div>
                  <div className="sort-item">
                    <input
                      type="text"
                      className='task-input input-primary'
                      placeholder='Название задачи'
                      name='query'
                      onChange={handleFieldChange}
                    />
                  </div>
                  <div className="sort-item">
                    <Dropdown listValue={userList} nameOfFilter={'assignedUsers'} filterForm={filterForm} setFilterForm={setFilterForm} />
                  </div>
                  <div className="sort-item">
                    <Dropdown listValue={['opened', 'inProgress', 'testing', 'complete']} nameOfFilter={'status'} filterForm={filterForm} setFilterForm={setFilterForm} />
                  </div>
                  <div className="sort-item">
                    <Dropdown listValue={['low', 'medium', 'high']} nameOfFilter={'rank'} filterForm={filterForm} setFilterForm={setFilterForm} />
                  </div>
                  <button className='primary' type='submit'>Применить</button>
                </form>
              </div>
              <div className="task-main">
                <div className="task-items">
                  {taskList ? taskList.map(event => <TaskItem event={event} key={event.id} userList={userList} />) : <p className='task-notask'>Нет задач</p>}
                </div>
              </div>
              <div className="task-footer">
                <Paginator page={page} limit={limit} total={total} item={tasks} />
              </div>
            </div>
          </div>
        </section>
      </section>
    </React.Fragment>
  );
});

export default TaskList;