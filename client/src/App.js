import { useState } from "react";
import Form from "./Form";
import Header from "./Header";
import Pagination from "./Pagination";
import Table from "./Table";

function App() {

  const [bugList, setBugList] = useState([]);
  const lastItemId = bugList.length !== 0 ? bugList[bugList.length - 1].id : 0;

  const [bugsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Adding New Bug => Called from Form Component
  const addBug = (newBug) => {
    setBugList([...bugList, newBug]);
  };

  // Deleting Bug => Called from Table Component (Delete Button)
  const deleteBug = (bugId) => {
    const list = [...bugList];
    const index = list.findIndex((bug) => {
      return bug.id === bugId;
    });

    list.splice(index, 1);
    setBugList([...list]);
  }

  // Modifying Bug => Called from Table Component (Yes Button)
  const modifyBug = (modifiedBug) => {
    const list = [...bugList];

    list.forEach((element, index) => {
      if (element.id === modifiedBug.id)
        list[index] = modifiedBug;
    })

    setBugList([...list]);
  }

  // Pagination Logic - START
  const indexOfLastBug = currentPage * bugsPerPage;
  const indexOfFirstBug = indexOfLastBug - bugsPerPage;
  const currentBugs = bugList.slice(indexOfFirstBug, indexOfLastBug);

  const paginateWithButton = (incrementDecrement, end) => {
    const previousOrNext = currentPage + incrementDecrement;

    if (previousOrNext > 0 && previousOrNext <= end) {
      console.log(previousOrNext);
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

    if(description)
      setBugList(filteredBugs);

  }

  return (
    <>
      <section id="siteHeader">
        <Header />

      </section>

      <section id="bugEntry">
        <Form lastItemId={parseInt(lastItemId)} addBug={addBug} />
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
      </section>
    </>
  );
}

export default App;
