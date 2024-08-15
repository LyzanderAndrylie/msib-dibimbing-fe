'use client';
import { Link } from '@chakra-ui/next-js';
import { Select } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { NoteSortOrder } from '@/lib/types/note';

type SelectSortByProps = {
  sort: NoteSortOrder;
};

export default function SelectSortBy({ sort }: Readonly<SelectSortByProps>) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <div className="text-nowrap text-sm">Sort By:</div>
      <Select
        onChange={(e) => {
          router.replace(`/notes?sort=${e.target.value}`);
        }}
        defaultValue={sort}
        size="sm"
      >
        <option value="desc">Newest</option>
        <option value="asc">Oldest</option>
      </Select>
    </div>
  );
}
