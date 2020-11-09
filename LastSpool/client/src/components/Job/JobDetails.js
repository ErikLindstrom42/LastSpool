import "./Job.css"
import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom"
import { Button, Card, CardBody } from "reactstrap";
import { JobContext } from "../../providers/JobProvider"
import NoteList from "../Note/NoteList";
import DayJS from 'react-dayjs';


const JobDetails = () => {
    
    const currentUserId = JSON.parse(sessionStorage.getItem('userProfile')).id
    const { printerId, jobId } = useParams();
    
    const { getJobById } = useContext(JobContext)
    const [job, setJob] = useState();
    
    useEffect(() => {
        getJobById(jobId).then(setJob);
    }, []);
    
    if (!job) return null
    let minutesLeft = Math.floor(job.timeLeft / 60)


    return (
    <>
        <Card className="d-flex align-items-center w">
            <div className="jobCard d-flex align-items-center">
                <CardBody className=" d-flex flex-column align-items-center">
                    <div><img src={job.image} alt="job image" className="jobDetailImage"/></div>
                    <strong>{job.fileName}</strong>
                    

                    <div>{job.name}</div>
                    <div>Total filament use: {Math.round(job.filamentLength/1000)} meters</div>
                    {(job.percentDone==100) ? <div className="mb-3">Completed on: <DayJS format="MMM, D h:mm A">{job.completeDateTime}</DayJS></div> : <div>{job.percentDone}% complete</div>}
                    {(job.percentDone!=100) ? <div className="mb-3">Estimated {minutesLeft} minutes left</div>:null}
                    <div className="d-flex justify-content">

                    <Link to={`/printers/${printerId}`}>
                        <Button>Back</Button>
                    </Link>

                    {(currentUserId === job.printer.userProfileId) && (jobId) ?
                        <Link to={`/printers/${printerId}/jobs/${job.id}/delete`}>
                            <Button color="danger" className="jobButton ml-2 ">Delete</Button>
                        </Link>
                        : <div></div>}

                    {(currentUserId === job.printer.userProfileId) ?
                        <Link to={`/printers/${printerId}/jobs/${job.id}/edit`}>
                            <Button className="jobButton ml-2">Edit</Button>
                        </Link>
                        : <div></div>}
                        </div>
                </CardBody>
                </div>
        </Card>
        <NoteList />
        </>
    )
}

export default JobDetails;