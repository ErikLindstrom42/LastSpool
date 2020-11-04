import React, { useContext, useState } from "react";
import { Button, Form, FormGroup, Label, Input, Card, CardBody } from "reactstrap";
import { useHistory, useParams, Link } from "react-router-dom"
import { NoteContext } from "../../providers/NoteProvider";
import "./Note.css"


const NoteForm = () => {

    const { addNote, getNotesByJobId } = useContext(NoteContext);
    const user = JSON.parse(sessionStorage.getItem("userProfile")).id

    const [content, setContent] = useState("");
    const [createDateTime, setCreateDateTime] = useState("");
    const { jobId } = useParams();
    const history = useHistory();
    const submit = (evt) => {
        const newNote = {
            jobId,
            content,
            createDateTime
        };
        const date = new Date();
        const HumanPublishDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        newNote.createDateTime = date;
        newNote.jobId = parseInt(jobId);
        document.getElementById("myForm").reset();

        addNote(newNote).then((evt) => {
            getNotesByJobId(jobId)

        });
    };

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6" >
                    <CardBody>
                        <Form id="myForm">
                            <FormGroup>
                                <Input type="hidden"
                                    id="jobId"
                                    value={jobId}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="content">Add a Note</Label>
                                <Input
                                    className="contentTextArea"
                                    type="textarea"
                                    rows="4"
                                    id="content"
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </FormGroup>

                        </Form>
                        <Button color="info" onClick={submit} className="noteButton">
                            Submit
                        </Button>

                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
export default NoteForm;