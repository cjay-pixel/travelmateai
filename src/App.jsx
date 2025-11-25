import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import HomePage from "./pages/Homepage";

function App() {
  return (
    <>
      <ScrollToTopButton />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
