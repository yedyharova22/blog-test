import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import styles from "../styles/Home.module.css";
import { InferGetStaticPropsType } from "next";
import styled from "styled-components";
import React from "react";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  body: string;
};

export const getStaticProps = async () => {
  const res = await fetch("https://simple-blog-api.crew.red/posts");
  const posts: Post[] = await res.json();

  return {
    props: {
      posts,
    },
  };
};

const Home = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>POSTS - My blog</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Main className={styles.main}>
          {posts.map((el, key) => (
            <Link passHref href={`posts/${el.id}`} key={el.id}>
              <Post>
                <H2>{el.title}</H2>
                <Text>{el.body}</Text>
              </Post>
            </Link>
          ))}
        </Main>
      </div>
    </Layout>
  );
};

const Main = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
`;

const Post = styled.div`
  border: solid;
  background-color: #3b383d;
  color: white;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  text-align: justify;
  padding: 5px;
  margin: 10px;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
  overflow-y: auto;
  cursor: pointer;
  border-radius: 20px;
`;

const H2 = styled.h2`
  border-bottom: 0.1rem solid white;
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
`;

const Text = styled.p`
  width: 250px;
  max-height: 150px;
  text-align: justify;
`;

export default Home;
