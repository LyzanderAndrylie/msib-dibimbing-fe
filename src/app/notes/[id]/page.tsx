import ButtonLink from '@/components/ButtonLink';
import { getNote } from '@/lib/data';
import { format } from 'date-fns';
import { IoChevronBackOutline } from 'react-icons/io5';
import DeleteNoteModal from '@/components/notes/DeleteNoteModal';

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
        {data.note && (
          <div className="flex w-full max-w-[600px] flex-1 flex-col gap-2 rounded-md border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <h1 className="text-2xl font-bold">{data.note.title}</h1>
              {format(new Date(data.note.createdAt), 'MMMM d, yyyy')}
            </div>
            <p className="flex-1 overflow-y-auto text-slate-600">
              {data.note.body}
            </p>
            <div>
              <DeleteNoteModal
                id={id}
                title={data.note.title}
                redirect="/notes"
                size="md"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
