import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { baseURL } from './EnvUtils';

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL(), // Replace with your API base URL
  timeout: 5000, // Set a timeout value if needed
  headers: {
    'Content-Type': 'application/json', // Set the desired content type
  },
});

// Function for making a GET request
async function get(url: string): Promise<AxiosResponse> {
  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    throw new Error(String(error)); // Convert error to string
  }
}

// Function for making a POST request
async function post(url: string, data: any): Promise<AxiosResponse> {
  try {
    const response = await axiosInstance.post(url, data);
    return response;
  } catch (error) {
    throw new Error(String(error)); // Convert error to string
  }
}

// Function for making a PUT request
async function put(url: string, data: any): Promise<AxiosResponse> {
  try {
    const response = await axiosInstance.put(url, data);
    return response;
  } catch (error) {
    throw new Error(String(error));
  }
}

// Function for making a PATCH request
async function patch(url: string, data: any): Promise<AxiosResponse> {
  try {
    const response = await axiosInstance.patch(url, data);
    return response;
  } catch (error) {
    throw new Error(String(error)); // Convert error to string
  }
}

// Function for making a DELETE request
async function del(url: string): Promise<AxiosResponse> {
  try {
    const response = await axiosInstance.delete(url);
    return response;
  } catch (error) {
    throw new Error(String(error)); // Convert error to string
  }
}

export { get, post, put, patch, del };
