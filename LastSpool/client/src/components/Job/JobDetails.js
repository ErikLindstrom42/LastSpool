import "./Job.css"
import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom"
import { Button, Card, CardBody } from "reactstrap";
import { JobContext } from "../../providers/JobProvider"
import NoteList from "../Note/NoteList";


const JobDetails = () => {

    const currentUserId = JSON.parse(sessionStorage.getItem('userProfile')).id
    const { printerId, jobId } = useParams();

    const { getJobById } = useContext(JobContext)
    const [job, setJob] = useState();
    
    useEffect(() => {
        getJobById(jobId).then(setJob);
    }, []);

    if (!job) return null


    return (
    <>
        <Card style={{ border: "none" }}>
            <div className="jobCard">
                <CardBody>
                    <strong>{job.fileName}</strong>
                    <div>{job.filamentLength}</div>
                    <img src={job.image} alt="job image" />
                    <div>{job.name}</div>
                    <div>Completed on: {job.completeDateTime}</div>

                    <Link to={`/printers/${printerId}`}>
                        <Button>Back</Button>
                    </Link>

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