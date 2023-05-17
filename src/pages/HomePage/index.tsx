import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { API_URL } from "../../api";
import Post, { IPost } from "../../components/Post";

const HomePage = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(API_URL + "/posts");
      const data = await response.json();
      setPosts(data);
    };

    getPosts();
  }, []);

  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid item key={post.id}>
          <Post {...post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default HomePage;
