import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Where do you ship to?",
    answer: "We ship to Canada.\n\n*Please note we cannot deliver to a PO box.\n\n*ELAVATE does not ship to freight forwarders or PO boxes under any circumstances."
  },
  {
    question: "What are the shipping options, costs, and restrictions on orders?",
    answer: "Orders over $100, before applicable sales taxes, qualify for FREE STANDARD SHIPPING via FedEx. Orders below $100, before applicable sales taxes incur a $15 shipping and handling fee."
  },
  {
    question: "Can I modify or cancel my order after it's been placed?",
    answer: "Unfortunately, once an order is placed, it cannot be modified or canceled. Please double-check the ship-to address before finalizing your order."
  },
  {
    question: "How long will it take for my order to arrive?",
    answer: "Your order will be delivered within approximately 5-7 business days after receiving your order confirmation email, with potential delays during high seasons or sales campaigns. Orders placed on weekends or holidays will be processed on the next business day."
  },
  {
    question: "Is there sales tax for orders?",
    answer: "Any applicable sales tax will be calculated at checkout."
  },
  {
    question: "How can I track my order?",
    answer: "When your order leaves our warehouse, you will receive a shipping confirmation email with a tracking number. Please input your tracking number into the carrier's website to track your order. Please note that tracking information may take 2-3 business days to be uploaded."
  }
];

/**
 * Renders the Shipping and FAQ page.
 * Manages an accordion-style list where only one item remains open at a time.
 * Utilizes a CSS Grid transition strategy for smooth height animations and 
 * handles multi-line text formatting from the data source.
 *
 * @returns {JSX.Element} The Shipping page component.
 */
const Shipping = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="shipping-page">
      <div className="container faq-container">
        <div className="faq-wrapper">
          <h1 className="faq-page-title">Shipping</h1>
          
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                
                <button
                  className={`faq-question ${openIndex === index ? 'open' : ''}`}
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  {openIndex === index ? (
                    <Minus size={18} strokeWidth={1.5} />
                  ) : (
                    <Plus size={18} strokeWidth={1.5} />
                  )}
                </button>
                
                <div className={`faq-answer-wrapper ${openIndex === index ? 'open' : ''}`}>
                  <div className="faq-answer">
                    {faq.answer.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i !== faq.answer.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Shipping;