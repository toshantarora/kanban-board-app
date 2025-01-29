import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { Suspense } from "react";
import Routers from "./router";

function App() {
  return (
    <Router>
      <Suspense fallback={<p>...Loading</p>}>
        <ErrorBoundary>
          <Routers />
        </ErrorBoundary>
      </Suspense>
    </Router>
  );
}

export default App;
