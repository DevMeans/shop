
import { titlefont } from '@/config/fonts';

import { RegisterForm } from './ui/RegisterForm';

export default function LoginHome() {


  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={`${titlefont.className} text-4xl mb-5`}>Nueva cuenta</h1>

      <RegisterForm />
    </main>
  );
}