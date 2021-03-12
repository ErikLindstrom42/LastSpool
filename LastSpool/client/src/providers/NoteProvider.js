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

    const getNoteById = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`

                }
            }).then((res) => res.json()));


    const deleteNote = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }));

    const editNote = (note) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${note.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(note)
            }));



    return (
        <NoteContext.Provider value={{ notes, getNotesByJobId, addNote, getNoteById, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    );
}

