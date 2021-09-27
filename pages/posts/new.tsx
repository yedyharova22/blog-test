import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import Layout from "../../components/layout";
import styles from "/styles/Home.module.css";
import styled from "styled-components";

type Post = {
  title: string;
  body: string;
};

const Home: NextPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const fetchPost = async (): Promise<void> => {
    const response = await fetch("https://simple-blog-api.crew.red/posts", {
      method: "POST",
      body: JSON.stringify({ title: title, body: body }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.json();
    console.log(data);

    setBody("");
    setTitle("");

    router.push("/");
  };

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>NEW POST - My blog</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Main>
          <Title
            type="text"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Text
            placeholder="Text..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button onClick={fetchPost}>Submit</button>
          <button onClick={() => router.push("/")}>Canсel</button>
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
  min-height: 80%;
  width: 100%;
  text-align: justify;
`;

export default Home;
