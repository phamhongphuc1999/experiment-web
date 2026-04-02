'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { AbstractAuthorForm } from 'src/components/form/BaseAuthorForm';
import { Button } from 'src/components/shadcn/button';
import { useVerifyEmail } from 'src/queries/papp/auth.query';

export default function VerifyEmailView() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  const { mutate, isPending } = useVerifyEmail({
    onSuccess: () => {
      toast.success('Verify success');
      router.push('/papp/login');
    },
  });

  function onVerifyEmail() {
    if (token) mutate({ token });
    else toast.error('Token not found');
  }

  return (
    <AbstractAuthorForm title="Verify Email" description="Verify Email">
      <div className="flex items-center gap-2">
        <Button isLoading={isPending} onClick={onVerifyEmail}>
          Verify
        </Button>
        <Link href="/papp/login">
          <Button variant="outline">Login</Button>
        </Link>
      </div>
    </AbstractAuthorForm>
  );
}
