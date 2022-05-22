import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './modal.scss';

const Modal = ({ field, edit, active, setActive, timeForm, editTime }) => {
  const { id } = useParams();
  const location = useLocation();

  return (
    <div className={active ? 'modal-active' : 'modal'} onClick={() => setActive(false)}>
      <div className="modal-wrapper">
        <div className="modal-info" onClick={e => e.stopPropagation()}>

          {
            location.pathname === `/task/${id}` ?
              <form className="modal-form">

                <div className="modal-title">Запись о работе</div>
                <div className="modal-cmp">

                  <div className="modal-cmp-item">
                    <label className="modal-cmp-title">Затраченное время</label>
                    <input
                      type="text"
                      className="modal-cmp-input input-primary"
                      name='timeInMinutes'
                      onChange={timeForm}
                      required />
                  </div>

                  <div className="modal-cmp-item">
                    <label className="modal-cmp-title">Единица измерения</label>
                    <select className="taskedit-input input-primary" name="timeType" onChange={timeForm} required>
                      <option defaultValue={1}> Минута</option>
                      <option value={60}> Час</option>
                      <option value={1440}> День</option>
                    </select>
                  </div>

                  <div className="modal-cmp-item">
                    <label className="modal-cmp-title">Комментарий</label>
                    <textarea
                      name="comment"
                      className="modal-cmp-textarea textarea textarea-primary"
                      onChange={timeForm}></textarea>
                  </div>
                </div>

                <div className="modal-btn">
                  <button type="submit" className="modal-btn-add primary" onClick={editTime}>Добавить</button>
                  <button onClick={() => setActive(false)} type='reset' className="modal-btn-cancel default">Отмена</button>
                </div>

              </form>

              :

              <form className="modal-form">
                <div className="modal-title">Редактирование пользователя</div>

                <div className="modal-cmp">
                  <div className="modal-cmp-item">
                    <label className="modal-cmp-title">Имя пользователя</label>
                    <input name='username' onChange={field} type="text" className="modal-cmp-input input-primary" />
                  </div>

                  {/* <div className="modal-cmp-item">
                    <label className="modal-cmp-title">Пароль</label>
                    <input name='password' onChange={field} type="password" className="modal-cmp-input input-primary" />
                  </div> */}

                  <div className="modal-cmp-item">
                    <label htmlFor="" className="modal-cmp-title">URL фотографии</label>
                    <input name='photoUrl' onChange={field} type="url" className="input-primary" placeholder='Введите URL' />
                  </div>

                  <div className="modal-cmp-item">
                    <label className="modal-cmp-title">О себе</label>
                    <textarea name='about' onChange={field} className="modal-cmp-textarea textarea textarea-primary"></textarea>
                  </div>
                </div>

                <div className="modal-btn">
                  <button type="submit" onClick={edit} className="modal-btn-add primary">Сохранить</button>
                  <button onClick={() => setActive(false)} type='reset' className="modal-btn-cancel default">Отмена</button>
                </div>
              </form>
          }
        </div>
      </div>
    </div >
  );
};

export default Modal;