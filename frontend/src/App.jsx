import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

export default function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contacts");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-10 px-4 items-center">
      <div className="max-w-7xl mx-auto items-center">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              📇 Contact Manager
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            A modern contact management system to store and organize all your important contacts
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <ContactForm onSuccess={fetchContacts} />
          </div>
          <div>
            <ContactList contacts={contacts} onDelete={fetchContacts} />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            Total Contacts: {contacts.length}
          </p>
        </div>
      </div>
    </div>
  );
}