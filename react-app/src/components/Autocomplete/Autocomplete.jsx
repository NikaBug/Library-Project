import React, { useState, useEffect, useRef } from 'react'
import styles from './Autocomplete.module.css'

/**
 * Автозаповнювач (для фільтрації)
 * @param {Object[]} options - масив фільтрів
 * @param {function} filterFunction - функція фільтрації
 * @param {function} resetFilterFunction - функція скидання фільтру
 * @returns {JSX.Element}
 */
function Autocomplete({ options, filterFunction, resetFilterFunction, resetTrigger }) {
    const [value, setValue] = useState(""); // значення автозаповнювача
    const [showSuggestions, setShowSuggestions] = useState(false) // показати пропозицію
    // пропозиції
    const suggestions = options.filter(option => option.toLowerCase().includes(value.toLowerCase()));

    useEffect(() => {
        setValue("");
    }, [resetTrigger]);

    // зміна значення автозапонвювача
    const handleAutocompleteChange = (e) => {
        setValue(e.target.value);
        if (e.target.value === "") {
            resetFilterFunction();
        }
    }

    // клік на вибрану пропозицію
    const handleSuggestionsClick = (suggestion) => {
        setValue(suggestion);
        setShowSuggestions(false);
        filterFunction(suggestion);
    }

    const autocompleteRef = useRef(); // посилання на компонент
    useEffect(() => {
        // приховати пропозиції при кліку за межами списку пропозицій
        const handleOutsideClick = (e) => {
            if (autocompleteRef.current && !autocompleteRef.current.contains(e.target)) {
                setShowSuggestions(false)
            }
        }
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick)
        }
    }, [])

    return (
        <div className={styles['autocomplete']} ref={autocompleteRef}>
            <input name='publisher'
                className={`form-control ${styles['form-control']}`}
                maxLength="200"
                value={value}
                onChange={handleAutocompleteChange}
                onFocus={() => setShowSuggestions(true)}
                placeholder='Видавництво'
            />
            {
                showSuggestions && (
                    <ul className={styles["suggestions"]}>
                        {
                            suggestions.map((suggestion, index) => (
                                <li onClick={() => handleSuggestionsClick(suggestion)} key={index}>
                                    {suggestion}
                                </li>
                            ))

                        }
                    </ul>
                )
            }
        </div>
    )
}

export default Autocomplete