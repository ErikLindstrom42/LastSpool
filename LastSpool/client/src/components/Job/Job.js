import "./Job.css"
import React, { useContext, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom"
import { Button, Card, CardBody } from "reactstrap";

const Job = ({ job }) => {

    const currentUserId = JSON.parse(sessionStorage.getItem('userProfile')).id
    const { printerId, jobId } = useParams();
    let minutesLeft = Math.floor(job.timeLeft / 60)
    let statusMessage = `Printing. The job is ${job.percentDone}% complete with an estimated ${minutesLeft} minutes remaining`

    return (
        <Card className="card m-5  jobBox d-flex flex-column align-items-center">

            <strong>{job.fileName}</strong>
            <div>
                <img src={job.image} alt="job image" className="jobImage" />
            </div>
            <div>{job.printer.name}</div>
            {(job.timeLeft > 0) ? statusMessage : null}

            <div className="mt-auto p-2 d-flex justify-content-center">
    


                <Link to={`/printers/${printerId}/jobs/${job.id}/details`}>
                    <Button>Details</Button>
                </Link>
                {(currentUserId === job.printer.userProfileId) && (jobId) ?
                    <Link to={`/printers/${printerId}/jobs/${job.id}/delete`}>
                        <Button color="danger" className="jobButton">Delete</Button>
                    </Link>
                    : null}

                {(currentUserId === job.printer.userProfileId && (jobId)) ?
                    <Link to={`/printers/${printerId}/jobs/${job.id}/edit`}>
                        <Button className="jobButton">Edit</Button>
                    </Link>
                    : null}

            </div>

        </Card>
    )




}

export default Job;