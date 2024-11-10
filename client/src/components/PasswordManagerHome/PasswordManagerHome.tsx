import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const PasswordManagerHome = () => {
  const { user } = useAuth0();
  const [passwords, setPasswords] = useState([
    { id: 1, website: 'example.com', password: '*****' },
    { id: 2, website: 'another-site.com', password: '*****' },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">Welcome to Your Password Manager</h2>
        <p className="text-gray-700 mb-6">Manage your passwords securely here.</p>

        <div className="mb-4">
          <div className="text-gray-600 mb-2">Logged in as: <strong>{user?.name}</strong></div>
        </div>

        <div className="space-y-4">
          {passwords.map((entry) => (
            <div key={entry.id} className="flex justify-between items-center p-4 border-b border-gray-300 rounded-lg">
              <div className="text-xl">{entry.website}</div>
              <div className="text-sm text-gray-500">{entry.password}</div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Link to="/add-password">
            <button className="w-full py-3 text-lg text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-300">
              Add New Password
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordManagerHome;
