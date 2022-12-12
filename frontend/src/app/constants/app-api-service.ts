import axios from 'axios';

export const AppApiService = axios.create({
    baseURL: `${process.env['REACT_APP_API_SERVICE']}${process.env['REACT_APP_API_VERSION']}`,
});
