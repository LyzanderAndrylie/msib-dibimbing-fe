'use client';
import { CreateNote, createNoteSchema } from '@/lib/types/note';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { createNote } from '@/lib/actions';
import { toast } from 'react-toastify';

export default function CreateNoteModal() {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);

  return (
    <>
      <Button
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
        aria-label="Create Note"
        bgColor="#020617"
        borderRadius={8}
        _hover={{ bgColor: '#334155 ' }}
      >
        <FaPlus color="white" />
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Create Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="p-6">
            <CreateNoteForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

type CreateNoteFormProps = {
  onClose?: () => void;
};

function CreateNoteForm({ onClose }: Readonly<CreateNoteFormProps>) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateNote>({
    resolver: zodResolver(createNoteSchema),
  });

  const [isPending, startTransition] = useTransition();

  const handleCreateNote = (data: CreateNote) => {
    startTransition(async () => {
      const { status } = await createNote(data);

      if (!status) {
        toast.error('Failed to create note', {
          autoClose: 2000,
        });
      } else {
        toast.success('Note created successfully', {
          autoClose: 2000,
        });
        onClose?.();
      }
    });
  };
  const onSubmit = handleSubmit(handleCreateNote);

  const titleInvalid = !!errors.title;
  const bodyInvalid = !!errors.body;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <h2 className="sr-only">Create Note Form</h2>
      <FormControl
        className="flex flex-col gap-4"
        isInvalid={titleInvalid || bodyInvalid}
        isDisabled={isPending}
      >
        <div>
          <FormLabel htmlFor="name">Title</FormLabel>
          <Input id="title" {...register('title')} isInvalid={titleInvalid} />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </div>
        <div>
          <FormLabel htmlFor="name">Body</FormLabel>
          <Textarea id="body" {...register('body')} isInvalid={bodyInvalid} />
          <FormErrorMessage>
            {errors.body && errors.body.message}
          </FormErrorMessage>
        </div>
      </FormControl>
      <Button
        mt={4}
        className="self-end rounded-lg bg-slate-950 text-end text-white hover:bg-slate-700"
        isLoading={isPending}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}
