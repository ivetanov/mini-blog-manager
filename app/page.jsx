import PostsList from "./components/PostsList";

export const revalidate = 600;
//TODO: metadata

export default async function HomePage() {
  return (
    <>
      <PostsList />
    </>
  );
}