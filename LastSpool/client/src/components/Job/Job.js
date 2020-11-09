import "./Job.css"
import React from "react";
import { Link, useParams } from "react-router-dom"
import { Button, Card} from "reactstrap";

const Job = ({ job }) => {

    const currentUserId = JSON.parse(sessionStorage.getItem('userProfile')).id
    const { printerId, jobId } = useParams();
    let minutesLeft = Math.floor(job.timeLeft / 60)
    let statusMessage = `Printing. The job is ${job.percentDone}% complete with an estimated ${minutesLeft} minutes remaining`

    return (
        <Card className="card mx-3 jobBox d-flex flex-column align-items-center ">

            <strong className="my-3">{job.fileName}</strong>
            <div>
                <img src={job.image} alt="job" className="jobImage" />
            </div>
            <div>{job.printer.name}</div>
            {(job.timeLeft > 0) ? statusMessage : null}

            <div className="mt-auto p-2 d-flex justify-content-center">
    


                <Link to={`/printers/${printerId}/jobs/${job.id}/details`}>
                    <Button>Details</Button>
                </Link>
                {/* {(currentUserId === job.printer.userProfileId) && (jobId) ?
                    <Link to={`/printers/${printerId}/jobs/${job.id}/delete`}>
                        <Button color="danger" className="jobButton">Delete</Button>
                    </Link>
                    : null}

                {(currentUserId === job.printer.userProfileId && (jobId)) ?
                    <Link to={`/printers/${printerId}/jobs/${job.id}/edit`}>
                        <Button className="jobButton">Edit</Button>
                    </Link>
                    : null} */}

            </div>

        </Card>
    )




}

export default Job;