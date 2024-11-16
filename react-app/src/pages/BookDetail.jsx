import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { faReadme } from '@fortawesome/free-brands-svg-icons';

/**
 * Сторінка з детальною інформацію про книгу
 * @returns {JSX.Element} JSX-елемент
 */
function BookDetail() {
    // url серверної частини
    const apiUrl = import.meta.env.VITE_URL; 
    const { idEdition } = useParams();
    const [values, setValues] = useState({
        title: "", author: "", format: "", language: "",
        publisher: "", year_edition: 0, description: "", page_number: 0, isbn: "", year_publication: 0,
        url_cover: "", tag: "", url_fragment: "", url_content: ""
    });

    useEffect(() => {
        axios.get(apiUrl + '/bookdetail/' + idEdition)
            .then(res => setValues({
                ...values, title: res.data[0].title, author: res.data[0].author,
                format: res.data[0].format, language: res.data[0].language, publisher: res.data[0].publisher,
                year_edition: res.data[0].year_edition, description: res.data[0].description,
                page_number: res.data[0].page_number, isbn: res.data[0].isbn, year_publication: res.data[0].year_publication,
                url_cover: res.data[0].url_cover, tag: res.data[0].tag, url_fragment: res.data[0].url_fragment,
                url_content: res.data[0].url_content
            }))
            .catch(err => console.log(err))
    }, [])

    // завантажити книгу
    const handleDownloadBook = (url) => {
        const fileName = url.split('/').pop() // назва файлу
        fetch(url)
            .then(res => res.blob())
            .then(blob => {
                const blobURl = window.URL.createObjectURL(new Blob([blob]));
                const aTag = document.createElement('a');
                aTag.href = blobURl;
                aTag.setAttribute('download', fileName)
                document.body.appendChild(aTag)
                aTag.click()
                aTag.remove()
            })

    }

    const isEmptyString = (string) => {
        return string === '' || string === null;
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-sm-4 mb-1 shadow-sm border text-center">
                    <img className="mb-2" src={apiUrl + values.url_cover} style={{ width: "80%", height: "auto", objectFit: 'contain' }} alt="cover-book" />
                    <div className="container mb-2 btn-group p-2">
                        <div className="dropdown">
                            <button type="button" className={`me-2 btn btn-outline-primary dropdown-toggle ${isEmptyString(values.url_fragment) ? 'disabled' : ''}`}
                                data-bs-toggle="dropdown">
                                <FontAwesomeIcon icon={faDownload} /> Завантажити
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#"
                                    onClick={() => handleDownloadBook(apiUrl + values.url_fragment)} > Фрагмент (PDF)</a>
                                </li>
                                <li><a className="dropdown-item" href="#"
                                    onClick={() => handleDownloadBook(apiUrl + values.url_content)}>Текст ({values.format})</a>
                                </li>
                            </ul>
                        </div>
                        <Link to={`${apiUrl + values.url_fragment}`} className={`btn btn-outline-primary ${isEmptyString(values.url_fragment) ? 'disabled' : ''}`}>
                            <FontAwesomeIcon icon={faReadme} /> Читати фрагмент
                        </Link>
                    </div>
                    {
                        isEmptyString(values.url_fragment) &&
                        (<div className="alert alert-primary align-items-center" role="alert">
                            Очікуйте книгу найближчим часом!
                        </div>)
                    }
                </div>
                <div className="col-sm-7 ms-2 shadow-sm border">
                    <h3>{values.title}</h3>
                    <p>Автор: {values.author}</p>
                    <p>Формат: <span className="badge rounded-pill text-bg-light">{values.format}</span></p>
                    <p>Мова: <span className="badge rounded-pill text-bg-light">{values.language}</span></p>
                    <p>Видавництво: <span className="badge rounded-pill text-bg-light">{values.publisher}</span></p>
                    <p>Рік видання: <span className="badge rounded-pill text-bg-light">{values.year_edition}</span></p>
                    <div>Теги: {
                        values.tag.includes(",") ? (
                            values.tag.split(",").map((item, index) => (
                                <span key={index} className="badge rounded-pill text-bg-light">{item} </span>
                            ))
                        ) : (<span className="badge rounded-pill text-bg-light">{values.tag}</span>)
                    }</div>
                    <div className="mt-2 accordion accordion-flush" id="accordionBookDetail">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingOne">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    Опис
                                </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionBookDetail">
                                <div className="accordion-body">
                                    <p>{values.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                    Додаткова інформація
                                </button>
                            </h2>
                            <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionBookDetail">
                                <div className="accordion-body">
                                    <p>Кількість сторінок: {values.page_number}</p>
                                    <p>ISBN: {values.isbn} </p>
                                    <p>Рік першого видання: {values.year_publication} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default BookDetail