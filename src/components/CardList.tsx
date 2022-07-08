import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card as CardComponent } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCardUrl, setSelectedCardUrl] = useState<string | null>(null);

  const handleViewImage = (url: string): void => {
    setSelectedCardUrl(url);
    onOpen();
  };

  return (
    <>
      <SimpleGrid columns={3} spacing={10}>
        {cards.map(card => (
          <CardComponent
            key={card.id}
            data={card}
            viewImage={handleViewImage}
          />
        ))}
      </SimpleGrid>

      <ModalViewImage
        isOpen={isOpen}
        imgUrl={selectedCardUrl}
        onClose={onClose}
      />
    </>
  );
}
