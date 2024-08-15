import CreateNoteModal from '@/components/notes/CreateNoteModal';
import NoteCard from '@/components/notes/NoteCard';
import { getNotes } from '@/lib/data';
import { Note, NoteSortOrder } from '@/lib/types/note';
import SortBySelect from '@/components/notes/SelectSortBy';
import { cn } from '@/components/utils';

type PageProps = {
  searchParams?: {
    sort?: NoteSortOrder;
  };
};

export default async function Page({
  searchParams: { sort = NoteSortOrder.desc } = {},
}: Readonly<PageProps>) {
  const { data, errors } = await getNotes(sort);

  return (
    <main className="flex min-h-screen flex-col lg:flex-row">
      <div className="flex items-center justify-between gap-6 border-b border-r-slate-200 p-4 lg:w-24 lg:flex-col lg:justify-normal lg:border-b-0 lg:border-r">
        <div className="font-bold">MyNote</div>
        <div>
          <CreateNoteModal />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-10 p-6">
        <div className="flex justify-between gap-4">
          <h1 className="text-2xl font-bold">Notes</h1>
          <SortBySelect sort={sort} />
        </div>
        <div
          className={cn('grid flex-1 gap-6', {
            'items-center justify-center':
              (data?.notes && data.notes.length === 0) || errors,
            'auto-rows-[250px] grid-cols-[repeat(auto-fill,minmax(300px,1fr))]':
              data?.notes && data.notes.length !== 0,
          })}
        >
          {errors && (
            <div className="text-center text-xl text-slate-600">
              Error occurred while fetching notes 😔. Please try again later.
            </div>
          )}
          {data?.notes &&
            (data.notes.length === 0 ? (
              <div className="text-center text-xl text-slate-600">
                Ready to start something new? Create your first note now and
                capture your thoughts!
              </div>
            ) : (
              data.notes.map((note: Note) => (
                <NoteCard key={note.id} note={note} />
              ))
            ))}
        </div>
      </div>
    </main>
  );
}
