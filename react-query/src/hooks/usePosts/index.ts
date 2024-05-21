import ky from "ky";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async (limit = 10) => {
  const parsed: IPosts = await ky(
    "https://jsonplaceholder.typicode.com/posts"
  ).json();
  return parsed.filter((x) => x.id <= limit);
};

const usePosts = (limit: number) => {
  return useQuery({
    queryKey: ["posts", limit], // The query key to use for this query and page number
    queryFn: () => fetchPosts(limit), // The function that the query will use to request data
  });
};

export { usePosts, fetchPosts };
