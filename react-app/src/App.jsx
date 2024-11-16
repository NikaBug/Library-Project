import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home.jsx";
import AboutUs from './pages/AboutUs.jsx';
import Layout from './Layout.jsx';
import BookDetail from './pages/BookDetail.jsx';
import SearchBook from './pages/SearchBook/SearchBook.jsx';
import SearchResult from './pages/SearchResult/SearchResult.jsx';
import Catalog from './pages/Catalog.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Home />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/searchbook" element={<SearchBook />} />
            <Route path="/searchresult" element={<SearchResult />} />
            <Route path="/bookdetail/:idEdition" element={<BookDetail />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App