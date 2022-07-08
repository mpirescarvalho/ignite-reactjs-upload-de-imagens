import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { api } from '../services/api';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface ImagesResponse {
  after?: string;
  data: {
    id: string;
    title: string;
    description: string;
    url: string;
    ts: number;
  }[];
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    ({ pageParam = null }) =>
      api.get<ImagesResponse>(`api/images`, {
        params: {
          after: pageParam,
        },
      }),
    { getNextPageParam: lastPage => lastPage.data.after ?? null }
  );

  const formattedData = useMemo(() => {
    if (!data) return [];

    return data.pages.reduce((prev, curr) => {
      return [...prev, ...curr.data.data];
    }, []);
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button mt={10} onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
