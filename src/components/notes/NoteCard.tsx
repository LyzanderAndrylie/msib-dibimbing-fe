'use client';
import { Note } from '@/lib/types/note';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { Link } from '@chakra-ui/next-js';
import { cn } from '../utils';
import { useEffect, useRef } from 'react';

type NoteCardProps = {
  note: Note;
  isNew?: boolean;
};

export default function NoteCard({ note, isNew }: Readonly<NoteCardProps>) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current?.addEventListener('animationend', () => {
      ref.current?.classList.remove('animate-bgChange');
    });
  }, []);

  return (
    <Link
      href={`/notes/${note.id}`}
      className="group block h-full hover:no-underline"
    >
      <Card
        className={cn(
          'flex h-full flex-col gap-2 p-4 shadow-sm transition-all group-hover:scale-105 group-hover:bg-slate-50',
          {
            'animate-bgChange': isNew,
          },
        )}
        ref={ref}
        variant="unstyled"
        border="1px"
        borderColor="#e2e8f0"
      >
        <CardHeader className="p-0">
          <Heading size="md">{note.title}</Heading>
        </CardHeader>
        <CardBody className="p-0">
          <Text className="line-clamp-6 text-slate-600">{note.body}</Text>
        </CardBody>
        <CardFooter className="flex justify-end p-0">
          <Text className="text-sm text-slate-600">
            {format(new Date(note.createdAt), 'MMMM d, yyyy')}
          </Text>
        </CardFooter>
      </Card>
    </Link>
  );
}
