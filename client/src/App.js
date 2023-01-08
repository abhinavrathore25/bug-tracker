import { useState } from "react";
import Form from "./Form";
import Header from "./Header";
import Table from "./Table";

function App() {

  const [bugList, setBugList] = useState([]);
  const lastItemId = bugList.length !== 0 ? bugList[bugList.length - 1].id : 0;

  const addBug = (newBug) => {
    setBugList([...bugList, newBug]);
  };

  const deleteBug = (bugId) => {
    const list = [...bugList];
    console.log(list);
    const index = list.findIndex((bug) => {
      console.log(bug);
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

  return (
    <>
      <section id="siteHeader">
        <Header />
        
      </section>

      <section id="bugEntry">
        <Form lastItemId= {parseInt(lastItemId)} addBug={addBug} />
      </section>

      <section id="bugTable">
        <Table bugList={bugList} deleteBug={deleteBug} modifyBug={modifyBug} />
      </section>
    </>
  );
}

export default App;
