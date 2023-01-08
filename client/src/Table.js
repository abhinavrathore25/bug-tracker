import React, { useState } from 'react';

const Table = ({bugList, deleteBug}) => {
    const [editContent, setEditContent] = useState(false);
    const [newData, setNewData] = useState({
        id : 0, 
        description : "" , 
        module : "", 
        technology : "", 
        platform : "", 
        severity : ""
    });

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

  return (
    <>
        <table>
            <thead>
                <tr>
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
                      bugList.map(({id, description, module, technology, platform, severity}) => {
                          return (
                              <tr key= {id} >
                                  <td> {id} </td>
                                  <td contentEditable={ editContent } > {description} </td>
                                  <td contentEditable={ editContent } > {module} </td>
                                  <td contentEditable={ editContent } > {technology} </td>
                                  <td contentEditable={ editContent } > {platform} </td>
                                  <td contentEditable={ editContent } > {severity} </td>
                                  <td>
                                  <button value={id} id="edit" onClick={() => setEdit(id) }> {editContent ? "Save" : "Edit"} </button>
                                  <button value={id} id="yes" onClick={() => setEditContent(false)}> Yes </button>
                                  <button value={id} id="no" onClick={() => setEditContent(false)}> No </button>
                                  </td>
                                  <td><button value={id} onClick={() => {deleteBug(id)}} >Delete</button></td>
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

