import "./Job.css"
import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom"
import { Button, Card, CardBody, Form, FormGroup, Label, Input } from "reactstrap";
import { JobContext } from "../../providers/JobProvider";

const JobEditForm = () => {

    const currentUserId = JSON.parse(sessionStorage.getItem('userProfile')).id
    const { printerId, jobId } = useParams();
    const { editJob, getJobById } = useContext(JobContext);
    const history = useHistory();
    const user = JSON.parse(sessionStorage.getItem("userProfile")).id
    const [image, setImage] = useState();
    const [fileName, setFileName] = useState();
    const [statusDateTime, setStatusDateTime] = useState();
    const [completeDateTime, setCompleteDateTime] = useState();
    const [deviceIdentifier, setDeviceIdentifier] = useState();
    const [filamentLength, setFilamentLength] = useState();
    const [job, setJob] = useState({
        id: "", printerId: "", deviceIdentifier: "", percentDone: 100, timeLeft: 0, statusMessage: "Your print is done.",
        printLength: 0, completeDateTime: "", fileName: "", image: "", statusDateTime: "", filamentLength: ""
    });

    useEffect(() => {
        getJobById(jobId).then(setJob);
    }, [])
    console.log(job.filamentLength)
    const handleFieldChange = evt => {

        const stateToChange = { ...job }
        stateToChange[evt.target.id] = evt.target.value
        setJob(stateToChange)

    }

    const submit = (e) => {
        e.preventDefault();
        const editedJob = {
            id: job.id,
            printerId: job.printerId,
            deviceIdentifier: job.deviceIdentifier,
            percentDone: 100,
            timeLeft: 0,
            statusMessage: "Your print is done.",
            printLength: 0,
            completeDateTime: job.completeDateTime,
            fileName: job.fileName,
            image: job.image,
            statusDateTime: job.statusDateTime,
            filamentLength: parseInt(job.filamentLength)
        }
        editJob(editedJob).then((evt) => history.push(`/printers/${printerId}/jobs/${jobId}/details`))

    }

    if (!job) return null;
    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>

                                <Label for="printerId">Edit Job</Label>
                                {/* <Input type="hidden"
                                    id="printerId"
                                    value={job.printerId}

                                /> */}
                            </FormGroup>
                            <FormGroup>
                                <Label for="fileName">Name</Label>
                                <Input id="fileName" defaultValue={job.fileName} onChange={handleFieldChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="completeDateTime">Completed On</Label>
                                <Input type="datetime" id="completeDateTime" defaultValue={job.completeDateTime} onChange={handleFieldChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="filamentLength">Filament Length (mm)</Label>
                                <Input id="filamentLength" defaultValue={job.filamentLength} onChange={handleFieldChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="image">Image</Label>
                                <Input id="image" defaultValue={job.image} onChange={handleFieldChange} />
                            </FormGroup>
                            {/* <FormGroup>
                                <Label for="deviceIdentifier">Device Identifier</Label>
                                <Input id="deviceIdentifier" onChange={(e) => setFileName(e.target.value)} />
                            </FormGroup> */}
                        </Form>
                        <Button color="info" onClick={submit} className="commentButton">
                            Submit
              </Button>
                        <Link to={`/printers/${printerId}`}>
                            <Button color="secondary" className="commentButton">Back</Button>
                        </Link>
                    </CardBody>
                </Card>
            </div>
        </div>
    )



}

export default JobEditForm;