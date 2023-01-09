import React from 'react'

const Pagination = ({ bugsPerPage, totalBugs, currentPage, paginateWithButton }) => {
    const end = Math.ceil(totalBugs / bugsPerPage);
    return (
        <nav>
                    <button onClick={() => paginateWithButton(-1, end)} >Previous</button>
                    <span> {currentPage} ... {end !== 0 ? end : 1 } </span>
                    <button onClick={() => paginateWithButton(+1, end)} >Next</button>
        </nav>
    )
}

export default Pagination;