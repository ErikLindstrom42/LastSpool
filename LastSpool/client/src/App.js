import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { PrinterProvider } from "./providers/PrinterProvider"
import { JobProvider } from "./providers/JobProvider"
import { NoteProvider } from './providers/NoteProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <NoteProvider>
        <JobProvider>
          <PrinterProvider>
            <Header />
            <ApplicationViews />
          </PrinterProvider>
        </JobProvider>
        </NoteProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
