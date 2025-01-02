import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// <FontAwesomeIcon icon={faHouse} />
import { faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

/** Нижній колонтикул сторінки
 * @description містить інформацію про авторські права
 * @returns {JSX.Element} footer елемент
 */
function Footer() {
    return (
        <footer>
            <div className="mt-4 p-2 text-center bg-dark bg-gradient text-white"> {/** style={{ backgroundColor: "rgb(151, 226, 255)" } */}
                {/** section: social media */}
                <section className="d-flex p-4 border-bottom">
                    <div className="me-5 d-none d-lg-block"> {/* справа */}
                        <span>Зв’яжіться з нами в соціальних мережах:</span>
                    </div>

                    {/** зліва */}
                    <div>
                        <a href="#facebook" className="me-4 text-reset" aria-label='facebook link'>
                            <i><FontAwesomeIcon icon={faFacebook} style={{ width: '25px', height: '25px' }} /></i>
                        </a>
                        <a href="#instagram" className="me-4 text-reset" aria-label='instagram link'>
                            <FontAwesomeIcon icon={faInstagram} style={{ width: '25px', height: '25px' }} />
                        </a>
                        <a href="#whatsapp" className="me-4 text-reset" aria-label='whatsapp link'>
                            <FontAwesomeIcon icon={faWhatsapp} style={{ width: '25px', height: '25px' }} />
                        </a>
                        <a href="#linkedin" className="me-4 text-reset" aria-label='linkedin link'>
                            <FontAwesomeIcon icon={faLinkedin} style={{ width: '25px', height: '25px' }} />
                        </a>
                    </div>
                </section>
                <div className="container p-2 text-lg-start">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Meridian</h5>
                            <p>
                                Merdidian —  місце, де є і художня література – від романтики до фентезі й трилерів,
                                і захоплива нехудожня література – від науково-популярних видань до історичних та публіцистичних творів.

                            </p>
                        </div>

                        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Контакти</h5>
                            <p><FontAwesomeIcon icon={faLocationDot} /> 49XXX, Україна, м. Дніпро</p>
                            <p><FontAwesomeIcon icon={faEnvelope} /> merlib@mail.com</p>
                            <p><FontAwesomeIcon icon={faPhone} /> +38 (000) 11-11-111, +38 (000) 22-22-22</p>
                        </div>
                    </div>
                </div>
                <p className='mt-2'> &copy; {new Date().getFullYear()} Copyright: Meridian.com</p>
            </div>
        </footer>
    );
}

export default Footer