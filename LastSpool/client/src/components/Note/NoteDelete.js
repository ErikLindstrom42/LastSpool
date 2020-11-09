import React, { useContext, useState, useEffect } from "react";
import {useHistory, useParams, Link} from 'react-router-dom';
import { NoteContext } from "../../providers/NoteProvider";
import { Button} from "reactstrap";
import "./Note.css"



const NoteDelete = () => {
    const [note, setNote] = useState();
    const { getNoteById, deleteNote } = useContext(NoteContext);
    const { printerId, jobId, noteId } = useParams();
    const history = useHistory();

    useEffect(() => {
        getNoteById(noteId).then(setNote);
    }, []);
    

    const handleDelete = (id) => {
        deleteNote(note.id)
            .then(() => history.push(`/printers/${printerId}/jobs/${jobId}/details`))
    }

    if (!note) return null;
    const publishDate = new Date(note.createDateTime)
        const HumanPublishDate = `${publishDate.getMonth() + 1}/${publishDate.getDate()}/${publishDate.getFullYear()}`

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-12 col-lg-6">
                    <h3>Are you sure you want to delete this note?</h3>
                    <div>Content: {note.content}</div>             
                    <div>Created on: {HumanPublishDate}</div>
                    <Button onClick={handleDelete} color="danger" className="noteButton">Delete</Button>
                    <Link to={`/printers/${printerId}/jobs/${jobId}/details`}>
                        <Button color="secondary" className="noteButton">Back</Button>
                    </Link>

                </div>
            </div>
        </div>
    )
}
export default NoteDelete;


