import { FormErrorMessage } from '@chakra-ui/react';
import { FieldErrors } from 'react-hook-form';

type ErrorMessagesProps = {
  errors: FieldErrors<{
    title: string;
    body: string;
  }>;
};

export default function ErrorMessages({
  errors,
}: Readonly<ErrorMessagesProps>) {
  return (
    <ul className="flex flex-col gap-2 rounded-md bg-rose-100 p-2">
      {Object.values(errors).map((value) => (
        <li className="ml-6 list-disc" key={value.type}>
          <FormErrorMessage className="m-0">{value.message}</FormErrorMessage>
        </li>
      ))}
    </ul>
  );
}
