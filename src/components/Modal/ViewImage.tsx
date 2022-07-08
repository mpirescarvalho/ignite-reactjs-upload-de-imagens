import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent bgColor="pGray.800" isCentered w="auto" maxW="900px">
        <ModalBody padding={0}>
          <Image
            src={imgUrl}
            alt="image"
            objectFit="contain"
            maxW="900px"
            maxH="600px"
          />
        </ModalBody>

        <ModalFooter justifyContent="flex-start">
          <Link href={imgUrl} target="_blank" rel="noreferrer">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
