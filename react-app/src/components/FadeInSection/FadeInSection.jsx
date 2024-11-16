import React from 'react';
import { useInView } from 'react-intersection-observer';
import './FadeInSection.css';

/**
 * Компонент, який приховує елемент до його появи
 * при прокрутці сторінки
 * @param {*} clidren дорічній елемент 
 * @returns 
 */
function FadeInSection({ children }) {

  const { ref, inView } = useInView({
    triggerOnce: false, // тригер на не один раз
    threshold: 0.1, // відсоток видимого елемента для тригера
  });

  return (
    <div ref={ref} className={`fade-in-section ${inView ? 'visible' : ''}`}>
      {children}
    </div>
  );
};

export default FadeInSection;
