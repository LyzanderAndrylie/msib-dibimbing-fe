import ButtonLink from '@/components/ButtonLink';
import { getNote } from '@/lib/data';
import { Note } from '@/lib/types/note';
import { IoChevronBackOutline } from 'react-icons/io5';
import NoteDetail from '@/components/notes/NoteDetail';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: Readonly<PageProps>) {
  const { data, errors } = await getNote(id);

  return (
    <div className="flex min-h-screen flex-col gap-6 p-6">
      <div>
        <ButtonLink href="/notes" variant="secondary" className="flex gap-1">
          <IoChevronBackOutline />
          Back
        </ButtonLink>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        {errors && (
          <div className="text-center text-xl text-slate-600">
            Error occurred while fetching the note 😔. Make sure the ID is
            correct or try again later 🤔.
          </div>
        )}
        {data.note && <NoteDetail note={data.note as Note} />}
      </div>
    </div>
  );
}
