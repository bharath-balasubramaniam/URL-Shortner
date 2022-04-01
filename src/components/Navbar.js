import React from "react";
import styled from "styled-components";
import Menu from "./MenuBtn";
const Container = styled.div`
  height: 60px;
  position: "fixed";
  background-color: #f3d3c0;
  @media only screen and (max-width: 480px) {
    height: 50px;
  }
  @media only screen and (max-width: 560px) {
    height: 55px;
  }
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items:"center;
  justify-content: space-between;
  @media only screen and (max-width: 480px){
    padding: 10px 0px ;
  }
  @media only screen and (max-width: 560px){
    padding: 10px 0px;
  }
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media only screen and (max-width: 480px) {
    flex: 2;
    justifycontent: start !important;
  }
  @media only screen and (max-width: 560px) {
    flex: 2;
    justifycontent: end;
  }
`;
const MenuItems = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  @media only screen and (max-width: 480px) {
    fontsize: 9px !important;
    marginleft: 20px !important;
  }
  @media only screen and (max-width: 560px) {
    fontsize: 12px;
    marginleft: 25px;
  }
`;
const Span = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: #33272a;
`;
const SpanText = styled.span`
  color: #594a4e;
  padding: 0rem 1rem;
  @media only screen and (max-width: 480px) {
    display: none;
  }
  @media only screen and (max-width: 560px) {
    font-size: 13px;
  }
`;
const Button = styled.button`
  background-color: #ff8ba7;
  border: none;
  cursor: pointer;
  border-radius: 3px;
  color: #33272a;
  font-weight: 600;
`;
const Navbar = () => {
  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <div className="topLeft">
              <Span className="logo">URL</Span>
              <SpanText>Shortner</SpanText>
            </div>
          </Left>
          <Right>
            <MenuItems>
              <Button style={{ textDecoration: "none" }}>
                <Menu />
              </Button>
            </MenuItems>
          </Right>
        </Wrapper>
      </Container>
    </>
  );
};

export default Navbar;
