import React,{useEffect, useState} from "react";
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function CreateArea (props) {

  const [note, setNote] = useState (props.note);
  const [clicked, setClicked] = useState (false);

  function handleNote (event){
    const {value, name} = event.target;

    setNote (prevValue => {
      if (name === "title") {
        return {
          title : value,
          content : prevValue.content
        }
      } else if (name === "content") {
        return {
          title : prevValue.title,
          content : value
        }
      }
    });
  }

  async function addNote (event){

    props.onAdd (note);

    // event.preventDefault();

    const response = await fetch (
      "http://localhost:8080/add", {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body: JSON.stringify(note)
      }
    );

    setNote ({
      title : "",
      content: ""
    });

    event.preventDefault();
  }

  async function updateNote (event) {
    
    console.log(note);
    props.onUpdate(note);
    const id = note.id;
    console.log(id);

    const response = await fetch(
      `http://localhost:8080/edit/${id}`, {
          method:"PUT",
          headers : {"Content-Type" : "application/json"},
          body : JSON.stringify(note)
      }
    );

    setNote ({
      title : "",
      content: ""
    });

    event.preventDefault();
  }

  function handleTransition () {
    setClicked (true);
  }

  return (
    <div>
      <form className="create-note">
        <input
          type={(clicked === false)? "hidden" :""} 
          onChange = {handleNote} 
          name="title" 
          value = {note.title} 
          placeholder="Title" 
        />

        <textarea 
          onClick={handleTransition}
          onChange = {handleNote} 
          name="content" 
          value = {note.content} 
          placeholder="Take a note..." 
          rows= {clicked === false ? "1": "3"}
        />

      { 
        (clicked === true ) ?
        <Zoom in= {clicked}>
          { props.note.id == -1 ? 
            (
              <Fab type = "submit" onClick = {addNote}>
                <AddCircleSharpIcon /> 
              </Fab>
            ) : 
            (
              <Fab type = "submit" onClick = {updateNote}>
                <CheckCircleIcon />
              </Fab>  
            )
          }
        </Zoom>
        : null
      }
      </form>
    </div>
  );
}

export default CreateArea;
