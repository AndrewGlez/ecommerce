import React, { useState } from "react";
import styled from "styled-components";
import { LoginForm } from "../Forms/LoginForm";
import { RegisterForm } from "../Forms/RegisterForm";

const Container = styled.div`
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.text};
`;
const Wrapper = styled.div`
  height: fit-content;
  width: 400px;
  margin-top: 50px;
  padding: 5px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.body};
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Tabss = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 10px;
  color: ${(props) => props.theme.text};
`;

const TabButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 5px;
  width: 100%;
  text-decoration: none;
  font-size: 1em;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  &:disabled {
    color: ${(props) => props.theme.text};
    background-color: ${(props) => props.theme.body};
    border-botton: 5px solid #6bd5f2;
  }
  &:first-of-type + button {
    border-left: 1px solid ${(props) => props.theme.border};
  }
`;
const Content = styled.div`
    height: 100%
    background-color: ${(props) => props.theme.body};
    border-top: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 10px;
`;

const NewTabs: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("1");

  const Tabs = [
    {
      id: "1",
      tabTitle: "Login",
      title: "Login",
    },
    {
      id: "2",
      tabTitle: "Register",
      title: "Register",
    },
  ];

  const handleTabClick = (e: React.MouseEvent) => {
    if (currentTab === "1") {
      setCurrentTab("2");
    } else {
      setCurrentTab("1");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Tabss>
          {Tabs.map((tab, index) => (
            <TabButton
              key={index}
              id={tab.id}
              disabled={currentTab === tab.id}
              onClick={handleTabClick}
            >
              {tab.tabTitle}
            </TabButton>
          ))}
        </Tabss>
        <Content>
          {currentTab === "1" ? (
            <LoginForm></LoginForm>
          ) : (
            <RegisterForm></RegisterForm>
          )}
        </Content>
      </Wrapper>
    </Container>
  );
};

export default NewTabs;
