import React from "react";
import styled from "styled-components";
import Navbar from "./navbar";

interface LayoutProps {
  children?: React.ReactElement;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <Div>
      <Navbar />
      {children}
    </Div>
  );
};

const Div = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

Layout.defaultProps = {
  children: undefined,
};

export default Layout;
