import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import CardDeck from '../../components/CardDeck/CardDeck.jsx';
import styles from './SearchResult.module.css'
import NoResultSearch from '../../components/NoResultSearch.jsx';

/**
 * Сторінка результатів пошуку
 * @returns {JSX.Element}
 */
function SearchResult() {

  const location = useLocation();
  const [books, setBooks] = useState([]); // книги
  const [sortOrder, setSortOrder] = useState(null); // тип сортування
  const [startBook, setStartBook] = useState([]); // не відсортовані книги

  const apiUrl = import.meta.env.VITE_URL;

  useEffect(() => {
    // параметри пошуку
    const searchParams = new URLSearchParams(location.search);
    const title = searchParams.get('title');
    const author = searchParams.get('author');
    const category = searchParams.get('category');
    const language = searchParams.get('language');
    const format = searchParams.get('format');
    const startYear = searchParams.get('startYear');
    const endYear = searchParams.get('endYear');
    // запит на отримання записів з БД з відповідними параметрами
    axios.post(apiUrl + '/searchbook', {
      title, author, category, language, format,
      startYear, endYear
    })
      .then(res => { setBooks(res.data); setStartBook(res.data) })
      .catch(err => console.log(err))

  }, [location.search])

  const [currentPage, setCurrentPage] = useState(1); // поточна сторінка
  const booksPerPage = 6; // кількість книжок на сторінці
  const lastIndex = currentPage * booksPerPage; // індекс останньої книги на сторінці
  const firtsIndex = lastIndex - booksPerPage; // індекс першої книги на сторінці
  const groupBooks = books.slice(firtsIndex, lastIndex); // група книжок на сторінці
  const npage = Math.ceil(books.length / booksPerPage); // кількість сторінок 
  const numbers = [...Array(npage + 1).keys()].slice(1); // номери сторінок

  // наступна сторінка
  function nextPage() {
    if (currentPage !== npage)
      setCurrentPage(currentPage + 1)
  }
  // попередня сторінка
  function prevPage() {
    if (currentPage !== 1)
      setCurrentPage(currentPage - 1)
  }
  // зміна поточної сторінки
  function changeCurrentPage(id) {
    setCurrentPage(id)
  }

  // Функції для сортування
  // функція сортування за зростанням
  function sortBooksAsc() {
    const sortedBooks = [...books].sort((a, b) => a.title.localeCompare(b.title));
    setBooks(sortedBooks);
    setSortOrder('asc');
  };

  // функція сортування за спаданням
  function sortBooksDesc() {
    const sortedBooks = [...books].sort((a, b) => b.title.localeCompare(a.title));
    setBooks(sortedBooks);
    setSortOrder('desc');
  };

  // функція сортування книг
  function sortBook(val) {
    if (val === 'asc') {
      sortBooksAsc();
    } else if (val === 'desc') {
      sortBooksDesc();
    } else if (val === 'def') {
      setBooks(startBook);
      setSortOrder(null);
    }
  }

  return (
    <div>
      {
        books.length > 0 ? (
          <>
            <div className='container'>
              <h4 className='d-flex justify-content-center mt-3'>Результати пошуку</h4>
              <div className="row">
                <div className="d-flex justify-content-between">
                  <p className='text-secondary ms-5'>Кількість книг: {books.length}</p>
                  <div className="col-sm-2">
                    <select className="form-select border-0" id={styles.sortType} onChange={(e) => sortBook(e.target.value)}>
                      <option value="def">Не сортувати</option>
                      <option value="asc">За зростанням</option>
                      <option value="desc">За спаданням</option>
                    </select>
                  </div>
                </div>
                <CardDeck books={groupBooks} />
                <ul className="mt-1 pagination justify-content-center">
                  <li className="page-item">
                    <a className="page-link" href="#" onClick={prevPage}>Previous</a>
                  </li>
                  {
                    numbers.map((n, i) => (
                      <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                        <a className="page-link" href={`#search-page${n}`} onClick={() => changeCurrentPage(n)}>{n}</a>
                      </li>
                    ))
                  }
                  <li className="page-item">
                    <a className="page-link" href="#" onClick={nextPage}>Next</a>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (<NoResultSearch />)
      }
    </div>
  )
}

export default SearchResult