export const USER_ROLES = ['student', 'instructor', 'admin'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const ACCOUNT_STATUSES = ['active', 'inactive'] as const;
export type AccountStatus = (typeof ACCOUNT_STATUSES)[number];

export const INSTRUCTOR_VERIFICATION_STATUSES = ['pending', 'verified', 'rejected'] as const;
export type InstructorVerificationStatus = (typeof INSTRUCTOR_VERIFICATION_STATUSES)[number];

export type AuthUser = {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly role: UserRole;
  readonly account_status: AccountStatus;
  readonly instructor_verification_status: InstructorVerificationStatus | null;
  readonly rejection_reason: string | null;
};

export type LoginPayload = {
  readonly email: string;
  readonly password: string;
};

export type RegistrationPayload = {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly password_confirmation: string;
};

export type LoginResult = {
  readonly accessToken: string;
  readonly expiresIn: number;
  readonly user: AuthUser;
};

export type ValidationErrors = Readonly<Record<string, string>>;

export class AuthApiError extends Error {
  readonly name = 'AuthApiError';

  constructor(
    readonly status: number,
    message: string,
    readonly errors: ValidationErrors = {},
  ) {
    super(message);
  }
}
