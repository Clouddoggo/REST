import React from 'react';
import './App.css';
import AddBook from './components/AddBook';
import GetBooks from './components/GetBooks';
import DeleteBook from './components/DeleteBook';
import UpdateBook from './components/UpdateBook';
import GetBook from './components/GetBook';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to CS3219 Task B's deployment site</h1>
        <h3>Perform API calls below</h3>
      </header>
      <GetBooks />
      <AddBook />
      <GetBook />
      <UpdateBook />
      <DeleteBook />
    </div>
  );
}

export default App;
