import { action } from 'mobx';
import './paginator.scss';

const Paginator = ({ page, limit, total, item }) => {
    const pageCount = Math.ceil(total / limit);
    const disabled = Math.floor(total / limit) < page + 1 || total - (page + 1) * limit === 0;
    const pageNumber = [];

    for (let i = 0; i <= pageCount - 1; i++) {
        pageNumber.push(i);
    }

    const prevPage = action((e) => {
        e.preventDefault();
        item.pagination.page -= 1;
        item.fetch();
    });
    const nextPage = action((e) => {
        e.preventDefault();
        item.pagination.page += 1;
        item.fetch();
    });

    return (
        <div className='pagination'>

            <div className="pagination-left">
                <ul className='pagination-items'>
                    <li className='pagination-item'>
                        <button
                            className={`pagination-btn btn-back ${page === 0 ? 'disabled' : 'default'}`}
                            disabled={page === 0}
                            onClick={prevPage}>Назад</button>
                    </li>

                    {pageNumber.map((e) => (
                        <li className="pagination-item" key={e}>
                            <button
                                className={`pagination-btn default ${page === e ? 'primary' : ''}`}
                                onClick={action(() => {
                                    item.pagination.page = e;
                                    item.fetch();
                                })}
                            >{e + 1}</button>

                        </li>
                    ))}

                    <li className="pagination-item">
                        <button
                            className={`pagination-btn btn-forward ${disabled ? 'disabled' : 'default'}`}
                            disabled={disabled}
                            onClick={nextPage}>Вперед</button>
                    </li>
                </ul>
            </div>

            <div className="pagination-right">
                <span className='pagination-text'>{`Показано ${page === 0 ? '1' : page * limit + 1} - ${(page + 1) * limit > total ? total : page * limit + limit} из ${total}`}</span>
            </div>
        </div>
    );
};

export default Paginator;