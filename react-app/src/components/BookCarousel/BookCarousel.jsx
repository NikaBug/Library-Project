import styles from './BookCarousel.module.css'
import { Link } from "react-router-dom";

/**
 * Карусель для показу книг (шести штук)
 * @param {Object[]} books масив книг
 * @param {string} idCarousel ідентифікатор каруселі
 * @returns {JSX.Element} JSX-елемент
 */
function BookCarousel({ books, idCarousel }) {
    const apiUrl = import.meta.env.VITE_URL;
    const firstSliceBook = books.slice(0, 3);
    const twoSliceBook = books.slice(3); 
    
    return (
        <div id={idCarousel} className="carousel carousel-dark slide" data-bs-ride="carousel">
            <div className="carousel-inner" style={{ padding: "1em"}}>
                <div className="carousel-item active">
                    <div className={styles["cards-wrapper"]}>
                        {firstSliceBook.map((book) => (
                            <div key={book.idEdition} className={styles["card"]}>
                                <img src={`${apiUrl + book.url_cover}`} className="card-img-top" alt="..." />
                                <div className={styles["card-body"]}>
                                    <h6 className="card-title">{book.title}</h6>
                                    <p className="card-subtitle mb-2 text-muted small">{book.author}</p>
                                    <Link to={`/bookdetail/${book.idEdition}`} className='btn btn-info btn-sm mb-2'>Читати</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="carousel-item">
                    <div className={styles["cards-wrapper"]}>
                        {twoSliceBook.map((book) => (
                            <div key={book.idEdition} className={styles["card"]}>
                                <img src={`${apiUrl + book.url_cover}`} className="card-img-top" alt="..." />
                                <div className={styles["card-body"]}>
                                    <h6 className="card-title">{book.title}</h6>
                                    <p className="card-subtitle mb-2 text-muted small">{book.author}</p>
                                    <Link to={`/bookdetail/${book.idEdition}`} className='btn btn-info btn-sm me-2'>Читати</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button"
                data-bs-target={"#".concat(idCarousel)} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={"#".concat(idCarousel)}
                data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default BookCarousel