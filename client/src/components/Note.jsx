import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CreateArea from "./CreateArea";

function Note (props) {

    var data = {title: "", content: ""};

    function handleDelete () {
        props.onDelete (props.id);
    }

    // function handleEdit () {
    //     setEditNote (true);
    //     data= {
    //         title : props.title,
    //         content : props.content
    //     };
    //     console.log(data);
    // }

    function handleEdit () {
        props.onEdit (props.id, props.title, props.content);
    }
    
    return (

        <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick= {handleDelete}>
                <DeleteIcon />
            </button>
            <button onClick = {handleEdit}>
                <EditIcon />
            </button>
{/* 
            {
                editNote === true && <CreateNote />
            } */}

        </div>
    );
}

export default Note;