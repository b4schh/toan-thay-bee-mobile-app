import React from 'react';
import NoTranslate from './NoTranslate';

/**
 * Example component demonstrating how to use the NoTranslate component
 */
const NoTranslateExample = () => {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Translation Protection Example</h2>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Regular text (will be translated):</h3>
        <p>
          This text will be translated by browser translation tools.
          Mathematical expressions like x² + y² = z² might be incorrectly translated.
        </p>
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Protected text (won't be translated):</h3>
        <NoTranslate>
          <p>
            This text will NOT be translated by browser translation tools.
            Mathematical expressions like x² + y² = z² will be preserved correctly.
          </p>
        </NoTranslate>
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Mixed content:</h3>
        <p>
          This text can be translated, but the <NoTranslate as="span" className="font-mono bg-gray-100 px-1">mathematical formula E = mc²</NoTranslate> will be preserved.
        </p>
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Using different HTML elements:</h3>
        <NoTranslate as="pre" className="bg-gray-100 p-2 rounded">
          // This code block won't be translated
          function calculateArea(radius) {
            return Math.PI * radius * radius;
          }
        </NoTranslate>
      </div>
    </div>
  );
};

export default NoTranslateExample;
