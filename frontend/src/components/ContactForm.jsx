import { useState } from "react";

export default function ContactForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [success, setSuccess] = useState("");

  const isValid =
    form.name.trim() &&
    form.phone.trim() &&
    /\S+@\S+\.\S+/.test(form.email);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isValid) {
      setShowErrorPopup(true);
      return;
    }

    await fetch("http://localhost:5000/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setForm({ name: "", email: "", phone: "", message: "" });
    setSuccess("Contact saved successfully!");
    onSuccess();

    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <>
      {/* FORM CARD */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-r from-white to-blue-50 rounded-2xl shadow-xl p-8 border border-blue-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Add New Contact
              </h2>
              <p className="text-gray-600">Fill in the details below to save a new contact</p>
            </div>

            <form onSubmit={submitHandler} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                    placeholder="+1 (555) 123-4567"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message (optional)
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                    placeholder="Add any additional notes..."
                    rows="4"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
              </div>

              {success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg animate-fadeIn">
                  <p className="text-green-700 font-medium text-center">{success}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              >
                Save Contact
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Fields marked with * are required
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ERROR POPUP MODAL */}
      {showErrorPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-gradient-to-b from-white to-red-50 rounded-2xl shadow-2xl w-full max-w-sm p-8 animate-scaleIn border border-red-100">
            <div className="text-center mb-6">
              
              <h3 className="text-2xl font-bold text-red-700 mb-2">
                Invalid Form Data
              </h3>
              <p className="text-gray-700">
                Please make sure all required fields are filled correctly:
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4 mb-6">
              <ul className="space-y-2">
                <li className="flex items-center text-red-700">
                  
                  Name is not empty
                </li>
                <li className="flex items-center text-red-700">
                  
                  Email is valid
                </li>
                <li className="flex items-center text-red-700">
                  
                  Phone number is provided
                </li>
              </ul>
            </div>

            <button
              onClick={() => setShowErrorPopup(false)}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Okay, Got it
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}