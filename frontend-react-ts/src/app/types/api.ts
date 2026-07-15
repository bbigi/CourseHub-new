export type Course = {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  level: 'pemula' | 'menengah' | 'lanjutan';
  price: number;
  status: 'draft' | 'published' | 'archived';
  instructor_id: number;
  thumbnail?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type Enrollment = {
  id: number;
  user_id: number;
  course_id: number;
  status: 'aktif' | 'selesai' | 'dibatalkan';
  progress: number;
  enrolled_at: string;
  completed_at?: string | null;
};

export type CreateEnrollmentPayload = {
  userId: number;
  courseId: number;
};
