import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchBook.scss';

/**
 * Сторінка "Пошук"
 * @returns {JSX.Element}
 */
function SearchBook() {
    // url серверної частини
    const apiUrl = import.meta.env.VITE_URL;
    // параметри пошуку
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [language, setLanguage] = useState('');
    const [format, setFormat] = useState('');
    const [applyYears, setApplyYears] = useState(false);
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    // діапазон років видань 
    const [rangeYears, setRangeYears] = useState({ minYear: 0, maxYear: 0 });
    useEffect(() => {
        axios.get(apiUrl + '/rangeyears')
            .then(res => setRangeYears({ minYear: res.data[0].minYear, maxYear: res.data[0].maxYear }))
            .catch(err => console.log(err))
    }, [])

    const handleCheckboxChange = (event) => {
        setApplyYears(event.target.checked);
    };

    const navigate = useNavigate();

    // функція відправки даних форми пошуку
    // на сервер
    const handleSubmit = (e) => {
        e.preventDefault()
        // параметри URL
        const params = new URLSearchParams();
        if (title) {
            params.append('title', title);
        }

        if (author) {
            params.append('author', author);
        }

        if (category) {
            params.append('category', category);
        }

        if (language) {
            params.append('language', language);
        }

        if (format) {
            params.append('format', format);
        }

        if (applyYears) {
            if (startYear && endYear) {
                params.append('startYear', startYear);
                params.append('endYear', endYear);
            }
        }

        axios.post(apiUrl + '/searchbook', params)
            .then(res => navigate(`/searchresult?${params.toString()}`))
            .catch(err => console.log(err))
    }

    return (
        <div className="container mt-3" style={{ width: "40%" }}>
            <form className="form" onSubmit={handleSubmit}>
                <legend>Розширений пошук книг</legend>
                <div className="form-group row"> {/** поля назви та автора */}
                    <label htmlFor="inputTitleBook">Назва книги</label>
                    <div className="col-sm-8">
                        <input type="text" className='form-control' id="inputTitleBook"
                            placeholder='title'
                            maxLength="200"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <label htmlFor="inputAuthorBook">Автор</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="inputAuthorBook"
                            placeholder="author"
                            maxLength="100"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-3 col-sm-8">{/** поля категорії, мови та формату */}
                    <label htmlFor="categorySelect" className="form-label">Категорія</label>
                    <select id="categorySelect" className="form-select"
                        onChange={(e) => setCategory(e.target.value)}>
                        <option value=''>Будь-яка</option>
                        <option value='Художня література'>Художня література</option>
                        <option value='Нехудожня література'>Нехудожня література</option>
                    </select>

                    <label htmlFor="languageSelect" className="form-label mt-1">Мова</label>
                    <select id="languageSelect" className="form-select"
                        onChange={(e) => setLanguage(e.target.value)}>
                        <option value=''>Будь-яка</option>
                        <option value='Українська'>Українська</option>
                        <option value='English'>English</option>
                    </select>

                    <label htmlFor="formatSelect" className="form-label mt-1">Формат</label>
                    <select id="formatSelect" className="form-select"
                        onChange={(e) => setFormat(e.target.value)}>
                        <option value=''>Будь-який</option>
                        <option value='EPUB'>EPUB</option>
                        <option value='FB2'>FB2</option>
                    </select>
                </div>
                <div className='row g-2'> {/** поля діапазону років видання */}
                    <div className="col-auto">
                        <label htmlFor="inputStartYear" className="form-label">з (початок)</label>
                        <input type="number" id="inputStartYear" className="form-control"
                            step='1' min={rangeYears.minYear} max={rangeYears.maxYear}
                            onChange={(e) => setStartYear(e.target.value)}
                        />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="inputEndYear" className="form-label">по (кінець)</label>
                        <input type="number" id="inputEndYear" className="form-control"
                            step='1' min={rangeYears.minYear + 1} max={rangeYears.maxYear}
                            onChange={(e) => setEndYear(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-check ms-1 mb-2"> {/** позначка застосування діапазону */}
                    <label className="form-check-label" htmlFor="inputApplyYear">
                        Застосувати діапазон років
                    </label>
                    <input className="form-check-input" type="checkbox"
                        id="inputApplyYear"
                        checked={applyYears}
                        onChange={handleCheckboxChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary col-sm-6 mt-2">Шукати</button>
            </form>
        </div>
    )
}

export default SearchBook