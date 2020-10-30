import React, { useContext, useEffect, useState, useRef } from "react";
import { PrinterContext } from "../../providers/PrinterProvider";
import { useHistory, Link } from "react-router-dom";
import Printer from "./Printer"


import {
    Button, Table
} from "reactstrap";
import "./Printer.css"

const PrinterList = () => {
    const { printers, getPrintersByUserProfileId } = useContext(PrinterContext);
    const history = useHistory();
    const userId = JSON.parse(sessionStorage.getItem("userProfile")).id
    useEffect(() => {
        getPrintersByUserProfileId(userId);
    
    }, []);

    return (
        <>
            <p><Link to={`printers/new`}>New Printer</Link></p>
            
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">
                        {printers.map((printer) => 
                            <Printer key={printer.id} printer={printer} 
                            />

                        )}
                    </div>
                </div>
            </div>
        </>
    )



    // return (
    //     <>
    //     <div className="recommended_Posts_Div">
            
        
    //     </div>
    //     <div className="container">
    //         <div className="row justify-content-left">
    //             <Button color="danger"
    //                 onClick={() => { history.push(`/postForm/`) }}>
    //                 add post
    //                 </Button>
    //             <Table>

    //                 <thead>
    //                     <tr>
    //                         <th>Title</th>
    //                         <th>Author</th>
    //                         <th>Category</th>
    //                     </tr>
    //                 </thead>

    //                 {posts.map((post) => (
    //                     <tbody key={post.id}>
    //                         <tr>
    //                             <th scope="row">
    //                                 <Link to={`/posts/${post.id}`}>
    //                                     {post.title}
    //                                 </Link>
    //                             </th>
    //                             <td>
    //                                     {post.userProfile.firstName} {post.userProfile.lastName}
    //                             </td>
    //                             <td>{post.category.name}</td>
    //                         </tr>
    //                     </tbody>
    //                 ))}
    //             </Table>
    //         </div>
    //     </div>
    //     </>
    // );
};

export default PrinterList;