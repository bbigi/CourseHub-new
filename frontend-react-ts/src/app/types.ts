// ═══════════════════════════════════════════════════════════════════════════════
// TYPES & INTERFACES
// ═══════════════════════════════════════════════════════════════════════════════

export type Page = "landing" | "login" | "register" | "dashboard";
export type Role = "student" | "admin" | "instructor";
export type InstrId = 1 | 2;

export interface Nav {
  page: Page;
  role?: Role;
  instrId?: InstrId;
}

export interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  enrolled: number;
  rating: number;
  progress?: number;
  image: string;
}

export interface Material {
  id: number;
  courseId: number;
  courseName: string;
  title: string;
  type: "video" | "doc" | "quiz";
  duration?: string;
  completed?: boolean;
}

export interface Enrollment {
  id: number;
  studentName: string;
  courseName: string;
  date: string;
  status: "active" | "completed";
  progress: number;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  enrollments: number;
  status: "active" | "inactive";
  joinDate: string;
}

export interface Certificate {
  id: number;
  studentName: string;
  courseName: string;
  completionDate: string;
  instructor: string;
  score: number;
  certificateNumber: string;
}

export interface Activity {
  id: number;
  type: "enrollment" | "completion" | "material" | "certificate";
  title: string;
  description: string;
  time: string;
  user?: string;
  details?: any;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning";
}

export interface InstructorAccount {
  id: InstrId;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  expertise: string[];
  totalStudents: number;
  totalCourses: number;
  rating: number;
  joinDate: string;
}
