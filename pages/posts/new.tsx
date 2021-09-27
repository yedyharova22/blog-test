import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
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

    setBody("");
    setTitle("");

    router.push("/");
  };

  return (
    <Layout>
      <div>
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
          <Div>
            <Button onClick={fetchPost}>Submit</Button>
            <Button onClick={() => router.push("/")}>Canсel</Button>
          </Div>
        </Main>
      </div>
    </Layout>
  );
};

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;

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

const Button = styled.button`
  width: 130px;
  height: 40px;
  padding: 10px 25px;
  border: 2px solid #000;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;

  background: #000;
  color: #fff;
  line-height: 42px;
  padding: 0;
  border: none;
  z-index: 1;
  -webkit-transition: all 0.3s linear;
  transition: all 0.3s linear;

  :hover {
    background: transparent;
    color: #000;
  }
  :before,
  :after {
    position: absolute;
    content: "";
    left: 0;
    width: 100%;
    height: 50%;
    right: 0;
    z-index: -1;
    background: #000;
    transition: all 0.3s ease;
  }

  :before {
    top: 0;
  }
  :after {
    bottom: 0;
  }
  :hover:before,
  :hover:after {
    height: 0;
    background-color: #000;
  }
`;

export default Home;
