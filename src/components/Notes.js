import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/noteContext";
import NoteItem from './NoteItem';
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom';

export default function Notes() {
  const context = useContext(noteContext)
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token'))
    //react-hooks/exhaustive-deps
      getNotes();
    else{
      navigate("/login");
    }
  }, [])
  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  }
  const handleClick = (e) => {
    console.log('updating note')
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    // addNote(note.title, note.description, note.tag);
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote />

      <button type="button" ref={ref} class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-etitle" id="exampleModalLabel">Edit Note</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    minLength={5}
                    required
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>

                {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Change Note
        </button> */}
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" ref={refClose} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" class="btn btn-primary" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your notes</h2>
        <div className="container mx-2">
        {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((notes) => {
          return <NoteItem key={notes._id} updateNote={updateNote} notes={notes} />;
        })}
      </div>
    </>
  )
}
