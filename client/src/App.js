import { useState } from "react";
import Form from "./Form";
import Header from "./Header";
import Pagination from "./Pagination";
import Table from "./Table";

function App() {

  const [bugList, setBugList] = useState([]);
  const lastItemId = bugList.length !== 0 ? bugList[bugList.length - 1].id : 0;

  const [bugsPerPage, setBugsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const addBug = (newBug) => {
    setBugList([...bugList, newBug]);
  };

  const deleteBug = (bugId) => {
    const list = [...bugList];
    const index = list.findIndex((bug) => {
      return bug.id === bugId;
    });
    
    list.splice(index, 1);

    setBugList([...list]);
  }

  const modifyBug= (modifiedBug) => {
    const list = [...bugList];
    
    list.forEach((element, index) => {
      if(element.id === modifiedBug.id)
        list[index] = modifiedBug;
    })

    setBugList([...list]);
  }

  const indexOfLastBug = currentPage * bugsPerPage;
  const indexOfFirstBug = indexOfLastBug - bugsPerPage;
  const currentBugs = bugList.slice(indexOfFirstBug, indexOfLastBug);

  const paginateWithButton = (incrementDecrement, end) => {
    const previousOrNext = currentPage + incrementDecrement;

    if(previousOrNext > 0 && previousOrNext <= end){
      console.log(previousOrNext);
      setCurrentPage(previousOrNext);
    }
  }

  return (
    <>
      <section id="siteHeader">
        <Header />
        
      </section>

      <section id="bugEntry">
        <Form lastItemId= {parseInt(lastItemId)} addBug={addBug} />
      </section>

      <section id="bugTable">
        <Table bugList={currentBugs} bugsPerPage={bugsPerPage} currentPage={currentPage} deleteBug={deleteBug} modifyBug={modifyBug} />
      </section>

      <section id="pagination">
        <Pagination bugsPerPage={bugsPerPage} totalBugs = {bugList.length} currentPage={currentPage} paginateWithButton = {paginateWithButton} />
      </section>
    </>
  );
}

export default App;
