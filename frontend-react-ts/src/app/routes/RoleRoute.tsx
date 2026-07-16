import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';
import type { AuthUser, UserRole } from '../features/auth/types';

type NonInstructorRole = Exclude<UserRole, 'instructor'>;

type RoleRouteProps =
  | {
      readonly role: NonInstructorRole;
    }
  | {
      readonly role: 'instructor';
      readonly verification: 'verified' | 'unverified';
    };

class UnreachableRouteStateError extends Error {
  readonly name = 'UnreachableRouteStateError';

  constructor(value: never) {
    super(`Status route tidak didukung: ${value}`);
  }
}

function assertNever(value: never): never {
  throw new UnreachableRouteStateError(value);
}

export function canonicalDashboardPath(user: AuthUser): string {
  switch (user.role) {
    case 'student':
      return '/student/dashboard';
    case 'instructor':
      return user.instructor_verification_status === 'verified'
        ? '/instructor/dashboard'
        : '/instructor/status';
    case 'admin':
      return '/admin/dashboard';
    default:
      return assertNever(user.role);
  }
}

export function CanonicalDashboardRedirect() {
  const { user } = useAuth();
  if (!user) return null;
  return <Navigate to={canonicalDashboardPath(user)} replace />;
}

export function roleRouteRedirect(user: AuthUser, props: RoleRouteProps): string | null {
  if (user.role !== props.role) {
    return canonicalDashboardPath(user);
  }

  switch (props.role) {
    case 'student':
    case 'admin':
      return null;
    case 'instructor':
      switch (props.verification) {
        case 'verified':
          return user.instructor_verification_status === 'verified'
            ? null
            : '/instructor/status';
        case 'unverified':
          return user.instructor_verification_status === 'verified'
            ? '/instructor/dashboard'
            : null;
        default:
          return assertNever(props.verification);
      }
    default:
      return assertNever(props);
  }
}

export function RoleRoute(props: RoleRouteProps) {
  const { user } = useAuth();
  if (!user) return null;

  const redirect = roleRouteRedirect(user, props);
  return redirect ? <Navigate to={redirect} replace /> : <Outlet />;
}
