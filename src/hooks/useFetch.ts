import { useQuery } from '@tanstack/react-query';

async function fetchData({ queryKey }: { queryKey: string[] }) {
  const [_, url] = queryKey;
  const response = await fetch(url);
  const result = await response.json();

  return result;
}

export default function useFetch(url: string) {
  return useQuery({
    queryKey: ['fetch', url],
    queryFn: fetchData,
    staleTime: 5000,
    gcTime: 10000,
  });
}
