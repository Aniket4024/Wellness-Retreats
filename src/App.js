import "./CSS/Root.css";
import './App.css';
import NavBar from './Components/NavBar';
import Hero from "./Components/Hero";
import Services from "./Components/Services";
import CopyRightTag from "./Components/CopyRightTag";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Hero/>
      <Services/>
      <CopyRightTag/>
    </div>
  );
}

export default App;
