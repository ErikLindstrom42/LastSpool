import "./Printer.css"
import React, { useContext, useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom"
import {Button, Card, CardBody} from "reactstrap";
import { JobContext } from "../../providers/JobProvider";
const Printer = ({ printer }) => {

    const currentUserId = JSON.parse(sessionStorage.getItem('userProfile')).id
    const {printerId} = useParams();
    //    const [job, setJob] = useState();    
    // const { getLastJobByPrinterId, job } = useContext(JobContext);
    // useState(() => {
    //     getLastJobByPrinterId(printer.id);

    // }, []);


    return (
        <Card style={{ border: "none" }}>
        <div className="printerCard">
            <CardBody>
                <div>{printer.name} </div>
                {/* <div>Status: {job.percentDone}</div> */}
                <div>{printer.deviceIdentifier}</div>

                
                
                <div className="printerTextArea">{printer.description}</div>
                <p><Link to={`printers/${printer.id}/`}>More</Link></p>

                {/* <div>
                    {(currentUserId === printer.userProfileId) ?
                        <Link to={`/posts/${postId}/printers/${printer.id}/delete`}>
                            <Button color="danger" className="printerButton">Delete</Button>
                        </Link>
                        : <div></div>}

                    {(currentUser === printer.userProfileId) ?
                        <Link to={`/posts/${postId}/printers/${printer.id}/edit`}>
                            <Button className="printerButton">Edit</Button>
                        </Link>
                        : <div></div>}
                </div> */}
            </CardBody>
        </div>
    </Card>
)
    

}

export default Printer;