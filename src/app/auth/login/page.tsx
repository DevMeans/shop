
import { titlefont } from '@/config/fonts';
import Link from 'next/link';
import { LoginForm } from './ui/LoginForm';

export default function LoginHome() {
  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={`${titlefont.className} text-4xl mb-5`}>Ingresar</h1>

      <LoginForm />
    </main>
  );
}