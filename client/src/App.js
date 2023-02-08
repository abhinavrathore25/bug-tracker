import { useState, useEffect } from "react";
import Form from "./Form";
import Header from "./Header";
import Pagination from "./Pagination";
import Table from "./Table";
import axios from "axios";

function App() {

  const [bugList, setBugList] = useState([]);
  const [bugsPerPage, setBugsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastItemId, setLastItemId] = useState(0);

  const URL = "http://localhost:8080";
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  };

  useEffect(() => {

    if(bugList.length === 0){
      getBugList();
    }

    axios
    .get(`${URL}/newBugId`)
    .then(res => setLastItemId(res.data))
    .catch(err => console.log(err))
    ; 
      
  }, [bugList]);

  const getBugList = () => {
    axios
        .get(`${URL}/retrieveBugs`)
        .then(res => { setBugList(res.data) })
        .catch(err => console.log(err.message))
        ;
  }

  // Adding New Bug => Called from Form Component
  const addBug = (newBug) => {
    newBug = {...newBug, id: lastItemId + 1};
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

    if (description.length !== 0){
      setCurrentPage(1);
      setBugList(filteredBugs);
    }
    else
      getBugList();
  }

  // Handling bugsPerPage and jump to page via user input
  const [newData, setNewData] = useState({
    newBugsPerPage : 50,
    jumpToPage: 1
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const maxPage = Math.ceil(bugList.length/bugsPerPage);

    if (name === "jumpToPage" && ((value > 0 && value <= maxPage) || value === "") ){
      if(value !== "")
        setNewData({ ...newData, [name]: parseInt(value) });
      else
        setNewData({ ...newData, [name]: value });
    }
    else if (name === "newBugsPerPage"){
      setCurrentPage(1);
      setNewData({ ...newData, [name]: value });
    }

  }

  return (
    <>
      <section id="siteHeader">
        <Header />
      </section>

      <section id="bugEntry">
        <Form addBug={addBug} />
      </section>

      <section id="bugTable">
        <Table bugList={currentBugs} bugsPerPage={bugsPerPage} currentPage={currentPage}
          deleteBug={deleteBug} modifyBug={modifyBug} sortTypes={sortTypes} sortData={sortData}
          searchBugs={searchBugs}
        />
      </section>

      <section id="pagination">
        <Pagination bugsPerPage={bugsPerPage} totalBugs={bugList.length}
          currentPage={currentPage} paginateWithButton={paginateWithButton} />

        <div className="footer-container">
          <button
            style={{ "width":"200px", "justifySelf":"end" }}
            onClick={() => setBugsPerPage(newData.newBugsPerPage)}>
            Set Bugs Per Page
          </button>

          <input
            style={{ "width":"50px" }}
            type="number"
            name="newBugsPerPage"
            value={newData.newBugsPerPage}
            onChange={(event) => handleChange(event)}>
          </input>

          <button
            style={{ "width":"200px", "justifySelf":"end" }}
            onClick={() => newData.jumpToPage && setCurrentPage(newData.jumpToPage) }> Jump To Page
          </button>

          <input
            style={{ "width":"50px" }}
            type="number"
            name="jumpToPage"
            value={newData.jumpToPage}
            onChange={(event) => handleChange(event)}>
          </input>
        </div>

      </section>
    </>
  );
}

export default App;
