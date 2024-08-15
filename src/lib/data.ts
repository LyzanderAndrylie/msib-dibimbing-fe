import { query } from './apollo/client';
import { gql } from '@apollo/client';
import { NoteSortOrder } from './types/note';

export async function getNotes(sortOrder: NoteSortOrder) {
  if (!Object.values(NoteSortOrder).includes(sortOrder))
    sortOrder = NoteSortOrder.desc;

  const GET_NOTES = gql`
    query Notes($sortOrder: Order) {
      notes(orderBy: { createdAt: $sortOrder }) {
        id
        title
        body
        createdAt
      }
    }
  `;

  try {
    const result = await query({
      query: GET_NOTES,
      variables: { sortOrder },
    });

    return result;
  } catch (error) {
    return { data: {}, errors: error as Error };
  }
}

export async function getNote(id: string) {
  const GET_NOTE = gql`
    query Note($id: ID!) {
      note(id: $id) {
        id
        title
        body
        createdAt
      }
    }
  `;

  try {
    const result = await query({
      query: GET_NOTE,
      variables: { id },
    });

    return result;
  } catch (error) {
    return { data: {}, errors: error as Error };
  }
}
