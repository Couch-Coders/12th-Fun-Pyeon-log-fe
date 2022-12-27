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



//오버레이 스타일
.overlay {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: -100px;
  bottom: 15px;

  width: 200px;
  height: 250px;


  background-color: white;
  border: 2px solid ${(props) => props.theme.colors.purple};
  border-radius: 10px;

  header {
    display: flex;
    align-items: center;
    padding: 10px;

    h2{
      font-size: 16px;
      font-weight: bold;
      margin-left: 10px;
      white-space: pre-line;
        word-break: break-all;
    }
    img {
      width: 60px;
      height: 60px;
      border: 1px solid ${(props) => props.theme.colors.border};
      border-radius: 10px;
    }
  }

  .star-review {
    display: flex;
    height: 40px;
    border-top: 1px solid ${(props) => props.theme.colors.border};
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
    font-size: 16px;
    font-weight: bold;
    
    .star{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      img{
        margin-right: 5px;
      }
    }
    .review-count {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100px;
      height: 40px;
      border-left: 1px solid ${(props) => props.theme.colors.border};
    }
  }

  .store-info{
    padding: 10px;
    font-size: 14px;
 
    .address,
    .phone {
      width: 180px;
      height: 30px;
      display: flex;
      align-items: center;

      p{
        margin-left: 5px;
        white-space: pre-line;
        word-break: break-all;
      }
    }
  }

  .detail-view{
    display: flex;
    justify-content: center;
    padding-top: 10px;
    border-top: 1px solid ${(props) => props.theme.colors.border};

    a{
      text-decoration: none;
      background-color: ${(props) => props.theme.colors.purple};
      color: white;
      padding: 5px 20px;
      border-radius: 5px;
    }
  }

  @media screen and (max-width: 576px) {
    width: 170px;
    height: 200px;

    left: -85px;
    bottom: 5px;
    opacity: 0.9;

  header {
      h2{
      font-size: 13px;
      line-height: 1.3;
      }
      img {
      width: 40px;
      height: 40px;
      }
    }

  .star-review {
      font-size: 13px;
      height: 30px;

      .star {
      width: 50%;

        img {
        width: 15px;
        height:  15px;
        }
      }

      .review-count {
        width: 50%;
  height: 30px;
      }
    }

    .store-info{
    padding: 5px 10px;
    padding-bottom: 0;
    font-size: 12px;
 
    .address,
    .phone {
      width: 100%;
      line-height: 1.3;
      }
    }

  .detail-view{
    align-items: center;
    margin-top: 0px;
    padding: 7px;
    border-top: 1px solid ${(props) => props.theme.colors.border};

    a{
      font-size: 13px;
      font-weight: 600;
      padding: 5px 10px;
    }
  }
}
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
