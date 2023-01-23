import React, { useState } from 'react';

const Table = ({ bugList, bugsPerPage, currentPage, deleteBug, modifyBug, sortTypes, sortData, searchBugs }) => {

    const [editContent, setEditContent] = useState(false); // Toggle Editing in Row
    const [newData, setNewData] = useState({
        id: -1,
        description: "",
        module: "",
        technology: "",
        platform: "",
        severity: ""
    }); // State to store new data entered by user

    // State for Sorting With Id and Module
    const [idCurrentSort, setIdCurrentSort] = useState("default");
    const [moduleCurrentSort, setModuleCurrentSort] = useState("default");

    // State for searching by description
    const [showSearch, setShowSearch] = useState(false);

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
        else{
            const element = document.getElementById("bugDesc");
            element.style.border = "red solid 2px";
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setNewData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
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
        <>
            <table>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>
                            Id
                            <button
                                className="sortButton"
                                onClick={() => handleIdSort("id")}>
                                <i className={`fa-solid fa-${sortTypes[idCurrentSort].class}`} />
                            </button>
                        </th>

                        <th> Description
                            {
                                showSearch && <input id="searchByDescription" onChange={searchTextHandler} type="text" />
                            }
                            <button
                                className="sortButton"
                                onClick={() => handleSearch()} >
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </th>

                        <th>
                            Module
                            <button
                                className="sortButton"
                                onClick={() => handleModuleSort("module")}>
                                <i className={`fa-solid fa-${sortTypes[moduleCurrentSort].class}`} />
                            </button>
                        </th>
                        <th>Technology</th>
                        <th>Platform</th>
                        <th>Priority</th>
                        <th> {editContent ? "Save" : "Edit" }</th>
                        <th>Modify</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        bugList.map(({ id, description, module, technology, platform, severity }) => {
                            return (
                                <tr key={id} >
                                    <td id="id"> {tableId++} </td>
                                    <td id="bugId"> {id} </td>
                                    {
                                        (editContent && id === newData.id) ?
                                            (
                                                <>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="description"
                                                            id="bugDesc"
                                                            value={newData.description}
                                                            onChange={onChangeHandler} />
                                                    </td>
                                                    <td>
                                                        <select
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
                                                        <select name="technology" id="technology" value={newData.technology}
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
                                                            Yes
                                                        </button>
                                                        <button value={id} id="no" 
                                                        onClick={() => setEditContent(false)}>
                                                         No 
                                                         </button>
                                                    </td>
                                                    <td><button value={id} 
                                                    onClick={() => { deleteBug(id) }} >Delete</button></td>

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
                                                        onClick={() => setEdit(id)}> Edit </button>
                                                    </td>
                                                    <td><button value={id} 
                                                    onClick={() => deleteBug(id)} >Delete</button></td>
                                                </>
                                            )
                                    }
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </>
    )
}

export default Table;

