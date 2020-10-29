import "./Note.css"
import React, { useContext, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom"
import { Button, Card, CardBody } from "reactstrap";

const Note = ({ note }) => {

    const currentUserId = JSON.parse(sessionStorage.getItem('userProfile')).id
    const { printerId, noteId, postId } = useParams();

    return (
        <Card style={{ border: "none" }}>
            <div className="noteCard">
                <CardBody>
                    <strong>{note.fileName}</strong>
                    <div>{note.filamentLength}</div>
                    <img src={note.image} alt="note image" />
                    <div>{note.name}</div>
                    
                    {/* <p><Link to={`/printers/${printerId}/notes/${note.id}`}>More</Link></p> */}
                    <div className="noteTextArea">{note.content}</div>
                    <div>
                    <Link to={`/printers/${printerId}`}>
                        <Button>Back</Button>
                    </Link>
                        {(currentUserId === note.job.printer.userProfileId) ?
                            <Link to={`/posts/${postId}/notes/${note.id}/delete`}>
                                <Button color="danger" className="noteButton">Delete</Button>
                            </Link>
                            : <div></div>}

                        {(currentUserId === note.job.printer.userProfileId) ?
                            <Link to={`/posts/${postId}/notes/${note.id}/edit`}>
                                <Button className="noteButton">Edit</Button>
                            </Link>
                            : <div></div>}
                    </div>
                </CardBody>
            </div>
        </Card>
    )




}

export default Note;