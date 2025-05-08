
'use client';

import { useState } from 'react';
import Address from './Stepper/Address/AddressMenu';
import Shipping from './Stepper/Shipping';
import Products from './Stepper/Products';
import Confirm from './Stepper/Confirm';

const steps = [
  { id: 1, title: 'آدرس تحویل' },
  { id: 2, title: 'روش ارسال' },
  { id: 3, title: 'سبد خرید' },
  { id: 4, title: 'پرداخت' }
];

export default function CheckoutSteps() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.id <= currentStep ? 'bg-primary text-white' : 'bg-gray-200'
                }`}
              >
                {step.id}
              </div>
              <div className="mt-2 text-sm text-center">{step.title}</div>
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-4 -right-full w-full h-0.5 ${
                    step.id < currentStep ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {currentStep === 1 && <Address onNext={nextStep} />}
        {currentStep === 2 && <Shipping onNext={nextStep} onPrev={prevStep} />}
        {currentStep === 3 && <Products onNext={nextStep} onPrev={prevStep} />}
        {currentStep === 4 && <Confirm onPrev={prevStep} />}
      </div>
    </div>
  );
}
