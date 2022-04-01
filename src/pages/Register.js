import React, { useState } from "react";
import styled from "styled-components";
import Registered from "../assets/gux_cat.svg";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  background-color: #faeee7;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ImgWrapper = styled.div`
  flex: 5;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 480px) {
    display: none;
  }
  @media only screen and (max-width: 860px) {
    width: 90%;
  }
`;
const Img = styled.img`
  max-width: 80%;
`;
const Formwrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  flex: 3;
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
  @media only screen and (max-width: 860px) {
    width: 90%;
  }
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  max-width: 90%;
  margin: 1rem 0rem;
  padding: 0.5rem;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  color: #33272a;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 5px 0px 5px;
  padding: 10px;
  color: #594a4e;
  font-weight: 600;
  font-size: 15px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  margin: 3rem 2rem 0rem 2rem;
  position: relative;
  left: 20%;
  padding: 15px 20px;
  background-color: #ff8ba7;
  cursor: pointer;
  color: #33272a;
  font-size: 17px;
  font-weight: 600;
`;
function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (!name || !password || !email || !confirmPassword) {
      alert("please fill all the fields!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Password doesn't match");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://url-shortner-be.herokuapp.com/api/auth/signup",
        { name, email, password },
        config
      );
      console.log(data);
      setName("");
      setConfirmPassword("");
      setEmail("");
      setPassword("");
      history.push("/login");
      return;
    } catch (error) {
      console.log(error.message);
      return;
    }
  };
  return (
    <Container>
      <ImgWrapper>
        <Img src={Registered} alt="pic.png" />
      </ImgWrapper>
      <Formwrapper>
        <div>
          <Title>CREATE AN ACCOUNT</Title>
          <Form>
            <Input
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              placeholder="name"
            />
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
              placeholder="e-mail"
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="password"
            />
            <Input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              name="confirmPassword"
              placeholder="Repeat-Password"
            />
            <Button onClick={handleClick}>Create</Button>
          </Form>
        </div>
      </Formwrapper>
    </Container>
  );
}

export default RegisterPage;
