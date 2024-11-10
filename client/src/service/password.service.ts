import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

// Create a PasswordService class to handle API requests
class PasswordService {
  private apiUrl: string = import.meta.env.API_URL;

  constructor(private accessToken: string) {}

  // This method will send a GET request to fetch the user's passwords
  async getPasswords() {
    try {
      const response = await axios.get(`${this.apiUrl}/passwords`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`, // Use the Auth0 token for authorization
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching passwords', error);
      throw error;
    }
  }

  // This method will send a POST request to add a new password
  async addPassword(passwordData: any) {
    try {
      const response = await axios.post(
        `${this.apiUrl}/test`,
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`, // Use the Auth0 token for authorization
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding password', error);
      throw error;
    }
  }

  // This method will send a PUT request to update an existing password
  async updatePassword(passwordId: string, passwordData: any) {
    try {
      const response = await axios.put(
        `${this.apiUrl}/passwords/${passwordId}`,
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`, // Use the Auth0 token for authorization
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating password', error);
      throw error;
    }
  }

  // This method will send a DELETE request to delete a password
  async deletePassword(passwordId: string) {
    try {
      const response = await axios.delete(`${this.apiUrl}/passwords/${passwordId}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`, // Use the Auth0 token for authorization
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting password', error);
      throw error;
    }
  }
}

// Create an instance of PasswordService using the Auth0 token
export const usePasswordService = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchService = async () => {
    const accessToken = await getAccessTokenSilently();
    return new PasswordService(accessToken);
  };

  return fetchService;
};

