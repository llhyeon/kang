import { useFetch } from "./lib/useFetch";

function App() {
  const { data, error, isPending } = useFetch("test");

  if (error) return <h1>에러 발생 {error.message}</h1>;

  return (
    <>
      <h1>{isPending && "로딩 중"}</h1>
      <ul>
        {data?.map((todo: Record<string, string | number>) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
