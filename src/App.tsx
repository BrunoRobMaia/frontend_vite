import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./routes/route";
import { AuthProvider } from "./hooks/authHook";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <RoutesComponent />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
