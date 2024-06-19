import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import { User, UserContextState } from "../../../Types/User";
import { Context } from "../../../Context/UserContext";
import bcrypt from "bcryptjs";

const fadeIn = keyframes`
0% {opacity: 0%},
100% {opacity: 100%}`;
const Container = styled.div`
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  padding: 40px;
  animation: ${fadeIn} 1s;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const FinalWrapper = styled.div`
  width: 100%;
  margin: 5px;
  text-align: center;
`;

const Label = styled.label`
  font-weight: bold;
  margin: 10px;
  text-align: left;
`;

const Input = styled.input`
  font-size: 20px;
  width: 95%;
  padding: 5px;
  padding-inline: 8px;
  margin-bottom: 15px;
  color: ${(props) => props.theme.text};
  outline: 1px solid ${(props) => props.theme.border};
  border: none;
  background: transparent;
`;

const LoginButton = styled.button`
  border: none;
  background: #047d40;
  padding: 15px;
  font-size: 20px;
  color: white;
  cursor: pointer;
  &:hover {
  }
  box-shadow: inset 0 0 10px 10px rgba(0, 0, 0, 0.3);
`;

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<boolean>(false);

  const { logged, loginUser } = useContext(Context) as UserContextState;

  const navigate = useNavigate();

  const handleChangePassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value);
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleLogin = async () => {
    console.log(email);
    console.log(password);
    let login = {
      email: email,
      password: password,
    };

    try {
      const headers = {
        "Access-Control-Allow-Origin": "*",
      };

      let res = await axios.post("http://127.0.0.1:8080/users/login", login);
      let user = await res.data;

      if (user) {
        localStorage.setItem("curUserI", user.id);
        loginUser(user);
        localStorage.setItem("curUserL", "true");
        navigate("/shop");
        setError(false);
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
    }
  };

  return (
    <Container>
      {error ? <h4>Please Try Again</h4> : <></>}
      <Form>
        <Label>Email Address</Label>
        <InputWrapper>
          <Input onChange={handleChangeEmail} name="email" type="email" />
        </InputWrapper>
        <Label>Password</Label>
        <FinalWrapper>
          <Input onChange={handleChangePassword} type="password" />
        </FinalWrapper>
        <LoginButton type="button" onClick={handleLogin}></LoginButton>
      </Form>
    </Container>
  );
};
