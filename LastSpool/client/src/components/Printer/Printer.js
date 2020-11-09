import "./Printer.css"
import React from "react";
import {Link} from "react-router-dom"
import {Card, CardBody, Button} from "reactstrap";

const Printer = ({ printer }) => {


    return (
        <Card className="mb-3">
        <div className="printerCard">
            <CardBody>
                <div>{printer.name} </div>
                {/* <div>Status: {job.percentDone}</div> */}
                <div>{printer.deviceIdentifier}</div>

                <div className="printerTextArea">{printer.description}</div>
                {/* <Button><Link to={`printers/${printer.id}/`}>More</Link></Button> */}
                <Link to={`/printers/${printer.id}`}>
                            <Button className="jobButton ml-2">More</Button>
                        </Link>
            </CardBody>
        </div>
    </Card>
)
    

}

export default Printer;