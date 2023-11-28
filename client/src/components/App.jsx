import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import EditNote from "./EditNote";

function App () {

    const [items, setItems] = useState ([]);
    const [editNote, setEditNote] = useState({id:-1, title : "", content : ""});

    useEffect (()=>{
        fetch("http://localhost:8080/").
            then((response) => response.json()).
            then((data)=>setItems(data));
    });

    function handleItems (note) {
        setItems (prevValue => {
          return [...prevValue, note];
        });
    }
    
    function updateItems (note) {
        setItems((prevValue) => {
            var arr = prevValue.filter(
                (currNote) => {
                    return currNote.id == note.id;
                }
            );

            arr = note;
            return prevValue;
        })
    }

    async function deleteItem (id) {
        
        setItems((prevValue)=> {
            return prevValue.filter(
                (currNote) => {
                    return currNote.id != id;
                }
            )
        });

        const response = await fetch (
            `http://localhost:8080/delete/${id}`, {
              method : "DELETE"
            }
        );
    }

    async function editItem (id, title, content) {
        editNote.id = id;
        editNote.title = title;
        editNote.content = content;
        setEditNote(editNote);

        console.log(id);
    } 

    return (
        <div>
        <Header />
        <CreateArea onAdd={handleItems} note = {editNote} onUpdate={updateItems}/>
        
        {
            items.map((noteItem) => {
                return (
                    <Note
                        key = {noteItem.id}
                        id = {noteItem.id}
                        title = {noteItem.title}
                        content = {noteItem.content}
                        onDelete = {deleteItem}
                        onEdit = {editItem}
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