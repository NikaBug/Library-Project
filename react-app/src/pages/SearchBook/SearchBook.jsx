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
    const navigate = useNavigate();

    // діапазон років видань (мінімальне та максимальне можливе значення)
    const [rangeYears, setRangeYears] = useState({ minYear: 0, maxYear: 0 });
    useEffect(() => {
        axios.get(apiUrl + '/rangeyears')
            .then(res => setRangeYears({ minYear: res.data[0].minYear, maxYear: res.data[0].maxYear }))
            .catch(err => console.log(err))
    }, [])

    // параметри пошуку
    const [data, setData] = useState({
        author: "", title: "", category: "", language: "",
        format: "", applyYears: false, startYear: 0, endYear: 0
    })

    // зміна параметрів пошуку
    const handleChange = (e) => {
        if (e.target.name === 'applyYears')
            setData(prev => ({ ...prev, [e.target.name]: e.target.checked }))
        else
            setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // функція відправки даних форми пошуку на сервер
    const handleSubmit = (e) => {
        e.preventDefault()
        // параметри URL
        const params = new URLSearchParams();
        Object.entries(data).forEach(([key, value]) => {
            if (value) {
                if (key !== 'startYear' && key !== 'endYear' && key !== 'applyYears') {
                    params.append(key, value);
                }
            }
        });

        if (data.applyYears) {
            if (data.startYear && data.endYear) {
                params.append('startYear', data.startYear);
                params.append('endYear', data.endYear);
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
                <div className="form-group row">
                    <label htmlFor="inputTitleBook">Назва книги</label>
                    <div className="col-sm-8">
                        <input type="text" className='form-control' id="inputTitleBook"
                            name='title' placeholder='title' maxLength="200"
                            value={data.title}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <label htmlFor="inputAuthorBook">Автор</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="inputAuthorBook" name='author'
                            placeholder="author" maxLength="100"
                            value={data.author}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>
                <div className="mb-3 col-sm-8">
                    <label htmlFor="categorySelect" className="form-label">Категорія</label>
                    <select id="categorySelect" className="form-select" name='category'
                        onChange={(e) => handleChange(e)}>
                        <option value=''>Будь-яка</option>
                        <option value='Художня література'>Художня література</option>
                        <option value='Нехудожня література'>Нехудожня література</option>
                    </select>
                    <label htmlFor="languageSelect" className="form-label mt-1">Мова</label>
                    <select id="languageSelect" className="form-select" name='language'
                        onChange={(e) => handleChange(e)}>
                        <option value=''>Будь-яка</option>
                        <option value='Українська'>Українська</option>
                        <option value='English'>English</option>
                    </select>
                    <label htmlFor="formatSelect" className="form-label mt-1">Формат</label>
                    <select id="formatSelect" className="form-select" name='format'
                        onChange={(e) => handleChange(e)}>
                        <option value=''>Будь-який</option>
                        <option value='EPUB'>EPUB</option>
                        <option value='FB2'>FB2</option>
                    </select>
                </div>
                <div className='row g-2'>
                    <div className="col-auto">
                        <label htmlFor="inputStartYear" className="form-label">з (початок)</label>
                        <input type="number" id="inputStartYear" className="form-control"
                            name='startYear' step='1' min={rangeYears.minYear} max={rangeYears.maxYear}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="inputEndYear" className="form-label">по (кінець)</label>
                        <input type="number" id="inputEndYear" className="form-control"
                            name='endYear' step='1' min={rangeYears.minYear + 1} max={rangeYears.maxYear}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>
                <div className="form-check ms-1 mb-2">
                    <label className="form-check-label" htmlFor="inputApplyYear">
                        Застосувати діапазон років
                    </label>
                    <input className="form-check-input" type="checkbox"
                        name='applyYears' id="inputApplyYear"
                        checked={data.applyYears}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <button type="submit" className="btn btn-primary col-sm-6 mt-2">Шукати</button>
            </form>
        </div>
    )
}

export default SearchBook