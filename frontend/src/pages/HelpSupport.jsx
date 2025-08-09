import React from "react";
import { FaPhoneAlt, FaEnvelope, FaQuestionCircle } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";

export default function HelpSupport() {
  return (
    <div className=" bg-[url('/images/lightBg.jpg')] dark:bg-[url('/images/darkBg.jpg')] bgImage text-gray-800 dark:text-white pt-20 py-10">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
        <p className="text-lg opacity-80">
          We’re here to make your food ordering experience smooth and enjoyable.
          Find answers to common questions or reach out to us anytime.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FaQuestionCircle className="mr-2 text-orange-500" /> Frequently Asked
          Questions
        </h2>
        <div className="space-y-4">
          <details className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow cursor-pointer">
            <summary className="font-semibold">
              How do I place an order?
            </summary>
            <p className="mt-2 opacity-80">
              Simply browse the menu, add items to your cart, and proceed to
              checkout. Choose your payment method, and we’ll deliver your food
              to your doorstep.
            </p>
          </details>

          <details className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow cursor-pointer">
            <summary className="font-semibold">Can I track my order?</summary>
            <p className="mt-2 opacity-80">
              Yes! Once your order is confirmed, you can track its status in the
              “My Orders” section of the app.
            </p>
          </details>

          <details className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow cursor-pointer">
            <summary className="font-semibold">
              What if I have an issue with my order?
            </summary>
            <p className="mt-2 opacity-80">
              If your order is incorrect or delayed, please contact our support
              team immediately using the details below, and we’ll make it right.
            </p>
          </details>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <MdFeedback className="mr-2 text-orange-500" /> Contact Support
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
            <FaPhoneAlt className="text-orange-500 text-3xl mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Call Us</h3>
            <p className="opacity-80">+977-9800000000</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
            <FaEnvelope className="text-orange-500 text-3xl mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Email</h3>
            <p className="opacity-80">support@foodapp.com</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
            <MdFeedback className="text-orange-500 text-3xl mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Feedback</h3>
            <p className="opacity-80">
              We value your feedback! Let us know how we can improve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
