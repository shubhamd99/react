import React from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Header, InfoBox, Layout, PostList } from "@/components";
import { fetchPosts } from "@/hooks";

const Home = () => {
  return (
    <Layout>
      <Header />
      <InfoBox>ℹ️ This page shows how to use SSG with React-Query.</InfoBox>
      <PostList />
    </Layout>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts", 10], // The query key to use for this query and page number
    queryFn: () => fetchPosts(10), // The function that the query will use to request data
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Home;
