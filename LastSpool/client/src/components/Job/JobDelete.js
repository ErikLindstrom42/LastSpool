import React, { useContext, useState, useEffect } from "react";
import {useHistory, useParams, Link} from 'react-router-dom';
import { JobContext } from "../../providers/JobProvider";
import { Button } from "reactstrap";
import "./Job.css"



const JobDelete = () => {
    const [job, setJob] = useState();
    const { getJobById, deleteJob } = useContext(JobContext);
    const { printerId, jobId } = useParams();
    const history = useHistory();

    useEffect(() => {
        getJobById(jobId).then(setJob);
    }, []);

    const handleDelete = (id) => {
        deleteJob(job.id)
            .then(() => history.push(`/printers/${printerId}/jobs/`))
    }

    if (!job) return null;
    const publishDate = new Date(job.completeDateTime)
        const HumanPublishDate = `${publishDate.getMonth() + 1}/${publishDate.getDate()}/${publishDate.getFullYear()}`

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-12 col-lg-6">
                    <h3>Are you sure you want to delete this job?</h3>
                    <div>Job Name: {job.fileName}</div>             
                    <div>Completed on: {HumanPublishDate}</div>
                    
                    <Button onClick={handleDelete} color="danger" className="jobButton">Delete</Button>
                    <Link to={`/printers/${printerId}/jobs/${jobId}/details`}>
                        <Button color="secondary" className="jobButton">Back</Button>
                    </Link>

                </div>
            </div>
        </div>
    )
}
export default JobDelete;


