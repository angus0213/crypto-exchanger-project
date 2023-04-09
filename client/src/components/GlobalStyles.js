import { COLORS } from "./Constants";
import { createGlobalStyle } from "styled-components";

//set global styles
const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Jost&display=swap');
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@200&display=swap');
*{
    margin: 0;
    font-family: 'Jost', sans-serif;
}
h1,h2,h3 {
    color: ${COLORS.black};
}
h1{
    font-size: 25px;
}
h2{
    font-size: 20px;
}
body{
    background-color: ${COLORS.black};
}
p{
    color: ${COLORS.black};
}
span{
    color: ${COLORS.black};
}
`;

export default GlobalStyles;
