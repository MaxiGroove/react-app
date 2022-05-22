import { action } from 'mobx';
import { Link } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { AppRoute } from '../../const';
import { tasks } from '../../store';
import './task-header.scss'

const TaskHeader = ({ events, setActive, currentTask, handleSubmit, deleteTask }) => {

  const { id } = useParams();

  const location = useLocation();
  const status = tasks.currentTask.status;

  const changeStatus = action((e) => {
    e.preventDefault();
    tasks.changeStatus(id, e.target.value).then(() => window.location.reload());

  })

  return (

    <div className="task-header">

      {location.pathname === AppRoute.TASKLIST ?
        <div className="task-header-wrap">
          <div className="task-header-left">
            <div className="task-header-title">Задачи</div>
          </div>
          <div className="task-header-right">
            <Link to={AppRoute.TASKADD} className="primary">Добавить задачу</Link>
          </div>
        </div> :

        location.pathname === `/task/${id}` ?
          <div className="task-header-wrap">
            <div className="task-header-left">
              <div className="task-header-title">{currentTask.title}</div>
              <div className={`status status-${currentTask.status}`}>{currentTask.status === 'opened' ? "Открыто" : currentTask.status === 'inProgress' ? "В работе" : currentTask.status === 'testing' ? "Тестирование" : "Сделано"}</div>
            </div>
            <div className="task-header-right">

              {status === 'opened' && <button className="btn-header default" onClick={changeStatus} value={'inProgress'}>Взять в работу</button>}

              {status === 'inProgress' && <button className="btn-header default" onClick={changeStatus} value={'testing'}>На тестрование</button>}

              {(status === 'inProgress' || status === 'testing' || status === 'complete') && <button className="btn-header default" onClick={changeStatus} value={'opened'}>Переоткрыть</button>}

              {(status === 'opened' || status === 'inProgress' || status === 'testing') && <button className="btn-header default" onClick={changeStatus} value={'complete'}>Сделано</button>}

              <Link to={`/task-edit/${id}`} className="btn-header primary">Редактировать</Link>
              <button className="btn-header error" onClick={deleteTask}>Удалить</button>
            </div>
          </div> :

          location.pathname === AppRoute.TASKADD ?
            <div className="task-header-wrap">
              <div className="task-header-left">
                <div className="task-header-title">Создание</div>
              </div>
              <div className="task-header-right">
                <button className="btn-header primary" onClick={handleSubmit}>Сохранить</button>
                <button className="btn-header default">Отмена</button>
              </div>
            </div> :

            location.pathname === `/task-edit/${id}` ?
              <div className="task-header-wrap">
                <div className="task-header-left">
                  <div className="task-header-title">Создание</div>
                </div>
                <div className="task-header-right">
                  <button className="btn-header primary" onClick={handleSubmit}>Сохранить</button>
                  <button className="btn-header default">Отмена</button>
                </div>
              </div> :

              location.pathname === AppRoute.USERLIST ?
                <div className="task-header-wrap">
                  <div className="task-header-left">
                    <div className="task-header-title">Пользователи</div>
                  </div>
                  <div className="task-header-right">
                  </div>
                </div> :

                location.pathname === `/user/${id}` ?
                  <div className="task-header-wrap">
                    <div className="task-header-left">
                      <div className="task-header-title">{events}</div>
                    </div>
                    <div className="task-header-right">
                      <div className="btn-header-taskedit">
                        <Link to={{ pathname: '/task-edit', propsId: id, }} className="btn-header default">Добавить задачу</Link>
                        {location.pathname === `/user/${localStorage.getItem('id')}` && <button className="btn-header primary" onClick={() => setActive(true)}>Редактировать</button>}
                      </div>
                    </div>
                  </div> : null
      }
    </div>
  );
};

export default TaskHeader;