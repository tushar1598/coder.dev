import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/router";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
