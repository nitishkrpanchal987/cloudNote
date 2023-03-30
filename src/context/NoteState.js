import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const host = "https://cloudnote-backend.onrender.com"
    const iNote = [];

    const [notes, setNotes] = useState(iNote)

    //get all notes
    const getNotes = async ()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token" : localStorage.getItem('token')
            }
          });

        const json = await response.json();
        console.log(json);
        setNotes(json);
    }

    //add notes
    const addNote = async (title, description, tag)=>{
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token" : localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}), 
          });

        let note = await response.json();
        setNotes(notes.concat(note))
    }

    //delete note
    const deleteNote = async(id)=>{
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
        body: JSON.stringify(), 
      });
      const json = response.json();
      console.log(json)
        console.log('delete with' + id);
        let newNote = notes.filter((note)=>{return note._id!==id});
        setNotes(newNote);
    }

    //edit note
    const editNote = async (id, title, description, tag)=>{

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token" : localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}), 
          });
          const notes = await response.json();

          let newNotes = JSON.parse(JSON.stringify(notes));
        for(let i = 0; i < notes.length; i++)
        {
            let ele = newNotes[i];
            if(ele._id === id)
            {
              newNotes[i].title = title;
              newNotes[i].description = description;
              newNotes[i].tag = tag;
              break;
            }
        }
        setNotes(newNotes);
    }

    return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;