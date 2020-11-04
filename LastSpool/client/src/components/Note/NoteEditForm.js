import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, Card, CardBody } from "reactstrap";
import { useHistory, useParams, Link } from "react-router-dom"
import { NoteContext } from "../../providers/NoteProvider";
import "./Note.css"


const NoteForm = () => {

    const { editNote, getNoteById } = useContext(NoteContext);
    const user = JSON.parse(sessionStorage.getItem("userProfile")).id

    const [content, setContent] = useState("");
    const [createDateTime, setCreateDateTime] = useState("");
    const { jobId, noteId, printerId } = useParams();
    const [note, setNote] =useState({id:"", jobId:"", content:"", createDateTime:""})
    const history = useHistory();


    useEffect(() => {
        getNoteById(noteId).then(setNote)

    },[]);
    const handleFieldChange = evt => {
        const stateToChange = { ...note }
        stateToChange[evt.target.id] = evt.target.value;
        setNote(stateToChange);
    }

    const submit = (evt) => {
        evt.preventDefault();
        const editedNote = {
            id:note.id,
            jobId:note.jobId,
            content,
            createDateTime:note.createDateTime
        };
        const date = new Date();
        const HumanPublishDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        
        
        editedNote.content = note.content;

        editNote(editedNote).then((evt) => history.push(`/printers/${printerId}/jobs/${jobId}/details`))

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
                                <Label for="content">Edit Note</Label>
                                <Input
                                    className="contentTextArea"
                                    type="textarea"
                                    rows="4"
                                    id="content"
                                    defaultValue={note.content}
                                    onChange={handleFieldChange}
                                    
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