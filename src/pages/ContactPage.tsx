import { useState } from "react";
import type { ContactFormData } from "../types/Product";
// import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

// Here we´re creating a interface which defines the shape of our error object. It is important that we include "?", because a
// form can have from 0-4 errors.
interface FormErrors {
  fullName?: string;
  subject?: string;
  email?: string;
  message?: string;
}

export function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    subject: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters";
    }

    if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    if (!formData.email.trim().includes("@")) {
      newErrors.email = "Email adress must include @";
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = "Your message to us must be at least 10 characters";
    }

    setErrors(newErrors);

    // Our form is only valid when the array of errors is equal to zero, which will be important for validation.
    return Object.keys(newErrors).length === 0;

    // we need handle submit and handle change
  };

  // Here we look for the submit event.
  // When the form is successfully submitted, we empty out the form inputs.
  // We set submitted to true in order to display a confirmation message. After 5 seconds we send it to false to hide the message again.
  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();

    if (validateForm()) {
      setSubmitted(true);
      setFormData({ fullName: "", subject: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  // Here we look for both an input and textarea element.
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
    setErrors((prevValue) => ({ ...prevValue, [name]: undefined }));
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 py-16 bg-white sm:px-6 lg:px-8">
      <div className="w-full max-w-xl">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-900">
          Contact Us
        </h1>
        <p className="mb-10 text-center text-gray-600">
          Have questions or feedback? Fill out the form and we’ll get back to
          you shortly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label
              htmlFor="fullName"
              className="mb-1 font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="block w-full rounded-md border border-gray-300 px-3.5 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="subject" className="mb-1 font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="block w-full rounded-md border border-gray-300 px-3.5 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              value={formData.subject}
              onChange={handleChange}
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="block w-full rounded-md border border-gray-300 px-3.5 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="mb-1 font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="block w-full rounded-md border border-gray-300 px-3.5 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">{errors.message}</p>
            )}
          </div>

          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="w-full px-6 py-2 font-semibold text-white transition-colors bg-indigo-600 rounded-md sm:w-auto hover:bg-indigo-500"
            >
              Submit
            </button>
            {submitted && (
              <p className="mt-3 font-medium text-center text-green-600">
                Thank you! Your message has been sent.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
