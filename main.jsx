import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResponsivePage from "./ResponsivePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ResponsivePage />} />
      </Routes>
    </Router>
  );
}

export default App;
