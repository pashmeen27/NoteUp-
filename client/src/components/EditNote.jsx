import React from "react";

function EditNote (props) {
    return (
        <div>
            <form className="create-note">
                <input
                name="title" 
                value = {props.title} 
                placeholder="Title" 
                />

                <textarea 
                name="content" 
                value = {props.content} 
                placeholder="Take a note..." 
                rows= "3"
                />
            </form>
        </div>
    );
}

export default EditNote;