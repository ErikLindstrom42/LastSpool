import "./Job.css"
import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom"
import { Button, Card, CardBody } from "reactstrap";
import { JobContext } from "../../providers/JobProvider"
import NoteList from "../Note/NoteList";


const JobDetails = () => {

    const currentUserId = JSON.parse(sessionStorage.getItem('userProfile')).id
    const { printerId, jobId } = useParams();

    const { getJobById, job } = useContext(JobContext)
    
    useEffect(() => {
        getJobById(jobId);
    }, []);

    if(job.printer=== undefined) return null;

    return (
    <>
        <Card style={{ border: "none" }}>
            <div className="jobCard">
                <CardBody>
                    <strong>{job.fileName}</strong>
                    <div>{job.filamentLength}</div>
                    <img src={job.image} alt="job image" />
                    <div>{job.name}</div>
                    {/* <p><Link to={`/printers/${printerId}/jobs/${job.id}`}>More</Link></p> */}
                    <p><Link to={`/printers/${printerId}`}>
                        <Button>Back</Button>
                    </Link></p>

                    {(currentUserId === job.printer.userProfileId) && (jobId) ?
                        <Link to={`/printers/${printerId}/jobs/${job.id}/delete`}>
                            <Button color="danger" className="jobButton">Delete</Button>
                        </Link>
                        : <div></div>}

                    {(currentUserId === job.printer.userProfileId) ?
                        <Link to={`/printers/${printerId}/jobs/${job.id}/edit`}>
                            <Button className="jobButton">Edit</Button>
                        </Link>
                        : <div></div>}
                </CardBody>
            </div>
        </Card>
        <NoteList />
        </>
    )
}

export default JobDetails;