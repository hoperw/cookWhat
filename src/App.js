import './App.css';
import Navbar from './components/Navbar';
import Form from './components/Form'
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Form />
      </main>
      <Footer />
    </div>
  );
}

export default App;
