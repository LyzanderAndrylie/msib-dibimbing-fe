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
