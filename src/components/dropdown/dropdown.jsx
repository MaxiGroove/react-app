import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import './dropdown.scss';

const Dropdown = observer(({ nameOfFilter, listValue, filterForm, setFilterForm }) => {
    const handleFiltred = e => {
        e.target.checked ? setFilterForm({ ...filterForm, [nameOfFilter]: [...filterForm[nameOfFilter], e.target.value] }) : setFilterForm({ ...filterForm, [nameOfFilter]: filterForm[nameOfFilter].filter(item => item !== e.target.value) });
    }

    const name = {
        'type': 'Тип',
        'assignedUsers': 'Пользователь',
        'status': 'Статус',
        'rank': 'Приоритет',
    }

    const ddList = {
        'task': 'Задача',
        'bug': 'Ошибка',
        'opened': 'Открыто',
        'inProgress': 'В работе',
        'testing': 'Тестируется',
        'complete': 'Сделано',
        'low': 'Низкий',
        'medium': 'Средний',
        'high': 'Высокий',
    }

    const [ddActive, setDdActive] = useState(false);

    return (

        <div className={`dropdown ${ddActive ? 'dropdown-active' : ``}`}>
            <div className={`dropdown-type dropdown-type-${nameOfFilter} ${ddActive ? 'dropdown-type-active' : ''}`} onClick={() => setDdActive(true)}>
                <div className="dropdown-type-text">
                    {name[nameOfFilter]}
                </div>
                {ddActive ? <img className="dropdown-arrow" src="./images/arrow-up.svg" alt="" /> : <img className="dropdown-arrow" src="./images/arrow-down.svg" alt="" />}
            </div>

            <div className={ddActive ? 'dropdown-wrap-active' : 'dropdown-wrap'} onClick={() => setDdActive(false)}>
            </div>
            <div className={ddActive ? 'dropdown-list-active' : 'dropdown-list'}>
                <div className={`dropdown-checkbox checkbox-${nameOfFilter}`} onClick={e => e.stopPropagation()}>
                    {nameOfFilter === 'assignedUsers' ?
                        Object.keys(listValue).map(item => (
                            <div className='checkbox'>
                                <input
                                    type="checkbox"
                                    className='checkbox-input'
                                    onChange={handleFiltred}
                                    id={item}
                                    name={nameOfFilter}
                                    value={item}
                                />
                                <label className='checkbox-label' htmlFor={item}>{listValue[item]}</label>
                            </div>
                        )) :
                        listValue.map(item => (
                            <div className="checkbox">
                                <input
                                    type="checkbox"
                                    className='checkbox-input'
                                    onChange={handleFiltred}
                                    id={item}
                                    name={nameOfFilter}
                                    value={item}
                                />
                                <label className='checkbox-label' htmlFor={item}>{ddList[item]}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    );
});

export default Dropdown;

