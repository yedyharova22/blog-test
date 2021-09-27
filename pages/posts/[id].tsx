import type { InferGetStaticPropsType } from "next";
import Head from "next/head";
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

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const [comments] = useState(post.comments);
  const [currentComment, setCurrentComment] = useState("");

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

    router.push("/");
  };

  const addComment = async () => {
    const response = await fetch(`https://simple-blog-api.crew.red/comments`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ postId: post.id, body: currentComment }),
    });

    setCurrentComment("");
    router.push("/");
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

    router.push("/");
  };

  return (
    <Layout>
      <div>
        <Head>
          <title>POST DETAILS - My blog</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Main className={styles.main}>
          <Button onClick={() => router.push("/")}>Go back</Button>
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
          <Div>
            <Button onClick={fetchPost}>Update</Button>
            <Button onClick={deletePost}>Delete</Button>
          </Div>
          <Comments>
            {comments.map((el: any) => (
              <Comment key={el.id}>-{el.body}</Comment>
            ))}
          </Comments>
          <Form>
            <CommentInput
              type="text"
              placeholder="Add comment..."
              value={currentComment}
              onChange={(e) => setCurrentComment(e.target.value)}
              style={{ width: "70%" }}
            />
            <Button onClick={addComment} style={{ width: "30%" }}>
              Post
            </Button>
          </Form>
        </Main>
      </div>
    </Layout>
  );
};

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;

const Comment = styled.p`
  width: 100%;
  max-height: 150px;
  text-align: justify;
  align: left;
`;

const Comments = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  flex-wrap: wrap;
  margin: 10px;
`;

const CommentInput = styled.input`
  border: none;
  border-bottom: 0.1rem solid darkgrey;
  color: black;
  margin-bottom: 5px;
  outline: none;
  background: none;
  font-size: 18px;
  width: 100%;
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px;
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
  min-height: 400px;
  width: 100%;
  text-align: justify;
`;

const Button = styled.button`
  width: 130px;
  height: 40px;
  padding: 10px 25px;
  margin: 10px;
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
