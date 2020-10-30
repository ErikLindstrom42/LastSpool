import "./Note.css"
import React, { useContext, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom"
import { Button, Card, CardBody } from "reactstrap";

const Note = ({ note }) => {

    const currentUserId = JSON.parse(sessionStorage.getItem('userProfile')).id
    const { printerId, noteId, postId, jobId } = useParams();

//     const o_date = note.createDateTime.toLocaleDateString;
// const f_date = (m_ca, m_it) => Object({...m_ca, [m_it.type]: m_it.value});
// const m_date = o_date.formatToParts().reduce(f_date, {});
// console.log(m_date.day + '-' + m_date.month + '-' + m_date.year);

let date = new Date(note.createDateTime)
const HumanPublishDate = `${date.getHours()}:${date.getMinutes()+1}GMT ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
//console.log(tempDate.getMonth())
    return (
        <Card style={{ border: "none" }}>
            <div className="noteCard">
                <CardBody>
              
                    
                    <div>{HumanPublishDate}</div>
                    
                    
                    {/* <p><Link to={`/printers/${printerId}/notes/${note.id}`}>More</Link></p> */}
                    <div className="noteTextArea">{note.content}</div>
                    <div>
                    {/* <Link to={`/printers/${printerId}`}>
                        <Button>Back</Button>
                    </Link> */}
                        {(currentUserId === note.job.printer.userProfileId) ?
                            <Link to={`/printers/${printerId}/jobs/${jobId}/notes/${note.id}/delete`}>
                                <Button color="danger" className="noteButton">Delete</Button>
                            </Link>
                            : <div></div>}

                        {(currentUserId === note.job.printer.userProfileId) ?
                            <Link to={`/printers/${printerId}/jobs/${jobId}/notes/${note.id}/delete`}>
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