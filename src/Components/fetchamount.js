import React from 'react'

import { baseURL } from '../token';
import axios from 'axios';
export const fetchamount = async () => {
    try {
        // console.log(accessToken);
        const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
        // console.log(accessToken);
        // const accessToken = token;
        const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
        // console.log(headers);
        const response = await axios.get(baseURL + '/user/profile', {
            headers: headers
        });
        return response?.data?.data?.income_report?.totalincome;
        // console.log("amount", amount);
    } catch (error) {
        console.error("error:--", error);
    }
}