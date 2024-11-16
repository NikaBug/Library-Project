import React from 'react'

function TopicCard({ icon, title, text }) {
    return (
        <div className="card text-center border-0 rounded-3 shadow mt-5" style={{ width: "18rem" }}>
            <div className='position-absolute start-50 translate-middle rounded-circle p-3 text-light bg-dark'>
                {icon}
            </div>
            <div className="card-body mt-4">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{text}</p>
                <div className="text-secondary">
                    <hr />
                </div>
                <a href="#" className="text-secondary text-decoration-none fw-bold d-block py-2">Дізнатися більше</a>
            </div>
        </div>
    )
}

export default TopicCard