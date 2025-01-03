import { Link } from "react-router-dom";

/**
 * Заголовок сторінки
 * @description містить набір навігаційних посилань та логотип
 * @returns {JSX.Element} header елемент
 */
function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark bg-gradient" >
                <div className="container-fluid justify-content-center text-white"> {/* контейнер для вмісту шапки */}
                    <a className="navbar-brand" href="#meridianLogo">
                        <span className="fs-4 fw-bold">MERIDIAN</span>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar" aria-label='navigation bar'>
                        <span className="navbar-toggler-icon" />
                    </button> {/* кнопка для розгортання меню (на меленьких екранах) */}
                    <div className="collapse navbar-collapse flex-grow-0" id="collapsibleNavbar">
                        <ul className="navbar-nav text-center"> {/* меню навігації */}
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Головна</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/catalog" className="nav-link">Каталог</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/aboutus" className="nav-link">Про нас</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/searchbook" className="nav-link">Пошук</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header