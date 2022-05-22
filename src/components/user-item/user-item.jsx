import { Link } from 'react-router-dom';
import './user-item.scss'

const UserItem = ({event}) => {

    const deleteUserHandle = evt => {
        evt.preventDefault();
        event.deleteEvent(event.id)
    }

    return (
        <Link to={`/user/${event.id}`} className="user-item">
            <div className="user-name">{event.username}</div>
            <div onClick={deleteUserHandle} className='user-delete'>Удалить</div>
        </Link>
    );
};

export default UserItem;