'use client';
import { deleteNote } from '@/lib/actions';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ResponsiveValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useState, useTransition } from 'react';
import { TbTrashXFilled } from 'react-icons/tb';
import { toast } from 'react-toastify';

type DeleteNoteModalProps = {
  id: string;
  title: string;
  redirect?: string;
  size: ResponsiveValue<string> | undefined;
};

export default function DeleteNoteModal({
  id,
  title,
  redirect,
  size,
}: Readonly<DeleteNoteModalProps>) {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [isPending, startTransition] = useTransition();
  const handleCreateNote = () => {
    startTransition(async () => {
      const { status } = await deleteNote(id, {
        redirect,
      });

      if (!status) {
        toast.error('Failed to delete note', {
          autoClose: 2000,
        });
      } else {
        toast.success('Note deleted successfully', {
          autoClose: 2000,
        });
        onClose();
      }
    });
  };

  return (
    <>
      <Button
        onClick={(e) => {
          e.preventDefault();
          setOverlay(<OverlayOne />);
          onOpen();
        }}
        aria-label="Delete Note"
        bgColor="white"
        borderRadius={8}
        size={size}
      >
        <TbTrashXFilled />
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Delete Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="p-6">
            Are you sure you want to delete{' '}
            <span className="font-bold">{title}</span>?
          </ModalBody>
          <ModalFooter className="flex justify-end gap-2">
            <Button
              color="white"
              bgColor="#020617"
              borderRadius={8}
              _hover={{ bgColor: '#334155 ' }}
              onClick={handleCreateNote}
              isLoading={isPending}
            >
              Yes
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
