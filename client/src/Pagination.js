import React from 'react'
import { useSelector } from 'react-redux';

const Pagination = ({ totalBugs, paginateWithButton }) => {

    const { bugsPerPage, currentPage } = useSelector(state => state);
    const end = Math.ceil(totalBugs / bugsPerPage);

    return (
        <nav>
            <button onClick={() => paginateWithButton(-1, end)} >Previous</button>
            <span> {currentPage} ... {end !== 0 ? end : 1} </span>
            <button onClick={() => paginateWithButton(+1, end)} >Next</button>
        </nav>
    )
}

export default Pagination;