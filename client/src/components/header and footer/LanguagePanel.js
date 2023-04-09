import { Link } from "react-router-dom";
import styled from "styled-components";

const LanguagePanel = () => {
  // set fake language panel
  return (
    <>
      <Wrapper>
        <Link to={"/"}>Deutsch (Schweiz)</Link>
        <Link to={"/"}>Bahasa Indonesia</Link>
        <Link to={"/"}>English</Link>
        <Link to={"/"}>Español (España)</Link>
        <Link to={"/"}>Español (Latinoamérica)</Link>
        <Link to={"/"}>Français</Link>
        <Link to={"/"}>Filipino</Link>
        <Link to={"/"}>Français (Afrique)</Link>
        <Link to={"/"}>Italiano</Link>
        <Link to={"/"}>Polski</Link>
        <Link to={"/"}>Português (Brasil)</Link>
        <Link to={"/"}>Română</Link>
        <Link to={"/"}>Tiếng Việt</Link>
        <Link to={"/"}>Türkçe</Link>
        <Link to={"/"}>latviešu valoda</Link>
        <Link to={"/"}>العربية</Link>
        <Link to={"/"}>简体中文</Link>
        <Link to={"/"}>繁體中文</Link>
        <Link to={"/"}>বাংলা</Link>
        <Link to={"/"}>ქართული</Link>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  font-size: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  flex: 0 1 calc(20% - 8px);
  width: 500px;
  height: 200px;
  font-size: 15px;
  gap: 20px;
  justify-content: center;
  padding-bottom: 20px;
  padding-top: 20px;
`;

export default LanguagePanel;
