import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/Home.jsx'));
const AboutUs = lazy(() => import('./pages/AboutUs.jsx'));
const Layout = lazy(() => import('./Layout.jsx'));
const BookDetail = lazy(() => import('./pages/BookDetail.jsx'));
const SearchBook = lazy(() => import('./pages/SearchBook/SearchBook.jsx'));
const SearchResult = lazy(() => import('./pages/SearchResult/SearchResult.jsx'));
const Catalog = lazy(() => import('./pages/Catalog.jsx'));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </Router>
    </>
  )
}

export default App