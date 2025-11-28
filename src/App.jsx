import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import HomePage from "./pages/Homepage";
import ProfilePage from "./pages/ProfilePage";
import RecommendationsPage from "./pages/RecommendationsPage";
import ItineraryBuilderPage from "./pages/ItineraryBuilderPage";
import DestinationDetailPage from "./pages/DestinationDetailPage";
import SearchResultsPage from "./pages/SearchResultsPage";

function App() {
  return (
    <>
      <ScrollToTopButton />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/recommendations' element={<RecommendationsPage />} />
          <Route path='/itinerary-builder' element={<ItineraryBuilderPage />} />
          <Route path='/destination/:id' element={<DestinationDetailPage />} />
          <Route path='/search' element={<SearchResultsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
