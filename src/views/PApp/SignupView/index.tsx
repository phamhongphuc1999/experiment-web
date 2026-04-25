'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import PAppGoogleButton from 'src/components/buttons/GoogleButton/PAppGoogleButton';
import BaseAuthorForm from 'src/components/form/BaseAuthorForm';
import { Button } from 'src/components/shadcn/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/shadcn/form';
import { Input, PasswordInput } from 'src/components/shadcn/input';
import { strongPassword } from 'src/configs/zod.config';
import { useSignup } from 'src/queries/papp/auth.query';
import { getAxiosError } from 'src/services';
import z from 'zod';

const signupSchema = z
  .object({
    name: z.string('Please enter username'),
    email: z.email('Please enter a valid email address'),
    password: strongPassword,
    confirmedPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: 'Passwords do not match',
    path: ['confirmedPassword'],
  });

type TFormValues = z.infer<typeof signupSchema>;

export default function SignupView() {
  const form = useForm<TFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', name: '', password: '', confirmedPassword: '' },
  });

  const mutation = useSignup({
    onSuccess: (_, variables) => {
      toast.success('Sign up sent', {
        description: `Verification email sent to ${variables.email}.`,
      });
      form.reset();
    },
    onError: (error) => {
      toast.error(getAxiosError(error) || 'Failed to send invitation', {
        description: 'Please try again later.',
      });
    },
  });

  function onSubmit(values: TFormValues) {
    mutation.mutate({ name: values.name, password: values.password, email: values.email });
  }

  return (
    <BaseAuthorForm form={form} title="Signup" description="Create a new account">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="e.g.example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmedPassword"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Confirmed Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          isLoading={mutation.isPending}
          loadingText="Loading..."
          className="mt-4 h-9 w-full"
        >
          Sign up
        </Button>
      </form>
      <div className="relative mt-6 flex items-center">
        <div className="bg-popover absolute top-1/2 left-1/2 -translate-1/2 px-4">
          <p className="text-sm text-[#6C7278]">or</p>
        </div>
        <div className="h-px w-full bg-[#FFFFFF1F]" />
      </div>
      <PAppGoogleButton className="mt-5" />
      <p className="text-muted-foreground mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link href="/papp/login">
          <span className="text-special font-semibold">Log in</span>
        </Link>
      </p>
    </BaseAuthorForm>
  );
}
