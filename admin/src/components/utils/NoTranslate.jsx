import React from 'react';

/**
 * NoTranslate component prevents browser translation tools from translating its content.
 * 
 * This component uses the translate="no" attribute and CSS class to prevent translation.
 * It's useful for preserving mathematical notation, code snippets, and other content
 * that should not be translated.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to be protected from translation
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 * @param {string} props.as - HTML element to render (default: 'span')
 * @returns {React.ReactElement} - A component that prevents its content from being translated
 */
const NoTranslate = ({ 
  children, 
  className = '', 
  style = {}, 
  as: Component = 'span',
  ...rest 
}) => {
  return (
    <Component 
      className={`notranslate ${className}`}
      translate="no"
      style={style}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default NoTranslate;
