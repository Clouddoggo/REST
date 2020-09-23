import React from 'react';
import './App.css';
import AddContact from './components/AddContact';
import GetContacts from './components/GetContacts';
import DeleteContact from './components/DeleteContact';
import UpdateContact from './components/UpdateContact';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        CS3219 Task B
      </header>
      <AddContact />
      <GetContacts />
      <UpdateContact />
      <DeleteContact />
    </div>
  );
}

export default App;
