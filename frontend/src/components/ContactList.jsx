export default function ContactList({ contacts, onDelete }) {
    const deleteContact = async (id) => {
      await fetch(`http://localhost:5000/api/contacts/${id}`, {
        method: "DELETE"
      });
      onDelete();
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-full">
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 w-full max-w-6xl border border-blue-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              📇 Saved Contacts
            </h2>
            <p className="text-gray-600">
              {contacts.length} contact{contacts.length !== 1 ? 's' : ''} in your list
            </p>
          </div>
  
          {contacts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No contacts yet</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Start by adding your first contact using the form on the left. Your contacts will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700">
                    <th className="text-left p-4 font-semibold text-gray-800">Name</th>
                    <th className="text-left p-4 font-semibold text-gray-800">Email</th>
                    <th className="text-left p-4 font-semibold text-gray-800">Phone</th>
                    <th className="text-center p-4 font-semibold text-gray-800">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c, index) => (
                    <tr
                      key={c._id}
                      className={`border-t border-gray-100 transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-blue-50/30'
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mr-3">
                            <span className="font-semibold text-blue-700">
                              {c.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="font-medium text-gray-800">{c.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-700">{c.email}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                          {c.phone}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => deleteContact(c._id)}
                          className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                        >
                          
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
  
          {contacts.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-semibold text-gray-700">{contacts.length}</span> contacts
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-600">Click delete to remove a contact</span>
                  </div>
                  <button
                    onClick={() => onDelete()} // This will refresh the list
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    
                    Refresh List
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }