import { FiSearch } from "react-icons/fi";
import styled from "styled-components";

const Searchbar=()=>{
    return (
        <>
        <form>
            <input placeholder="Search Coin"/>
            <SearchBtn>
            <FiSearch/>
            </SearchBtn>
        </form>
        </>
    )
}

const SearchBtn=styled.button`
font-size: 20px;
background-color: transparent;
`;

export default Searchbar;