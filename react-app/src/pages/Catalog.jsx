import React, { useState, useEffect } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardDeck from '../components/CardDeck/CardDeck.jsx';
import FilterBooks from '../components/FilterBooks/FilterBooks.jsx';
import Autocomplete from '../components/Autocomplete/Autocomplete.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

/**
 * Сторінка "Каталог"
 * @returns {JSX.Element}
 */
function Catalog() {
    const [allBooks, setAllBooks] = useState([]); // всі книги
    // для функцій фільтрації за відповідних фільтрів
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [selectedFormat, setSelectedFormat] = useState();
    const [selectedPublisher, setSelectedPublisher] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    // тригер для скидання всіх фільтрів
    const [resetFiltersTrigger, setResetFiltersTrigger] = useState(0);

    // для поділу на сторінки
    const [currentPage, setCurrentPage] = useState(1); // поточна сторінка
    const booksPerPage = 12; // кількість книжок на сторінці
    const lastIndex = currentPage * booksPerPage; // індекс останньої книги на сторінці
    const firtsIndex = lastIndex - booksPerPage; // індекс першої книги на сторінці
    const groupBooks = filteredBooks.slice(firtsIndex, lastIndex); // група книжок на сторінці
    const npage = Math.ceil(filteredBooks.length / booksPerPage); // кількість сторінок 
    const numbers = [...Array(npage + 1).keys()].slice(1); // номери сторінок

    // URL-адреса API
    const apiUrl = import.meta.env.VITE_URL;

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

    useEffect(() => {
        axios.get(apiUrl + '/allbooks')
            .then(res => { setAllBooks(res.data); setFilteredBooks(res.data) })
            .catch(err => console.log(err))
    }, [])

    // списки значень відповідних фільтрів
    const listLanguage = [...new Set(allBooks.map((val) => val.language))];
    const listFormat = [...new Set(allBooks.map((val) => val.format))];
    const listPublisher = [...new Set(allBooks.map((val) => val.publisher))];
    const listCategory = [...new Set(allBooks.map((val) => val.category))];

    // застосувати фільтри
    const filterBooks = (language, format, publisher, category) => {
        let newBooks = allBooks;
        if (language) {
            newBooks = newBooks.filter((newval) => newval.language === language);
        }
        if (format) {
            newBooks = newBooks.filter((newval) => newval.format === format);
        }
        if (publisher) {
            newBooks = newBooks.filter((newval) => newval.publisher === publisher);
        }
        if (category) {
            newBooks = newBooks.filter((newval) => newval.category === category);
        }
        setFilteredBooks(newBooks);
    }

    // функції фільтрації
    // фільтрація за мовою
    const filterByLanguage = (language) => {
        setSelectedLanguage(language);
        filterBooks(language, selectedFormat, selectedPublisher, selectedCategory);
    }

    // фільтрація за форматом
    const filterByFormat = (format) => {
        setSelectedFormat(format);
        filterBooks(selectedLanguage, format, selectedPublisher, selectedCategory);
    }

    // фільтрація за видавництвом
    const filterByPublisher = (publisher) => {
        setSelectedPublisher(publisher);
        filterBooks(selectedLanguage, selectedFormat, publisher, selectedCategory);
    }
    // фільтрація за категорією
    const filterByCategory = (category) => {
        setSelectedCategory(category);
        filterBooks(selectedLanguage, selectedFormat, selectedPublisher, category);
    }

    // функції скидання фільтрів
    // скидання фільтру мови
    const resetFilterLanguage = () => {
        setSelectedLanguage(null);
        filterBooks(null, selectedFormat, selectedPublisher, selectedCategory);
    }

    // скидання фільтру формату
    const resetFilterFormat = () => {
        setSelectedFormat(null);
        filterBooks(selectedLanguage, null, selectedPublisher, selectedCategory);
    }
    // скидання фільтру видавництва
    const resetFilterPublisher = () => {
        setSelectedPublisher(null);
        filterBooks(selectedLanguage, selectedFormat, null, selectedCategory);
    }

    // скидання фільтру категорії
    const resetFilterCategory = () => {
        setSelectedCategory(null);
        filterByCategory(selectedLanguage, selectedFormat, selectedPublisher, null)
    }
    // скидання всіх фільтрів
    const handleResetAll = () => {
        setSelectedLanguage(null);
        setSelectedFormat(null);
        setSelectedPublisher(null);
        setSelectedCategory(null);
        setFilteredBooks(allBooks);
        setResetFiltersTrigger(prev => prev + 1);
    }


    return (
        <div className="container mt-1">
            <div className="row">
                <div className="col-sm-3">
                    <h4 className='bg-gradient p-1 rounded text-center' style={{ backgroundColor: "rgb(224, 224, 224)" }}>Фільтри</h4>
                    <label htmlFor="filterLanguage" style={{ color: 'gray' }}>Мова</label>
                    <FilterBooks
                        filters={listLanguage}
                        filterFunction={filterByLanguage}
                        resetFilterFunction={resetFilterLanguage}
                        resetTrigger={resetFiltersTrigger}
                        idFilter={"filterLanguage"}
                    />
                    <div className='mt-2'>
                        <label htmlFor="filterFormat" style={{ color: 'gray' }}>Формат</label>
                        <FilterBooks
                            filters={listFormat}
                            filterFunction={filterByFormat}
                            resetFilterFunction={resetFilterFormat}
                            idFilter={"filterFormat"}
                            resetTrigger={resetFiltersTrigger}
                        />
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="filterCategory" style={{ color: 'gray' }}>Категорія</label>
                        <FilterBooks
                            filters={listCategory}
                            filterFunction={filterByCategory}
                            resetFilterFunction={resetFilterCategory}
                            idFilter={"filterCategory"}
                            resetTrigger={resetFiltersTrigger}
                        />
                    </div>
                    <div className='mt-2'>
                        <Autocomplete options={listPublisher}
                            filterFunction={filterByPublisher}
                            resetFilterFunction={resetFilterPublisher}
                            resetTrigger={resetFiltersTrigger}
                        />
                    </div>

                    <button className='mt-4 btn btn-outline-primary col-sm-12' onClick={() => handleResetAll()}>Скинути все</button>
                </div>
                <div className="col-sm-9 border">
                    {filteredBooks.length > 0 ?
                        (
                            <div>
                                <p style={{ color: 'gray' }}>Кількість книг: {filteredBooks.length}</p>
                                {/* <CardDeck books={filteredBooks} /> */}
                                <CardDeck books={groupBooks} />
                                <ul className="pagination justify-content-center">
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

                        )
                        : (<div className="alert alert-primary d-flex align-items-center" role="alert">
                            <FontAwesomeIcon icon={faCircleInfo} />
                            <div className='ms-1'>
                                Книг із заданими фільтрами не знайдено!
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Catalog