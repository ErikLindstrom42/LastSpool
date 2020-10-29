import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const NoteContext = React.createContext();

export const NoteProvider = (props) => {
    const [notes, setNotes] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const apiUrl = "/api/note";

    const getNotesByJobId = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/getnotesbyjobid/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            }).then(resp => resp.json())
                .then(setNotes));

    const addNote = (note) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(note)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));






    return (
        <NoteContext.Provider value={{ notes, getNotesByJobId, addNote }}>
            {props.children}
        </NoteContext.Provider>
    );
}

//, deleteNote, editNote, getNoteById