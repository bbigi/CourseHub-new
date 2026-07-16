import axios from 'axios';
import { http } from './http';
import {
  AuthApiError,
  type AccountStatus,
  type AuthUser,
  type InstructorVerificationStatus,
  type LoginPayload,
  type LoginResult,
  type RegistrationPayload,
  type UserRole,
  type ValidationErrors,
} from '../features/auth/types';

type JsonObject = Readonly<Record<string, unknown>>;

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseRole(value: unknown): UserRole {
  switch (value) {
    case 'student':
    case 'instructor':
    case 'admin':
      return value;
    default:
      throw new AuthApiError(0, 'Role pengguna dari server tidak valid.');
  }
}

function parseAccountStatus(value: unknown): AccountStatus {
  switch (value) {
    case 'active':
    case 'inactive':
      return value;
    default:
      throw new AuthApiError(0, 'Status akun dari server tidak valid.');
  }
}

function parseVerificationStatus(value: unknown): InstructorVerificationStatus | null {
  switch (value) {
    case null:
    case undefined:
      return null;
    case 'pending':
    case 'verified':
    case 'rejected':
      return value;
    default:
      throw new AuthApiError(0, 'Status verifikasi instruktur dari server tidak valid.');
  }
}

function parseUser(value: unknown): AuthUser {
  if (!isJsonObject(value)) {
    throw new AuthApiError(0, 'Data pengguna dari server tidak valid.');
  }

  const { id, name, email, role, account_status: accountStatus } = value;
  if (typeof id !== 'number' || !Number.isInteger(id) || id < 1) {
    throw new AuthApiError(0, 'ID pengguna dari server tidak valid.');
  }
  if (typeof name !== 'string' || typeof email !== 'string') {
    throw new AuthApiError(0, 'Profil pengguna dari server tidak lengkap.');
  }

  const rejectionReason = value.rejection_reason;
  return {
    id,
    name,
    email,
    role: parseRole(role),
    account_status: parseAccountStatus(accountStatus),
    instructor_verification_status: parseVerificationStatus(value.instructor_verification_status),
    rejection_reason: typeof rejectionReason === 'string' ? rejectionReason : null,
  };
}

function parseValidationErrors(value: unknown): ValidationErrors {
  if (!isJsonObject(value)) return {};

  const errors: Record<string, string> = {};
  for (const [field, message] of Object.entries(value)) {
    if (typeof message === 'string') {
      errors[field] = message;
      continue;
    }
    if (Array.isArray(message) && message.every((item) => typeof item === 'string')) {
      errors[field] = message.join(' ');
    }
  }
  return errors;
}

function parseEnvelope(value: unknown): JsonObject {
  if (!isJsonObject(value) || value.success !== true || !('data' in value)) {
    throw new AuthApiError(0, 'Respons server tidak valid.');
  }
  return value;
}

function toAuthApiError(error: unknown): AuthApiError {
  if (error instanceof AuthApiError) return error;

  if (axios.isAxiosError(error)) {
    const body: unknown = error.response?.data;
    const message = isJsonObject(body) && typeof body.message === 'string'
      ? body.message
      : 'Tidak dapat terhubung ke server.';
    const errors = isJsonObject(body) ? parseValidationErrors(body.errors) : {};
    return new AuthApiError(error.response?.status ?? 0, message, errors);
  }

  if (error instanceof Error) {
    return new AuthApiError(0, 'Respons server tidak dapat diproses.');
  }
  return new AuthApiError(0, 'Terjadi kesalahan yang tidak dikenal.');
}

async function login(payload: LoginPayload): Promise<LoginResult> {
  try {
    const response = await http.post<unknown>('/api/auth/login', payload);
    const envelope = parseEnvelope(response.data);
    const data = envelope.data;
    if (!isJsonObject(data)) throw new AuthApiError(0, 'Data login dari server tidak valid.');
    if (typeof data.access_token !== 'string' || typeof data.expires_in !== 'number') {
      throw new AuthApiError(0, 'Token login dari server tidak valid.');
    }
    return {
      accessToken: data.access_token,
      expiresIn: data.expires_in,
      user: parseUser(data.user),
    };
  } catch (error) {
    throw toAuthApiError(error);
  }
}

async function register(path: string, payload: RegistrationPayload): Promise<void> {
  try {
    const response = await http.post<unknown>(path, payload);
    parseEnvelope(response.data);
  } catch (error) {
    throw toAuthApiError(error);
  }
}

async function getMe(): Promise<AuthUser> {
  try {
    const response = await http.get<unknown>('/api/me');
    const envelope = parseEnvelope(response.data);
    const data = envelope.data;
    if (isJsonObject(data) && 'user' in data) return parseUser(data.user);
    return parseUser(data);
  } catch (error) {
    throw toAuthApiError(error);
  }
}

async function logout(): Promise<void> {
  try {
    await http.post('/api/auth/logout');
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
  }
}

export const authService = {
  login,
  registerStudent: (payload: RegistrationPayload) => register('/api/auth/register-student', payload),
  registerInstructor: (payload: RegistrationPayload) => register('/api/auth/register-instructor', payload),
  getMe,
  logout,
};
