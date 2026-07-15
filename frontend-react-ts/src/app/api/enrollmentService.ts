import { http } from './http';
import type { CreateEnrollmentPayload, Enrollment } from '../types/api';

export const enrollmentService = {
  async enroll(payload: CreateEnrollmentPayload): Promise<Enrollment> {
    const response = await http.post('/api/enroll', payload);
    return response.data.data ?? response.data;
  },
};
