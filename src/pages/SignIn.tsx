import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { Logo } from '@/components/Logo';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';

interface SignInData {
  email: string;
  password: string;
}

const SignInSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail' }),
  password: z.string().min(1, { message: 'Required' }),
});

const SignIn = () => {
  const form = useForm<SignInData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email:
        process.env.NODE_ENV === 'development'
          ? 'programador@programador.me'
          : '',
      password: process.env.NODE_ENV === 'development' ? 'secret' : '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: SignInData) => {
    try {
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <FormProvider {...form}>
        <form
          autoCapitalize="off"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-[450px] max-w-[100%] flex-col items-center justify-center gap-4 rounded-lg border bg-gray-100 p-10"
        >
          <Logo />

          <h2 className="text-xl">Sign In</h2>

          <TextInput
            type="email"
            placeholder="Your E-mail"
            error={errors.email}
            {...register('email')}
          />

          <TextInput
            type="password"
            placeholder="Your Password"
            error={errors.password}
            {...register('password')}
          />

          <Button>Sign In</Button>

          <span>
            Don&apos;t have account ? <Link to="/signup">Register</Link>
          </span>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignIn;
