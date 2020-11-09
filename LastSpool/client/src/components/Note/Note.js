import "./Note.css"
import React from "react";
import { Link, useParams } from "react-router-dom"
import { Button, Card, CardBody } from "reactstrap";
import DayJS from 'react-dayjs';


const Note = ({ note }) => {

    const currentUserId = JSON.parse(sessionStorage.getItem('userProfile')).id
    const { printerId, jobId } = useParams();

    return (
        <Card>
                <CardBody className="col-lg">
                    
                    {/* <p><Link to={`/printers/${printerId}/notes/${note.id}`}>More</Link></p> */}
                    <div className="noteTextArea">{note.content}</div>
                    <DayJS format="MMM D, h:mm A">{note.completeDateTime}</DayJS>
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
                            <Link to={`/printers/${printerId}/jobs/${jobId}/notes/${note.id}/edit`}>
                                <Button className="noteButton">Edit</Button>
                            </Link>
                            : <div></div>}
                    </div>
                </CardBody>
            
        </Card>
    )




}

export default Note;