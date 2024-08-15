'use client';
import ButtonLink from '@/components/ButtonLink';

export default function ErrorPage({
  error,
}: Readonly<{
  error: Error & { digest?: string };
}>) {
  return (
    <main className="flex h-screen flex-col items-center justify-center px-8 py-10 text-base md:px-10 md:text-xl">
      <h2 className="text-center">Something went wrong!</h2>
      <p className="text-primary mb-4 text-center text-base font-bold md:text-xl">
        {error.message}
      </p>
      <ButtonLink
        className="bg-primary mb-7 flex w-full max-w-[330px] px-[14px] text-xs font-bold text-white md:mx-auto md:mb-8 md:text-sm"
        href="/"
      >
        Return to Homepage
      </ButtonLink>
    </main>
  );
}
