import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Logo } from '@/components/Logo';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

const SignUpSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: 'Invalid e-mail' }),
  password: z.string().min(1, { message: 'Required' }),
});

const SignUp = () => {
  const form = useForm<SignUpData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: process.env.NODE_ENV === 'development' ? 'Thiago' : '',
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

  const onSubmit = (data: SignUpData) => {
    console.log(JSON.stringify(data));
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

          <h2 className="text-xl">Sign Up</h2>

          <TextInput
            placeholder="Your Name"
            error={errors.name}
            {...register('name')}
          />
          <TextInput
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

          <Button>Sign Up</Button>

          <span>
            Already have an account ? <Link to="/signin">Sign In</Link>
          </span>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUp;
