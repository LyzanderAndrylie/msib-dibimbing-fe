'use server';

import { gql } from '@apollo/client';
import { query, getClient } from './apollo/client';
import { CreateNote } from './types/note';
import { revalidatePath } from 'next/cache';

type MutationResponse = {
  status: boolean;
};

export async function createNote({
  title,
  body,
}: CreateNote): Promise<MutationResponse> {
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

export async function updateNote() {}

export async function deleteNote() {}
