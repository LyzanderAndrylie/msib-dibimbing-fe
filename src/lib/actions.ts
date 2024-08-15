'use server';

import { gql } from '@apollo/client';
import { getClient } from './apollo/client';
import { NoteSchema } from './types/note';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type MutationResponse = {
  status: boolean;
};

export async function createNote({
  title,
  body,
}: NoteSchema): Promise<MutationResponse> {
  const CREATE_NOTE = gql`
    mutation CreateNote(
      $title: title_String_NotNull_minLength_1!
      $body: body_String_NotNull_minLength_1!
    ) {
      createNote(input: { title: $title, body: $body }) {
        id
      }
    }
  `;

  try {
    const { errors } = await getClient().mutate({
      mutation: CREATE_NOTE,
      variables: { title, body },
    });

    if (errors) throw new Error();

    revalidatePath('/notes');

    return { status: true };
  } catch (error) {
    return { status: false };
  }
}

export async function updateNote(
  id: string,
  { title, body }: NoteSchema,
): Promise<MutationResponse> {
  const UPDATE_NOTE = gql`
    mutation UpdateNote(
      $id: ID!
      $title: title_String_NotNull_minLength_1!
      $body: body_String_NotNull_minLength_1!
    ) {
      updateNote(id: $id, input: { title: $title, body: $body }) {
        id
      }
    }
  `;

  try {
    const { errors } = await getClient().mutate({
      mutation: UPDATE_NOTE,
      variables: { id, title, body },
    });

    if (errors) throw new Error();

    revalidatePath('/notes');

    return { status: true };
  } catch (error) {
    return { status: false };
  }
}

type deleteNoteOptions = {
  redirect?: string;
};

export async function deleteNote(
  id: string,
  options?: deleteNoteOptions,
): Promise<MutationResponse> {
  const DELETE_NOTE = gql`
    mutation DeleteNote($id: ID!) {
      deleteNote(id: $id) {
        id
      }
    }
  `;

  let result;
  try {
    result = await getClient().mutate({
      mutation: DELETE_NOTE,
      variables: { id },
    });

    if (result.errors) throw new Error();
  } catch (error) {
    return { status: false };
  }

  revalidatePath('/notes');
  revalidatePath('/notes/[id]', 'page');

  if (options?.redirect) redirect(options.redirect);

  return { status: true };
}
