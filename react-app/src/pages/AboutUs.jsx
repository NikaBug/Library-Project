/**
 * Сторінка "Про нас"
 * @returns {JSX.Element}
 */
function AboutUs() {
    return (
        <div>
            <div className="container mt-3">
                <h2>Про нас</h2>
                <figure className="alert alert-primary p-4 col-sm-8" style={{ borderLeft: '.25rem solid blue' }}>
                    <blockquote className="blockquote">
                        <p className="pb-2">
                            "Книги — невидимі нитки, що об'єднують читачів."
                        </p>
                    </blockquote>
                    <figcaption className="blockquote-footer mb-0">
                        Merdian
                    </figcaption>
                </figure>
                <h6>Ласкаво просимо до бібліотеки Merdian!</h6>
                <p>Meridian — це онлайн-бібліотека, створена для тих, хто шукає натхнення, знання та захоплюючі історії.
                    Ми пропонуємо великий вибір художньої та нехудожньої літератури для різних смаків і потреб: від класики та бестселерів до спеціалізованих видань і нових релізів.
                    Це місце, де книги завжди поруч, доступні для читання в зручний для вас час. Досліджуйте світ літератури разом із нами!</p>
            </div>
        </div>
    );
}

export default AboutUs