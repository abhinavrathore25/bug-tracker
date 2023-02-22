import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from "./redux-store";
import { bindActionCreators } from "redux";
import axios from "axios";
import Form from "./Form";
import Header from "./Header";
import Pagination from "./Pagination";
import Table from "./Table";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {

  const dispatch = useDispatch();

  const { currentPage, lastItemId, bugList, bugsPerPage } = useSelector(state => state);
  const { setCurrentPage, setLastItemId, setBugList, setBugsPerPage } = bindActionCreators(actionCreators, dispatch);

  let URL = window.location.hostname;
  if (URL === "localhost") {
    URL = process.env.REACT_APP_AXIOS_URL;
  } else {
    URL = "https://bugtracker.cyclic.app/"
  }

  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  };

  const getBugList = useCallback(() => {
    axios
      .get(`${URL}/retrieveBugs`)
      .then(res => { setBugList(res.data) })
      .catch(err => console.log(err.message))
      ;
  }, [URL, setBugList]);

  useEffect(() => {

    if (bugList.length === 0) {
      getBugList();
    }

    axios
      .get(`${URL}/newBugId`)
      .then(res => setLastItemId(res.data))
      .catch(err => console.log(err))
      ;

  }, [URL, getBugList, bugList, setLastItemId]);

  // Adding New Bug => Called from Form Component
  const addBug = (newBug) => {
    newBug = { ...newBug, id: lastItemId + 1 };
    axios.post(`${URL}/addBug`, newBug, config)
      .then(res => setBugList([...bugList, newBug]))
      .catch(err => console.log(err.message));

  };

  // Deleting Bug => Called from Table Component (Delete Button)
  const deleteBug = (bugId) => {

    axios.delete(`${URL}/deleteBug/${bugId}`)
      .then(res => res.data === "Success" && getBugList())
      .catch(err => console.log(err));
  }

  // Modifying Bug => Called from Table Component (Yes Button)
  const modifyBug = (modifiedBug) => {

    axios
      .patch(`${URL}/updateBug`, modifiedBug, config)
      .then(res => res.status === 200 && getBugList())
      .catch(err => console.log(err.message));

    setBugList([]);
  }

  // Pagination Logic - START
  const indexOfLastBug = currentPage * bugsPerPage;
  const indexOfFirstBug = indexOfLastBug - bugsPerPage;
  const currentBugs = bugList.slice(indexOfFirstBug, indexOfLastBug);

  const paginateWithButton = (incrementDecrement, end) => {

    const previousOrNext = currentPage + incrementDecrement;

    if (previousOrNext > 0 && previousOrNext <= end) {
      setCurrentPage(previousOrNext);
    }
  }
  // Pagination Logic - END

  // Sorting Logic => Called from Table Component
  const sortTypes = {
    up: {
      class: 'sort-up',
      fnId: (a, b) => a.id - b.id,
      fnModule: (a, b) => a.module.localeCompare(b.module)
    },

    down: {
      class: 'sort-down',
      fnId: (a, b) => b.id - a.id,
      fnModule: (a, b) => b.module.localeCompare(a.module)
    },

    default: {
      class: 'sort',
      fnId: (a, b) => a,
      fnModule: (a, b) => a
    }
  }

  const sortData = (by, type) => {
    if (by === "id") {
      setBugList(
        [...bugList].sort(sortTypes[type].fnId)
      )
    }

    else if (by === "module") {
      setBugList(
        [...bugList].sort(sortTypes[type].fnModule)
      )
    }
  }

  // Searching Logic => Called from Table Component (Search Button in Description Header)
  const searchBugs = (description) => {
    const filteredBugs = bugList.filter((bug) => {
      return bug.description.toLowerCase().includes(description.toLowerCase());
    });

    if (description.length !== 0) {
      setCurrentPage(1);
      setBugList(filteredBugs);
    }
    else
      getBugList();
  }

  // Handling bugsPerPage and jump to page via user input
  const [newData, setNewData] = useState({
    newBugsPerPage: "",
    jumpToPage: ""
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const maxPage = Math.ceil(bugList.length / bugsPerPage);

    if (name === "jumpToPage" && ((value > 0 && value <= maxPage) || value === "")) {
      if (value !== "")
        setNewData({ ...newData, [name]: parseInt(value) });
      else
        setNewData({ ...newData, [name]: value });
    }
    else if (name === "newBugsPerPage" && ((value > 0 && value <= bugList.length) || value === "")) {
      setCurrentPage(1);
      setNewData({ ...newData, [name]: value });
    }
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Header />}>

            <Route path="/form" element={
              <Form addBug={addBug} />
            } />

            <Route exact path="/" element={<Navigate to="/table" />} />
            <Route exact path="/table" element={[
              <Table key="table" bugList={currentBugs} bugsPerPage={bugsPerPage} currentPage={currentPage}
                deleteBug={deleteBug} modifyBug={modifyBug} sortTypes={sortTypes} sortData={sortData}
                searchBugs={searchBugs} />
              ,

              <Pagination
                key="pagination"
                totalBugs={bugList.length}
                paginateWithButton={paginateWithButton} />
              ,

              <div className="footer-container"  key="footer">
                
                <input
                  type="number"
                  name="newBugsPerPage"
                  placeholder="# Of Bugs"
                  value={newData.newBugsPerPage}
                  onChange={(event) => handleChange(event)}>
                </input>

                <button
                  className="btn btn-secondary"
                  onClick={() => { setBugsPerPage(newData.newBugsPerPage); setCurrentPage(1); }}>
                  Go
                </button>

                <input
                  type="number"
                  name="jumpToPage"
                  placeholder="Page No"
                  value={newData.jumpToPage}
                  onChange={(event) => handleChange(event)}>
                </input>

                <button 
                  className="btn btn-secondary"
                  onClick={() => newData.jumpToPage && setCurrentPage(newData.jumpToPage)}>
                  Go
                </button>

              </div>
            ]
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
