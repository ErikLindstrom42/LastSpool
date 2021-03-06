import React, { useContext, useEffect } from "react";
import { JobContext } from "../../providers/JobProvider";
import Job from "./Job";
import { useParams, useHistory, Link } from 'react-router-dom';



const JobList = () => {
    const { jobs, getJobsByPrinterId } = useContext(JobContext);
    const { printerId } = useParams();
    useEffect(() => {
        getJobsByPrinterId(printerId);
    }, []);


    return (
        <>
            <p><Link to={`/printers/${printerId}/jobs/new`}>New Job</Link></p>
            

                <div className="d-flex justify-content-center flex-wrap">
                    {jobs.map((job) =>
                        <Job key={job.id} job={job}
                        />

                    )}
                </div>

        
        </>
    )
}

export default JobList;