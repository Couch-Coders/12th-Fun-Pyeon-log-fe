import styled from 'styled-components'

export const OverlayContainer = styled.div`
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

    h2 {
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

  @media screen and (max-width: 576px) {
    width: 170px;
    height: 200px;

    left: -85px;
    bottom: 5px;
    opacity: 0.9;

    header {
      h2 {
        font-size: 13px;
        line-height: 1.3;
      }
      img {
        width: 40px;
        height: 40px;
      }
    }
  }
`

export const StarReviewContainer = styled.div`
  display: flex;
  height: 40px;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  font-size: 16px;
  font-weight: bold;

  .star {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    img {
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
  @media screen and (max-width: 576px) {
    font-size: 13px;
    height: 30px;

    .star {
      width: 50%;

      img {
        width: 15px;
        height: 15px;
      }
    }

    .review-count {
      width: 50%;
      height: 30px;
    }
  }
`
export const StoreInfo = styled.div`
  padding: 10px;
  font-size: 14px;

  .address,
  .phone {
    width: 180px;
    height: 30px;
    display: flex;
    align-items: center;

    p {
      margin-left: 5px;
      white-space: pre-line;
      word-break: break-all;
    }
  }

  @media screen and (max-width: 576px) {
    padding: 5px 10px;
    padding-bottom: 0;
    font-size: 12px;

    .address,
    .phone {
      width: 100%;
      line-height: 1.3;
    }
  }
`
export const DetailView = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
  border-top: 1px solid ${(props) => props.theme.colors.border};

  a {
    text-decoration: none;
    background-color: ${(props) => props.theme.colors.purple};
    color: white;
    padding: 5px 20px;
    border-radius: 5px;
  }

  @media screen and (max-width: 576px) {
    align-items: center;
    margin-top: 0px;
    padding: 7px;
    border-top: 1px solid ${(props) => props.theme.colors.border};

    a {
      font-size: 13px;
      font-weight: 600;
      padding: 5px 10px;
    }
  }
`
