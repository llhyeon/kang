import { useQuery } from "@tanstack/react-query";

const END_POINT = "https://jsonplaceholder.typicode.com/todos";

const fetchFn = async ({ queryKey }: { queryKey: string[] }) => {
  const res = await fetch(END_POINT);
  const result = await res.json();

  const [_, arg1, arg2] = queryKey;
  const point = `${END_POINT}/${arg1}/${arg2}`;
  console.log(point);
  return result;
};

export const useFetch = () => {
  return useQuery({
    queryKey: ["test", "test1", "test2"],
    queryFn: fetchFn,
  });
};
