import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const GlobalStyle = createGlobalStyle`
  ${reset}
  
* {
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

ol, ul, li {
list-style: none;
}


//오버레이 스타일
.overlay {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 200px;
  height: 250px;
  padding: 10px;

  background-color: white;
  border: 3px solid ${(props) => props.theme.colors.purple};
}


`
