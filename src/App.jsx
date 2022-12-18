import './App.css';
import 'bootstrap/dist/js/bootstrap';
import Navbar from './components/navbar/navbar.component';
import Routes from './Routes';
import PrimeReact from 'primereact/api';

function App() {
  PrimeReact.ripple = true;
  
  return (
    <section className='fullView'>
      <header id='header'>
        <Navbar />
      </header>
      <section id='section'>
        <Routes />
      </section>
      <footer id='footer'>
        footer
      </footer>
    </section>
  );
}

export default App;