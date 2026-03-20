import { useAuth } from './auth.provider';
import { LoginForm } from '../ui/login-form';

export function LoginPage() {
  const { login, isLoading, error } = useAuth();
  return <LoginForm onSubmit={login} isLoading={isLoading} error={error} />;
}
