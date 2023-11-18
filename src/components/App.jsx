import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {

    const [items, setItems] = useState ([]);
    
    function handleItems (note) {
        setItems (prevValue => {
          return [...prevValue, note];
        });
    }

    function deleteItem (id) {
        setItems (prevValue => {
            return prevValue.filter (
                (currNote, currId) => {
                    return currId != id;
                }
            )
        });
    }

    return (
        <div>
        <Header />
        <CreateArea onAdd = {handleItems}/>
        
        {
            items.map((noteItem, index) => {
                console.log("Title : "+ noteItem.title);
                return (
                    <Note
                        key = {index}
                        id = {index}
                        title = {noteItem.title}
                        content = {noteItem.content}
                        onDelete = {deleteItem}
                    />
                );
            })
        }
        {/* <Note key={1} title="Note title" content="Note content" /> */}
        <Footer />
        </div>
    );
}

export default App;
