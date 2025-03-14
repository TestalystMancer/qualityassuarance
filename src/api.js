import {axios} from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchAlbums = async () => {
    const response = await axios.get(`${BASE_URL}/albums`);
    return response.data;
};

export const fetchPhotos = async () => {
    const response = await axios.get(`${BASE_URL}/photos`);
    return response.data;
};

export const fetchUsers = async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
};

export const fetchAlbumById = async (id) => {
    const response = await axios.get(`${BASE_URL}/albums/${id}`);
    return response.data;
};

export const fetchPhotoById = async (id) => {
    const response = await axios.get(`${BASE_URL}/photos/${id}`);
    return response.data;
};

export const fetchUserById = async (id) => {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    return response.data;
};
