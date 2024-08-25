import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Start } from "./components/Start";
import { Route, Routes } from "react-router";
import { Home } from "./components/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/play" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
