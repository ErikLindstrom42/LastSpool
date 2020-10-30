import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const JobContext = React.createContext();

export const JobProvider = (props) => {
    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState([])
    const { getToken } = useContext(UserProfileContext);
    const apiUrl = "/api/job";

    const getJobsByPrinterId = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/getjobsbyprinterid/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            }).then(resp => resp.json())
                .then(setJobs));
//
    const getJobById = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            }).then(resp => resp.json())
                .then(setJob));
//
    const addJob = (job) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(job)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));

    const getLastJobByPrinterId = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/getlastprinterjob/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            }).then(resp => resp.json()).then(setJob)
        );

    const editJob = (job) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${job.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(job)
            }));

    const deleteJob = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }));
    // const getJobById = (id) =>
    //     getToken().then((token) =>
    //         fetch(`${apiUrl}/${id}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`

    //             }
    //         }).then((res) => res.json()));




    return (
        <JobContext.Provider value={{ jobs, job, getJobsByPrinterId, addJob, getLastJobByPrinterId, editJob, deleteJob, getJobById }}>
            {props.children}
        </JobContext.Provider>
    );
}

//, getJobById