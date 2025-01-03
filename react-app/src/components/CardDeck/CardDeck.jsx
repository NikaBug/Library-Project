import React from 'react'
import styles from './CardDeck.module.css'
import { Link } from "react-router-dom";

/**
 * "Колода карт" книжок
 * @param {Object[]} books - масив книг
 * @returns {JSX.Element} 
 */
function CardDeck({ books }) {
    // url адреса серверної частини
    const apiUrl = import.meta.env.VITE_URL;
    return (
        <div className='card-deck mt-2'>
            <div className="row justify-content-center">
                {
                    books.map((book) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4 ms-2" key={book.idEdition}>
                            <div className={`${styles.card} border`}>
                                <img className="card-img-top" src={`${apiUrl + book.url_cover}`} alt={`cover ${book.title}`} />
                                <div className={styles["card-body"]}>
                                    <h6 className="card-title">{book.title}</h6>
                                    <p className="card-subtitle mb-2 text-muted small">{book.author}</p>
                                    <Link to={`/bookdetail/${book.idEdition}`} className='btn btn-info btn-sm mb-2'>Читати</Link>
                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    )
}

export default CardDeck