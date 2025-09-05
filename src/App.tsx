import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./routes/route";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <RoutesComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
