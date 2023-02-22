import React from 'react'
import { useSelector } from 'react-redux';

const Pagination = ({ totalBugs, paginateWithButton }) => {

    const { bugsPerPage, currentPage } = useSelector(state => state);
    const end = Math.ceil(totalBugs / bugsPerPage);

    const { theme } = useSelector(state => state);
    return (
        <section className={`pagination-${theme}`} id="pagination">
            <nav>
                <button className="paginate-button" onClick={() => paginateWithButton(-1, end)} ><i className="fa-solid fa-circle-chevron-left"></i></button>
                <span> {currentPage} ... {end !== 0 ? end : 1} </span>
                <button className="paginate-button" onClick={() => paginateWithButton(+1, end)} ><i className="fa-solid fa-circle-chevron-right"></i></button>
            </nav>
        </section>
    )
}

export default Pagination;