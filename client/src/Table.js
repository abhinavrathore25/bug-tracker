import React, { useState } from 'react';

const Table = ({ bugList, bugsPerPage, currentPage, deleteBug, modifyBug }) => {
    const [editContent, setEditContent] = useState(false);
    const [newData, setNewData] = useState({
        id: -1,
        description: "",
        module: "",
        technology: "",
        platform: "",
        severity: ""
    });

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

    const handleSubmit = (event) => {
        modifyBug(newData);
        setEditContent(false);
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

    return (
        <>
            <table>
                <thead>
                    <tr className="tableHeader">
                        <th>Id</th>
                        <th>Description</th>
                        <th>Module</th>
                        <th>Technology</th>
                        <th>Platform</th>
                        <th>Priority</th>
                        <th>Edit</th>
                        <th>Modify</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        bugList.map(({ id, description, module, technology, platform, severity }) => {
                            return (
                                <tr key={id} >
                                    <td id="id">{tableId++}</td>
                                    {
                                        (editContent && id === newData.id) ?
                                            (
                                                <>
                                                    <td>
                                                        <input type="text" name="description" value={newData.description} onChange={onChangeHandler} />
                                                    </td>
                                                    <td>
                                                        <select name="module" id="module" value={newData.module}
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
                                                        <select name="platform" id="platform" value={newData.platform}
                                                            onChange={(event) => {
                                                                onChangeHandler(event);
                                                            }} >
                                                            <option value="Windows">Windows</option>
                                                            <option value="Mac">Mac</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <select name="severity" id="severity" value={newData.severity}
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
                                                        <button value={id} id="no" onClick={() => setEditContent(false)}> No </button>
                                                    </td>
                                                    <td><button value={id} onClick={() => { deleteBug(id) }} >Delete</button></td>

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
                                                        <button value={id} id="edit" onClick={() => setEdit(id)}> Edit </button>
                                                    </td>
                                                    <td><button value={id} onClick={() => deleteBug(id)} >Delete</button></td>
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

