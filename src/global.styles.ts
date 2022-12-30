import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const GlobalStyle = createGlobalStyle`
  ${reset}
  
* {
  margin: 0;
  box-sizing: border-box;
}

@font-face {
     font-family: 'S-CoreDream-3Light';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
     font-weight: normal;
     font-style: normal;
}


body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'S-CoreDream-3Light',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


ol, ul, li {
list-style: none;
}



.infoOverlay {
  position: absolute;
   left: 14px; 
   bottom: 0px; 

  padding:5px;
  font-size:12px;
  background-color: white; 
  border: 1px solid #D9D9D9; 
  border-radius: 10px; 

  &.me {
    left: -17px; 
    bottom: 22px;

    padding: 3px 5px;
    font-weight: bold;
  }
}

`
