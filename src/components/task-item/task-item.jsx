import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { AppRoute } from '../../const';
import { tasks } from '../../store';
import './task-item.scss'

const TaskItem = ({ event, userList }) => {
  const { id, assignedId, title, type, status, rank } = event;

  const location = useLocation();

  const deleteTask = e => {
    e.preventDefault();
    tasks.deleteTask(id).then(() => window.location.reload());
  }

  const changeStatus = e => {
    e.preventDefault();
    tasks.changeStatus(id, e.target.value);
  }

  return (
    <div className='item'>

      <div className="item-type">
        <div className={`type type-${type}`}></div>
      </div>

      <Link to={`/task/${id}`} className="item-name">
        <div className="item-name-text">{title}</div>
      </Link>

      {location.pathname === AppRoute.TASKLIST &&
        <div className="item-user">
          <div className="item-user-text">{userList[assignedId] ? userList[assignedId] : 'Исполнитель не назначен'}</div>
        </div>
      }

      <div className="item-status">
        <div className={`status status-${status}`}>{status === 'opened' ? "Открыто" : status === 'inProgress' ? "В работе" : status === 'testing' ? "Тестирование" : "Сделано"}</div>
      </div>
      <div className="item-priority">
        <div className={`priority priority-${rank}`}>{rank === 'low' ? "низкий" : rank === 'medium' ? "средний" : "высокий"}</div>
      </div>

      {location.pathname === AppRoute.TASKLIST &&
        <div className="item-more">
          <div className="more">
            <div className="more-inner">
              <div className="more-control">
                <Link to={`/task-edit/${id}`} className="more-link">Редактировать</Link>
                <button onClick={deleteTask} className="more-link more-delete">Удалить</button>

                {status === 'opened' && <button className="more-link" onClick={changeStatus} value={'inProgress'}>Взять в работу</button>}

                {status === 'inProgress' && <button className="more-link" onClick={changeStatus} value={'testing'}>На тестрование</button>}

                {(status === 'inProgress' || status === 'testing' || status === 'complete') && <button className="more-link" onClick={changeStatus} value={'opened'}>Переоткрыть</button>}

                {(status === 'opened' || status === 'inProgress' || status === 'testing') && <button className="more-link" onClick={changeStatus} value={'complete'}>Сделано</button>}

              </div>
            </div>
          </div>
        </div>
      }

    </div>
  )
};

export default TaskItem;