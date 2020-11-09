import "./Job.css"
import React, { useContext, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom"
import { Button, Card, CardBody, Form, FormGroup, Label, Input } from "reactstrap";
import { JobContext } from "../../providers/JobProvider";

const JobForm = () => {

    
    const { printerId } = useParams();
    const { addJob } = useContext(JobContext);
    const history = useHistory();

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState();
    const [job, setJob] = useState({
        printerId: "", deviceIdentifier: "", percentDone: 100, timeLeft: 0, statusMessage: "Your print is done.",
        printLength: 0, completeDateTime: "", fileName: "", image: "", statusDateTime: "", filamentLength: ""
    });

    const checkUploadResult = (resultEvent) => {
        if (resultEvent.event === 'success') {

            job.image = resultEvent.info.secure_url
        }
    }

    //Cloudinary non-widget
    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'lastrollpre')
        setLoading(true)
        const res = await fetch(
            '	https://api.cloudinary.com/v1_1/dfpncq7pk/image/upload',
            {
                method: 'POST',
                body: data
            }
        )

        const file = await res.json()

        setImage(file.secure_url)
        setLoading(false)
        job.image = file.secure_url
    }

    const handleFieldChange = evt => {

        const stateToChange = { ...job }
        stateToChange[evt.target.id] = evt.target.value
        setJob(stateToChange)

    }

    const submit = (e) => {
        e.preventDefault();
        const newJob = {
            id: job.id,
            printerId: parseInt(printerId),
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
        newJob.statusDateTime = newJob.completeDateTime
        addJob(newJob).then((evt) => history.push(`/printers/${printerId}/jobs/`))

    }


    return (
        <>
            <div className="container pt-4">
                <div className="row justify-content-center">
                    <Card className="col-sm-12 col-lg-6">
                        <CardBody>
                            <Form>

                                <FormGroup>

                                    <Label for="printerId">New Job</Label>
                                    {/* <Input type="hidden"
                                    id="printerId"
                                    value={job.printerId}

                                /> */}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="fileName">Name</Label>
                                    <Input id="fileName" onChange={handleFieldChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="completeDateTime">Completed On</Label>
                                    <Input type="datetime" id="completeDateTime" onChange={handleFieldChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="filamentLength">Filament Length (mm)</Label>
                                    <Input id="filamentLength" onChange={handleFieldChange} />
                                </FormGroup>
                                <FormGroup>
                                    <div className="cloudinaryUpload">
                                        <h5>Upload Image</h5>
                                        <input type="file"
                                            name="file"
                                            id="image"
                                            placeholder="Upload an image"
                                            onChange={uploadImage}
                                        />
                                        {loading ? (<h3>Loading...</h3>) :
                                            (<img src={image} style={{ width: '300px' }} alt="Cloudinary Upload" />)}
                                    </div>
                                </FormGroup>

                                {/* <FormGroup>
                                <Label for="deviceIdentifier">Device Identifier</Label>
                                <Input id="deviceIdentifier" onChange={(e) => setFileName(e.target.value)} />
                            </FormGroup> */}
                            </Form>
                            <Button color="info" onClick={submit} className="jobButton">
                                Submit
              </Button>
                            <Link to={`/printers/${printerId}`}>
                                <Button color="secondary" className="jobButton">Back</Button>
                            </Link>
                        </CardBody>

                    </Card>
                </div>
            </div>
        </>
    )



}

export default JobForm;