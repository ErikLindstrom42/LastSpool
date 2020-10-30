import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PrinterContext = React.createContext();

export const PrinterProvider = (props) => {
    const [printers, setPrinters] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const apiUrl = "/api/printer";

    const getPrintersByUserProfileId = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/getprintersbyuserprofileid/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            }).then(resp => resp.json())
                .then(setPrinters));

    const addPrinter = (printer) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(printer)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));






    return (
        <PrinterContext.Provider value={{ printers, getPrintersByUserProfileId, addPrinter }}>
            {props.children}
        </PrinterContext.Provider>
    );
}

//, deletePrinter, editPrinter, getPrinterById