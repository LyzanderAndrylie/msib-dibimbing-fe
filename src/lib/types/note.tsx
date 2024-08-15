import { z } from 'zod';

export type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

export enum NoteSortOrder {
  asc = 'asc',
  desc = 'desc',
}

export const noteSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required and should be at least 1 character'),
  body: z
    .string()
    .min(1, 'Body is required and should be at least 1 character'),
});

export type NoteSchema = z.infer<typeof noteSchema>;
