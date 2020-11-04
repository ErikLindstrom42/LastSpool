import React, { useContext, useEffect } from "react";
import { NoteContext } from "../../providers/NoteProvider";
import Note from "./Note";
import { useParams, useHistory, Link } from 'react-router-dom';
import NoteForm from "./NoteForm";



const NoteList = () => {
    const { notes, getNotesByJobId } = useContext(NoteContext);
    const { printerId, jobId } = useParams();

    useEffect(() => {
        getNotesByJobId(jobId);

    }, []);


    return (
        <>

            <div className="container">
                <div className="row justify-content-center">
                    <NoteForm />
                    <div className="cards-column">
                        {notes.map((note) =>
                            <Note key={note.id} note={note}
                            />

                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteList;