import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Navbar = (): JSX.Element => (
  <Nav>
    <Ul>
      <Li>
        <Link passHref href="/">
          <A>Home</A>
        </Link>
      </Li>
      <Brand>My blog</Brand>
      <Li>
        <Link passHref href="/posts/new">
          <A>Create</A>
        </Link>
      </Li>
    </Ul>
  </Nav>
);

const Nav = styled.nav`
  max-width: 56em;
  margin: 0 auto;
  padding: 0.4em;
`;

const Ul = styled.ul`
  display: flex;
  padding: 0;
  align-items: center;
`;

const Li = styled.li`
  display: block;
  padding: 0.4em;
`;

const Brand = styled.li`
  display: block;
  padding: 0.4em;
  font-weight: 700;
  font-size: 30px;
`;

const A = styled.a`
  &:hover {
    color: blue;
  }
`;

export default Navbar;
