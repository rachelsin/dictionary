import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateEntryForm from './components/CreateEntryForm';
import TranslationPage from './components/TranslationPage';
import { Col,Row } from 'react-bootstrap';

function App() {
  return (
    <>
<Row>
        <Col><CreateEntryForm /></Col>
        <Col> <TranslationPage /></Col>
</Row>
    <div className="App">
      
      <br />
     
      </div>
    </>

  );
}

export default App;
