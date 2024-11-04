import { User } from '@/types/User';
import apiClient from '../http-common';

export async function getUser(): Promise<User> {
    const response = await apiClient.get('/user');
    return response.data;
}
