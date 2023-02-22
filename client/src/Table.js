import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from './redux-store';
import { bindActionCreators } from 'redux';

const Table = ({ bugList, bugsPerPage, deleteBug, modifyBug, sortTypes, sortData, searchBugs }) => {

    const dispatch = useDispatch();
    const { currentPage, editContent,
        newData, idCurrentSort,
        moduleCurrentSort, showSearch } = useSelector(state => state);

    const { setEditContent, setNewData, setIdCurrentSort,
        setModuleCurrentSort, setShowSearch } = bindActionCreators(actionCreators, dispatch);

    // State for searching by description

    let tableId = (bugsPerPage * (currentPage - 1)) + 1;

    const setEdit = (bugId) => {
        const { id, description, module, technology, platform, severity } = bugList.find(bug => bug.id === bugId);

        setNewData({
            id: id,
            description: description,
            module: module,
            technology: technology,
            platform: platform,
            severity: severity
        });

        setEditContent(true);
    }

    const handleSubmit = () => {

        const desc = newData.description;
        // let regex = /^([\w\.-]+)@([a-z-]{2,8}).([a-z]{2,8})(.[a-z]{2,5})?$/; // for Email

        // eslint-disable-next-line
        let re = /^([\w])([\w\s\.!]+)$/;

        // Input validation through regex
        if (re.test(desc)) {
            modifyBug(newData);
            setEditContent(false);
        }
        else {
            const element = document.getElementById("bugDesc");
            element.style.border = "red solid 2px";
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        // setNewData((prev) => {
        //     return {
        //         ...prev,
        //         [name]: value
        //     }
        // });

        setNewData({ [name]: value });
    }

    // SORTING by Id - Number
    const handleIdSort = (by) => {
        const currentSort = idCurrentSort;
        let nextSort = '';

        if (currentSort === 'down')
            nextSort = 'up';

        else if (currentSort === 'up')
            nextSort = 'default';

        else if (currentSort === 'default')
            nextSort = 'down';

        sortData(by, currentSort);
        setIdCurrentSort(nextSort);
    }

    // SORTING by Module - String
    const handleModuleSort = (by) => {
        const currentSort = moduleCurrentSort;
        let nextSort = '';

        if (currentSort === 'down')
            nextSort = 'up';

        else if (currentSort === 'up')
            nextSort = 'default';

        else if (currentSort === 'default')
            nextSort = 'down';

        sortData(by, currentSort);
        setModuleCurrentSort(nextSort);
    }

    // Handle Searching
    const handleSearch = () => {
        if (!showSearch) // showSearch == false
            setShowSearch(true);
        else {
            if (searchText === "") {
                setShowSearch(false);
                searchBugs(searchText);
            }
            else {
                searchBugs(searchText);
                setSearchText("");
                setShowSearch(false);
            }

        }
    }

    const [searchText, setSearchText] = useState("");

    const searchTextHandler = (event) => {
        setSearchText(event.target.value);
    }

    return (
        <div className="table-div">
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>
                            Id
                            <button
                                className="sortButton btn btn-outline-secondary"
                                onClick={() => handleIdSort("id")}>
                                <i className={`fa-solid fa-${sortTypes[idCurrentSort].class}`} />
                            </button>
                        </th>

                        <th> 
                            {
                                showSearch 
                                ?
                                <input className="form-control w-75 d-inline" 
                                id="searchByDescription" 
                                placeholder="Search Description"
                                onChange={searchTextHandler} 
                                type="text" />
                                :
                                "Description"
                            }
                            <button
                                className="sortButton btn btn-outline-secondary"
                                onClick={() => handleSearch()} >
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </th>

                        <th>
                            Module
                            <button
                                className="sortButton btn btn-outline-secondary"
                                onClick={() => handleModuleSort("module")}>
                                <i className={`fa-solid fa-${sortTypes[moduleCurrentSort].class}`} />
                            </button>
                        </th>
                        <th>Technology</th>
                        <th>Platform</th>
                        <th>Priority</th>
                        <th> {editContent ? "Save" : "Edit"}</th>
                        <th>Modify</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        bugList.map(({ id, description, module, technology, platform, severity }) => {
                            return (
                                <tr key={id} className="table-light" >
                                    <td id="id"> {tableId++} </td>
                                    <td id="bugId"> {id} </td>
                                    {
                                        (editContent && id === newData.id) ?
                                            (
                                                <>
                                                    <td>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="description"
                                                            id="bugDesc"
                                                            value={newData.description}
                                                            onChange={onChangeHandler} />
                                                    </td>
                                                    <td>
                                                        <select
                                                            className="form-select"
                                                            name="module"
                                                            id="module"
                                                            value={newData.module}
                                                            onChange={(event) => {
                                                                onChangeHandler(event);
                                                            }} >
                                                            <option value="Frontend">Frontend</option>
                                                            <option value="Backend">Backend</option>
                                                            <option value="Testing">Testing</option>
                                                            <option value="Database">Database</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <select
                                                            className="form-select"
                                                            name="technology"
                                                            id="technology"
                                                            value={newData.technology}
                                                            onChange={(event) => {
                                                                onChangeHandler(event);
                                                            }} >
                                                            <option value="ReactJs">ReactJs</option>
                                                            <option value="Angular">Angular</option>
                                                            <option value="Oracle10g">Oracle10g</option>
                                                            <option value="Spring">Spring</option>
                                                            <option value="NextJs">NextJs</option>
                                                            <option value="VeuJs">VeuJs</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <select
                                                            className="form-select"
                                                            name="platform"
                                                            id="platform"
                                                            value={newData.platform}
                                                            onChange={(event) => {
                                                                onChangeHandler(event);
                                                            }} >
                                                            <option value="Windows">Windows</option>
                                                            <option value="Mac">Mac</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <select
                                                            className="form-select"
                                                            name="severity"
                                                            id="severity"
                                                            value={newData.severity}
                                                            onChange={(event) => {
                                                                onChangeHandler(event);
                                                            }} >
                                                            <option value="High">High</option>
                                                            <option value="Medium">Medium</option>
                                                            <option value="Low">Low</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <button
                                                            value={id} id="yes"
                                                            onClick={handleSubmit}>
                                                            <i className="fa-regular fa-circle-check fa-lg"></i>
                                                        </button>
                                                        <button value={id} id="no"
                                                            onClick={() => setEditContent(false)}>
                                                            <i className="fa-regular fa-circle-xmark fa-lg"></i>
                                                        </button>
                                                    </td>
                                                    <td><button value={id} id="delete"
                                                        onClick={() => { deleteBug(id) }} >
                                                        <i className="fa-regular fa-trash-can fa-lg"></i>
                                                    </button></td>

                                                </>
                                            ) :
                                            (
                                                <>
                                                    <td> {description} </td>
                                                    <td> {module} </td>
                                                    <td> {technology} </td>
                                                    <td> {platform} </td>
                                                    <td> {severity} </td>
                                                    <td>
                                                        <button value={id} id="edit"
                                                            onClick={() => setEdit(id)}>
                                                            <i className="fa fa-thin fa-pencil  fa-lg"></i>
                                                        </button>
                                                    </td>
                                                    <td><button value={id} id="delete"
                                                        onClick={() => deleteBug(id)} >
                                                        <i className="fa-regular fa-trash-can  fa-lg"></i>
                                                    </button></td>
                                                </>
                                            )
                                    }
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default Table;

