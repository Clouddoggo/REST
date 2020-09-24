import React from 'react';
import './App.css';
import AddBook from './components/AddBook';
import GetBooks from './components/GetBooks';
import DeleteBook from './components/DeleteBook';
import UpdateBook from './components/UpdateBook';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to CS3219 Task B's deployment site</h1>
        <h3>Perform API calls below</h3>
      </header>
      <AddBook />
      <GetBooks />
      <UpdateBook />
      <DeleteBook />
    </div>
  );
}

export default App;
