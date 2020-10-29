import "./Job.css"
import React, { useContext, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom"
import { Button, Card, CardBody } from "reactstrap";

const Job = ({ job }) => {

    const currentUserId = JSON.parse(sessionStorage.getItem('userProfile')).id
    const { printerId } = useParams();

    return (
        <Card style={{ border: "none" }}>
            <div className="jobCard">
                <CardBody>
                    <strong>{job.fileName}</strong>
                    <div>{job.filamentLength}</div>
                    <img src={job.image} alt="job image"/>
                    <div>{job.printer.name}</div>
                        
                    
                    <p><Link to={`/printers/${printerId}/jobs/${job.id}/notes`}>More</Link></p>
                    <div className="jobTextArea">{job.content}</div>
                    <div>
                    {(currentUserId === job.printer.userProfileId) ?
                        <Link to={`/printers/${printerId}/jobs/${job.id}/delete`}>
                            <Button color="danger" className="jobButton">Delete</Button>
                        </Link>
                        : <div></div>}

                    {(currentUserId === job.printer.userProfileId) ?
                        <Link to={`/printers/${printerId}/jobs/${job.id}/edit`}>
                            <Button className="jobButton">Edit</Button>
                        </Link>
                        : <div></div>}
                </div>
                </CardBody>
            </div>
        </Card>
    )




}

export default Job;