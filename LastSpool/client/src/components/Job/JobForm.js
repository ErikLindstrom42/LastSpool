import "./Job.css"
import React, { useContext, useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom"
import { Button, Card, CardBody, Form, FormGroup, Label, Input } from "reactstrap";
import { JobContext } from "../../providers/JobProvider";
import { PrinterContext } from "../../providers/PrinterProvider";
import Job from "./Job";

const JobForm = () => {

    const currentUserId = JSON.parse(sessionStorage.getItem('userProfile')).id
    const { printerId } = useParams();
    const history = useHistory();
    const { jobs, addJob } = useContext(JobContext);
    const { printers, getPrintersByUserProfileId} = useContext(PrinterContext)
    const user = JSON.parse(sessionStorage.getItem("userProfile")).id
    const [image, setImage] = useState();
    const [fileName, setFileName] = useState();
    const [statusTime, setStatusTime] = useState();
    const [completeDateTime, setCompleteDateTime] = useState();
    const [deviceIdentifier, setDeviceIdentifier] = useState();
    const [filamentLength, setFilamentLength] = useState();

    console.log(printerId)
    const submit = (e) => {
        e.preventDefault();
        const newJob = {
            printerId: printerId,
            percentDone: 100,
            timeLeft: 0,
            statusMessage: "Your print is done.",
            printLength: 0,
            completeDateTime,
            deviceIdentifier,
            fileName,
            image,
            statusTime,
            filamentLength
        }
        newJob.statusTime = completeDateTime;
        const mappedJob = {
            printerId: parseInt(newJob.printerId),
            percentDone: newJob.percentDone,
            timeLeft: newJob.timeLeft,
            statusMessage: newJob.statusMessage,
            filamentLength: parseInt(newJob.filamentLength)

        }
        

        addJob(mappedJob).then((evt) => history.pushState(`/printers/${printerId}`))

    }


    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="printerId">New Job</Label>
                                <Input type="hidden"
                                    id="printerId"
                                    value={printerId}

                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="fileName">Name</Label>
                                <Input id="fileName" onChange={(e) => setFileName(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="completeDateTime">Completed On</Label>
                                <Input type="date" id="completeDateTime" onChange={(e) => setCompleteDateTime(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="image">Image</Label>
                                <Input id="image" onChange={(e) => setImage(e.target.value)} />
                                <Label for="filamentLength">Filament Used (mm)</Label>
                                <Input id="filamentLength" onChange={(e) => setFilamentLength(e.target.value)} />
                            </FormGroup>
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

export default JobForm;