import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import "./App.css";

const END_POINT = "https://jsonplaceholder.typicode.com/todos";

function App() {
  const queryClient = useQueryClient();

  const [input, setInput] = useState("");

  const fetchFn = async () => {
    const res = await fetch(END_POINT);
    const result = await res.json();

    return result;
  };

  const postTodo = async (todoData: Record<string, string | number>) => {
    const res = await fetch(END_POINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });
    const result = await res.json();
    return result;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["test"],
    queryFn: fetchFn,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: postTodo,
    onMutate: (userData) => {
      const prevData = queryClient.getQueryData(["test"]);

      queryClient.setQueryData(["test"], (old: Record<string, string | number>[]) => [
        ...old,
        userData,
      ]);

      return { prevData }; // onError나 onSettled에서 context로 받음
    },
    onError: (err, newTodo, context) => {
      console.log(err);
      queryClient.setQueryData(["test"], context?.prevData);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["test"] });
    },

    onSuccess: () => {
      alert("데이터 입력 성공");
    },
  });

  if (error) return <div>에러 발생 : {error.message}</div>;

  if (isPending) return <h1>유저가 보낸 데이터 입력 중..</h1>;

  return (
    <>
      <h1>{isLoading && "로딩 중"}</h1>
      <ul>
        {data?.map((todo: Record<string, string | number>) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          mutate({
            userId: "test",
            title: input,
            body: input,
          });
          setInput("");
        }}>
        제출
      </button>
    </>
  );
}

export default App;
