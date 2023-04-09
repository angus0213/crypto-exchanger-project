import { FiSearch } from "react-icons/fi";
import styled from "styled-components";

const Searchbar=()=>{
    //set fake search bar
    return (
        <>
        <form>
            <input placeholder="Search Coin"/>
            <SearchBtn>
            <MyFiSearch/>
            </SearchBtn>
        </form>
        </>
    )
}

const SearchBtn=styled.button`
font-size: 20px;
background-color: transparent;
`;

const MyFiSearch=styled(FiSearch)`
position: relative;
top: 5px;
`;

export default Searchbar;