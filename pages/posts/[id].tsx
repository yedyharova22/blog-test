import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import Layout from "../../components/layout";
import styles from "/styles/Home.module.css";

type Post = {
  id: number;
  title: string;
  body: string;
  comments: any;
};

export const getServerSideProps = async ({ params }: any) => {
  const res = await fetch(
    `https://simple-blog-api.crew.red/posts/${params.id}?_embed=comments`
  );
  const post: Post = await res.json();
  console.log(post);

  return {
    props: {
      post,
    },
  };
};

const Home = ({
  post,
}: InferGetStaticPropsType<typeof getServerSideProps>): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const [comments, setComments] = useState();

  const fetchPost = async () => {
    const response = await fetch(
      `https://simple-blog-api.crew.red/posts/${post.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title: title, body: body }),
      }
    );

    console.log(response.json());
  };

  const deletePost = async () => {
    const response = await fetch(
      `https://simple-blog-api.crew.red/posts/${post.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );
    console.log(response);

    router.push("/");
  };

  return (
    <Layout>
      <div>
        <Head>
          <title>POST DETAILS - My blog</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <button onClick={() => router.push("/")}>Go back</button>
        <button onClick={fetchPost}>Update</button>
        <button onClick={deletePost}>Delete</button>
        <Main className={styles.main}>
          <Title
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Text
            name=""
            id=""
            placeholder="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </Main>
      </div>
    </Layout>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-width: 300px;
  padding: 10px;
  border-radius: 25px;
  min-height: 80vh;
`;

const Title = styled.input`
  border: none;
  border-bottom: 0.1rem solid darkgrey;
  color: black;
  margin-bottom: 5px;
  outline: none;
  background: none;
  font-size: 36px;
  font-weight: 700;
  width: 100%;
`;

const Text = styled.textarea`
  font-family: "Montserrat", sans-serif;
  border: none;
  margin-top: 5px;
  outline: none;
  background: none;
  font-size: 24px;
  font-weight: 300;
  min-height: 500px;
  width: 100%;
  text-align: justify;
`;

export default Home;
