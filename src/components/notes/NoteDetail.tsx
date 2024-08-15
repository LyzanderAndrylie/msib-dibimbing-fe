'use client';
import { updateNote } from '@/lib/actions';
import { Note, noteSchema, NoteSchema } from '@/lib/types/note';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import ErrorMessages from '../ErrorMessages';
import DeleteNoteModal from './DeleteNoteModal';

export default function NoteDetail({ note }: Readonly<{ note: Note }>) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<NoteSchema>({
    resolver: zodResolver(noteSchema),
  });

  const [isPending, startTransition] = useTransition();

  const handleUpdateNote = (id: string, data: NoteSchema) => {
    startTransition(async () => {
      const { status } = await updateNote(id, data);

      if (!status) {
        toast.error('Failed to update note', {
          autoClose: 2000,
        });
      } else {
        toast.success('Note updated successfully', {
          autoClose: 2000,
        });
        setIsEditing(false);
      }
    });
  };
  const onSubmit = handleSubmit((data) => {
    handleUpdateNote(note.id, data);
  });

  const titleInvalid = !!errors.title;
  const bodyInvalid = !!errors.body;
  const isInvalid = titleInvalid || bodyInvalid;

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-[600px] flex-1 flex-col gap-2 rounded-md border border-slate-200 p-4 shadow-sm"
    >
      <FormControl
        className="flex flex-col gap-4"
        isInvalid={isInvalid}
        isDisabled={isPending}
      >
        {isEditing && isInvalid && <ErrorMessages errors={errors} />}
        <div className="flex items-center justify-between gap-2 text-sm text-slate-600">
          {!isEditing && (
            <>
              <h1 className="text-2xl font-bold">{note.title}</h1>
              <span className="text-nowrap">
                {format(new Date(note.createdAt), 'MMMM d, yyyy')}
              </span>
            </>
          )}
          {isEditing && (
            <>
              <div>
                <div>
                  <FormLabel htmlFor="name" className="sr-only">
                    Title
                  </FormLabel>
                  <Input
                    id="title"
                    {...register('title')}
                    isInvalid={titleInvalid}
                    defaultValue={note.title}
                    className="p-0 text-2xl font-bold"
                    size="sm"
                    placeholder="Title"
                  />
                </div>
              </div>
              <span className="text-nowrap">
                {format(new Date(note.createdAt), 'MMMM d, yyyy')}
              </span>
            </>
          )}
        </div>
      </FormControl>
      {!isEditing && (
        <p className="flex-1 overflow-y-auto text-slate-600">{note.body}</p>
      )}
      {isEditing && (
        <div className="flex flex-1 flex-col">
          <FormLabel htmlFor="name" className="sr-only">
            Body
          </FormLabel>
          <Textarea
            id="body"
            {...register('body')}
            isInvalid={bodyInvalid}
            defaultValue={note.body}
            className="flex-1 p-0 leading-6 text-slate-600"
            placeholder="Type your note here..."
          />
        </div>
      )}

      <div>
        {!isEditing && (
          <div className="flex justify-between">
            <DeleteNoteModal
              id={note.id}
              title={note.title}
              redirect="/notes"
              size="md"
            />
            <Button
              onClick={() => {
                setIsEditing(true);
              }}
              aria-label="Edit Note"
              bgColor="white"
              borderRadius={8}
              size="md"
            >
              <MdEdit />
            </Button>
          </div>
        )}
        {isEditing && (
          <div className="flex justify-end gap-2">
            <Button
              type="submit"
              color="white"
              bgColor="#020617"
              borderRadius={8}
              _hover={{ bgColor: '#334155 ' }}
              isLoading={isPending}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setIsEditing(false);
                reset();
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}
