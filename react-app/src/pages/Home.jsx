import React, { useState, useEffect } from 'react';
import axios from 'axios'
import BookCarousel from "../components/BookCarousel/BookCarousel.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtom, faBoxArchive, faNewspaper, faHeart, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import TopicCard from '../components/TopicCard.jsx';
import FadeInSection from '../components/FadeInSection/FadeInSection.jsx'

/**
 * Сторінка "Головна"
 * @returns {JSX.Element}
 */
function Home() {
    const apiUrl = import.meta.env.VITE_URL;
    const [ficEditions, setFicEditions] = useState([]);
    const [nonficEditions, setNonficEditions] = useState([]);

    useEffect(() => {
        axios.get(apiUrl + '/getfiction')
            .then(res => setFicEditions(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(apiUrl + '/getnonfiction')
            .then(res => setNonficEditions(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="container mt-5">
            <div className="row mt-2">
                <div className="col">
                    <FadeInSection>
                        <div className="row bg-light bg-gradient p-4 rounded">
                            <h4 style={{ color: 'black' }}>Знайдіть історію, яка захопить вас із перших сторінок</h4>
                            <div className="col-md-4">
                                <TopicCard
                                    icon={<FontAwesomeIcon icon={faHeart} size='3x' />}
                                    title="Романтика"
                                    text='Від ніжних історій до палких почуттів – тут ви знайдете книгу, яка торкнеться вашого серця'
                                />
                            </div>
                            <div className="col-md-4">
                                <TopicCard
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-clipboard2-pulse-fill" viewBox="0 0 16 16">
                                        <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
                                        <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 
                                          1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5M9.98 5.356 11.372 10h.128a.5.5 0 0 1 0 1H11a.5.5 0 0 1-.479-.356l-.94-3.135-1.092 5.096a.5.5 0 0 1-.968.039L6.383 8.85l-.936 
                                          1.873A.5.5 0 0 1 5 11h-.5a.5.5 0 0 1 0-1h.191l1.362-2.724a.5.5 0 0 1 
                                         .926.08l.94 3.135 1.092-5.096a.5.5 0 0 1 .968-.039Z" />
                                    </svg>}
                                    title="Трилер"
                                    text='Моторошні загадки, непередбачувані повороти та герої, що опиняються на межі життя і смерті'
                                />
                            </div>
                            <div className="col-md-4">
                                <TopicCard
                                    icon={<FontAwesomeIcon icon={faWandMagicSparkles} size='3x' />}
                                    title="Фентезі/Фантастика"
                                    text='Магія, неймовірні пригоди та захоплюючі світи чекають на вас. 
                         Подорожуйте невідомими світами та розгадуйте їхні загадки'
                                />
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-gradient text-dark rounded" style={{ backgroundColor: "rgb(224, 224, 224)" }}>
                            <h3>Художня література</h3>
                            <p>Світ історій, які оживають на сторінках!</p>
                            <BookCarousel books={ficEditions} idCarousel={"fcarousel"} />
                        </div>

                    </FadeInSection>
                    <FadeInSection>
                        <div className="mt-4 p-4 row bg-light">
                            <h4 style={{ color: 'black' }}>Пориньте у книги, що розширюють горизонти і надихають на нові відкриття</h4>
                            <div className="col">
                                <TopicCard
                                    icon={<FontAwesomeIcon icon={faAtom} size='3x' />}
                                    title="Наука"
                                    text='Легко про складне: від космосу до мікросвіту, від загадок мозку до майбутнього технологій'
                                />
                            </div>
                            <div className="col">
                                <TopicCard
                                    icon={<FontAwesomeIcon icon={faBoxArchive} size='3x' />}
                                    title="Історія"
                                    text='Подорож крізь епохи, культури та події, що сформували наш світ. 
                                Це шанс відчути подих минулого і глибше зрозуміти сьогодення'
                                />
                            </div>
                            <div className="col">
                                <TopicCard
                                    icon={<FontAwesomeIcon icon={faNewspaper} size='3x' />}
                                    title="Публіцистика"
                                    text='Твори, що аналізують сучасність, розкривають соціальні, політичні та культурні аспекти життя. 
                                Від статей до глибоких досліджень'
                                />
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-gradient text-dark rounded" style={{ backgroundColor: "rgb(224, 224, 224)" }}>
                            <h3>Не художня література</h3>
                            <p>Навчайтеся, відкривайте, досліджуйте разом із нами!</p>
                            <BookCarousel books={nonficEditions} idCarousel={"nfcarousel"} />
                        </div>
                    </FadeInSection>
                </div>
            </div>
        </div>
    );
}

export default Home