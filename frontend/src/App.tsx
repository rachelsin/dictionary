import './App.css';
import CreateEntryForm from './components/CreateEntryForm';
import TranslationPage from './components/TranslationPage';
import { Col, Row } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Row className='hight-100vh'>
        <Col md="12" lg={7} className='bg-body-tertiary'> <TranslationPage /></Col>
        <Col md="12" lg={5} className='bg-dark text-white'><CreateEntryForm /></Col>
      </Row>
    </>
  );
}

export default App;
