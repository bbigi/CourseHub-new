import { http } from './http';
import type { Course } from '../types/api';

export const courseService = {
  async getCourses(): Promise<Course[]> {
    const response = await http.get('/api/courses');
    return response.data.data ?? response.data;
  },

  async getCourse(id: number): Promise<Course> {
    const response = await http.get(`/api/courses/${id}`);
    return response.data.data ?? response.data;
  },
};
