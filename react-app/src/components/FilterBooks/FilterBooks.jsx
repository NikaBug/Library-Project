import React, { useEffect, useState } from 'react'
import styles from './FilterBooks.module.css';

/**
 * Компонент фільтрації книг
 * @param {Object[]} filter масив фільтрів
 * @param {function} filterFunction функція фільтрації
 * @param {function} resetFilterFunction функція скидання фільтру
 * @param {string} idFilter ідентифікатор фільтру
 * @param {number} resetTrigger тригер скидання фільтрів
 * @returns 
 */
function FilterBooks({ filters, filterFunction, resetFilterFunction, idFilter, resetTrigger }) {
    // вибране значення
    const [selectedValue, setSelectedValue] = useState("all");

    useEffect(() => {
        setSelectedValue("all");
    }, [resetTrigger]);

    // дії при зміні вибраного значення
    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedValue(value);
        if (value === "all") {
            resetFilterFunction();
        } else {
            filterFunction(value);
        }
    };

    return (
        <div>
            <div className='col-sm-11'>
                <select className={`form-select ${styles['sel']}`}
                    value={selectedValue}
                    id={idFilter}
                    onChange={(e) => handleChange(e)}>
                    <option value="all" defaultValue>Все</option>
                    {
                        filters.map((filter, index) => (
                            <option key={index} value={filter}>{filter}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}


export default FilterBooks