import Link from "next/link";
import React from "react";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";

const Navbar = (): JSX.Element => (
  <Nav>
    <Ul>
      <Li>
        <Link passHref href="/">
          <A>Home</A>
        </Link>
      </Li>
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
`;

const Li = styled.li`
  display: block;
  padding: 0.4em;
`;

const A = styled.a`
  &:hover {
    color: blue;
  }
`;

export default Navbar;
