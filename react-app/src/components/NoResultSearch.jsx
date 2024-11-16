import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

/**
 * Сторінка "Не знайдено результати пошуку"
 * @description містить інформацію щодо невдалого пошуку
 * @returns {JSX.Element}
 */
function NoResultSearch() {
  const location = useLocation();
  const [urlParams, setUrlParams] = useState([]);

  useEffect(() => {
    // параметри пошуку
    const searchParams = new URLSearchParams(location.search);
    const params = [];
    searchParams.forEach((value, key) => (
      params.push(`${key}=${value}`)
    ))
    setUrlParams(params.join(", "));
  }, [location.search])

  return (
    <div className='container-fluid mt-3 min-vh-100'>
      <div className="alert alert-info" role="alert">
        <h4 className="alert-heading">Упс! Результатів не знайдено</h4>
        <p>Для заданих вами параметрів книг не знайдено. Перегляньте пошукові поради нижче та спробуйте ще раз.</p>
        {urlParams && (
          <p><strong>Параметри пошуку:</strong> {urlParams}</p>
        )}
        <ul>
          <li>Перевірте на помилки написання назви або автора книги. Якщо видання іншомовне — його назва має бути мовою оригіналу;</li>
          <li>Виберіть інше або залиште значення за замовчуванням (для категорії, формату або мови);</li>
          <li>Перевірте чи входить рік шуканого видання у вказаний діапазон, якщо він застосовується.</li>
        </ul>
        <p>Якщо ви впевнені у правильності вказаних даних, але видання не знайшлося — можливо, його ще не додано на сайт.</p>
        <hr />
        <p className="mb-0">Є технічні питання? Пишіть у службу підтримки за адресою <a href="#" className="alert-link">meridhelp@mail.com</a>. Відповідь надходить протягом 3 робочих днів.</p>
      </div>
    </div>
  )
}

export default NoResultSearch