'use server';


import { signIn } from '@/auth.config';
import { sleep } from '@/util';

 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {

    // await sleep(2);
    sleep(2)
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Success';


  } catch (error) {

    return 'CredentialsSignin'


  }
}