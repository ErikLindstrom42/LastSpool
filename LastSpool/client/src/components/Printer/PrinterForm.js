import React, { useContext, useState } from "react";
import { Button, Form, FormGroup, Label, Input, Card, CardBody } from "reactstrap";
import { useHistory, Link } from "react-router-dom"
import { PrinterContext } from "../../providers/PrinterProvider";
import "./Printer.css"


const PrinterForm = () => {

    const { addPrinter } = useContext(PrinterContext);
    const user = JSON.parse(sessionStorage.getItem("userProfile")).id
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [deviceIdentifier, setDeviceIdentifier] = useState("");
    const history = useHistory();
    const submit = (evt) => {
        
        const printer = {
            userProfileId: "",
            name,
            description,
            deviceIdentifier
        };
        printer.userProfileId = user


        addPrinter(printer).then((evt) => {
            history.push(`/`);
        });
    };

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>

                            <FormGroup>
                                <Label for="userProfileId">New Printer</Label>
                                <Input type="hidden"
                                    id="userProfileId"
                                    value = {user}
                                    
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input id="name" onChange={(e) => setName(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input
                                    className="descriptionTextArea"
                                    type="textarea"
                                    rows="4"
                                    id="description"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="deviceIdentifier">Device Identifier</Label>
                                <Input id="deviceIdentifier" onChange={(e) => setDeviceIdentifier(e.target.value)} />
                            </FormGroup>
                            {/* <FormGroup>
                                <select
                                onChange={(e) => setDeviceIdentifier(e.target.value)} 
                                id="deviceIdentifier"/>
                            </FormGroup> */}
                            
                        </Form>
                        <Button color="info" onClick={submit} className="commentButton">
                            Submit
              </Button>
              <Link to={`/`}>
                        <Button color="secondary" className="commentButton">Back</Button>
                    </Link>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
export default PrinterForm;