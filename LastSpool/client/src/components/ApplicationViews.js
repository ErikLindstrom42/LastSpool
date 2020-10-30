import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import PrinterList from "./Printer/PrinterList";
import PrinterForm from "./Printer/PrinterForm";
// import PrinterEditForm from "./Printer/PrinterEditForm";
// import PrinterDetails from "./Printer/PrinterDetails";
import JobList from "./Job/JobList";
import JobForm from "./Job/JobForm";
import JobDelete from "./Job/JobDelete";
import JobEditForm from "./Job/JobEditForm";
import JobDetails from "./Job/JobDetails";
import NoteList from "./Note/NoteList";
import NoteDelete from "./Note/NoteDelete";






export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);


  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <PrinterList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/printers/:printerId/jobs/new">
          {isLoggedIn ? <JobForm /> : <Redirect to="/login" />}
        </Route>
        <Route path="/printers/:printerId/jobs/:jobId/details">
          {isLoggedIn ? <JobDetails /> : <Redirect to="/login" />}
        </Route>
        <Route path="/printers/:printerId/jobs/:jobId/edit">
          {isLoggedIn ? <JobEditForm /> : <Redirect to="/login" />}
        </Route>
        <Route path="/printers/:printerId/jobs/:jobId/delete">
          {isLoggedIn ? <JobDelete /> : <Redirect to="/login" />}
        </Route>
        <Route path="/printers/:printerId/jobs/new">
          {isLoggedIn ? <JobForm /> : <Redirect to="/login" />}
        </Route>
        <Route path="/printers/:printerId/jobs/:jobId/notes/:noteId/delete">
          {isLoggedIn ? <NoteDelete/> : <Redirect to="/login" />}
        </Route>
        {/* <Route path="/printers/:printerId/jobs/:jobId/notes/:noteId/edit">
          {isLoggedIn ? <NoteEditForm/> : <Redirect to="/login" />}
        </Route> */}
        <Route path="/printers/:printerId/jobs/:jobId/notes">
          {isLoggedIn ? <NoteList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/printers/new">
          {isLoggedIn ? <PrinterForm /> : <Redirect to="/login" />}
        </Route>
        <Route path="/printers/:printerId">
          {isLoggedIn ? <JobList /> : <Redirect to="/login" />}
        </Route>


      </Switch>
    </main>
  );
};
