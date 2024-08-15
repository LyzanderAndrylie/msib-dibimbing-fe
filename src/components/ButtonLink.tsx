'use client';
import { Link } from '@chakra-ui/next-js';
import { cn } from './utils';

type ButtonLinkProps = {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  href: string;
};

export default function ButtonLink({
  children,
  variant = 'primary',
  className,
  href,
}: Readonly<ButtonLinkProps>) {
  return (
    <Link
      href={href}
      className={`${cn(
        'flex h-10 w-32 items-center justify-center rounded-lg font-medium hover:no-underline',
        {
          'bg-slate-950 text-white hover:bg-slate-700': variant === 'primary',
          'border border-slate-200 bg-white text-black hover:bg-slate-100':
            variant === 'secondary',
        },
        className,
      )}`}
    >
      {children}
    </Link>
  );
}
