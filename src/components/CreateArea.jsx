import React,{useState} from "react";
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea (props) {

  const [note, setNote] = useState ({
    title: "",
    content: ""
  });

  const [clicked, setClicked] = useState ("false");

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

  function addNote (event){

    props.onAdd (note);
    setNote ({
      title : "",
      content: ""
    });

    event.preventDefault();
  }

  function handleTransition () {
    setClicked ("true");
  }

  return (
    <div>
      <form className="create-note">
        <input
          type={clicked === "false"? "hidden" :""} 
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
          rows= {clicked === "false" ? "1": "3"}
        />

      { clicked === "true" ?
        <Zoom in= {clicked}>
          <Fab onClick = {addNote}>
            <AddCircleSharpIcon />
          </Fab>
        </Zoom>
        : null
      }
      </form>
    </div>
  );
}

export default CreateArea;
