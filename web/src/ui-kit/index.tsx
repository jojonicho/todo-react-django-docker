import styled from "@emotion/styled";

type Cont = {
  closed?: boolean;
  absolute?: boolean;
};

export const Container = styled.div<Cont>`
  backdrop-filter: blur(40px) contrast(0.8);
  // background: ${({ theme }) => theme.colors.white}
  font-family: ${({ theme }) => theme.fontFamily.heading};
  padding: 10px 2vw;
  margin: 0.25vw 0 0.75vw 0;
  display: ${(props) => (props.closed ? "none" : "flex")};
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  text-align: center;
  transition: ${({ theme }) => theme.transitions.boom.transition};
  svg {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    font-size: 1rem;
    input {
      width: 75vw;
    }
  }
  border-radius: ${({ theme }) => theme.borderRadius.default};
  // box-shadow: ${({ theme }) => theme.shadow.mekari};
  text {
    margin-top: calc(0.3rem + 0.2vw);
  }
  .submit {
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.colors.white.base};
    }
    font-weight: bold;
  }
  white-space: pre-line;
  word-break: break-all;
  overflow-wrap: break-word;
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;
export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`;
// export const RowContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   button {
//     margin-left: 10px;
//   }
//   flex-wrap: wrap;
//   width: 30vw;
//   @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
//     width: 85vw;
//   }
// `;

export const Button = styled.button`
  transition: ${(props) => props.theme.transitions.boom.transition};
  background: ${(props) =>
    props.color === "RED"
      ? ({ theme }) => theme.colors.secondary.base
      : ({ theme }) => theme.colors.background.dlight};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white.base};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e2e2e2;
  cursor: pointer;
  border-radius: 2px;
  padding: calc(5px + 0.2vw);
  &:focus {
    outline: 0;
  }
  &:hover {
    transform: scale(1.03);
  }
  border: none;
  font-size: calc(0.15vw + 0.7rem);
`;

export const Input = styled.input`
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border: none;
  margin: calc(0.2vw + 0.1rem);
  width: 50vw;
  transition: ${({ theme }) => theme.transitions.boom.transition};
  background: ${({ theme }) => theme.colors.white.background};
  padding: calc(6px + 0.25vw);
  &:focus {
    outline: 0;
  }
`;

export const Title = styled.h1`
  display: flex;
  color: ${({ theme }) => theme.colors.background.dlight};
  font-size: calc(0.3vw + 1.25rem);
  word-break: break-word;
  s {
    color: white;
  }
`;
export const SubTitle = styled.h2`
  display: inline-block;
  color: ${({ theme }) => theme.colors.background.dlight};
  font-size: calc(0.3vw + 0.7rem);
  word-break: break-word;
  s {
    color: ${({ theme }) => theme.colors.background.light};
  }
`;

export const SubSubTitle = styled.h3`
  display: inline-block;
  color: ${({ theme }) => theme.colors.background.dlight};
  font-size: calc(0.2vw + 0.6rem);
  word-break: break-word;
`;
