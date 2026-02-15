'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  items: FaqItem[];
}

export default function Faq({ items }: FaqProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {items.map((item, index) => (
        <FaqItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}

function FaqItem({ question, answer }: FaqItem) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left font-semibold text-gray-900 hover:text-primary transition-colors"
      >
        <span>{question}</span>
        <span className="text-primary text-2xl flex-shrink-0 ml-4">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-gray-200 text-gray-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}
