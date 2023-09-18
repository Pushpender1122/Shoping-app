import Lpage from "./component/Login/lpage";
import Homepage from "./component/home/hpage";
import Spage from "./component/signup/spage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/user/signup" element={<Spage />} />
          <Route exact path="/user/login" element={<Lpage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
