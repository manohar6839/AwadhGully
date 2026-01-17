import styled from '@emotion/styled';

export const HoverMenu = styled.div<{ customerMenu?: boolean; langSwitcher?: boolean }>`
    display: block;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    z-index: 3;
    background-color: ${p => p.theme.gray(0)};
    color: ${p => p.theme.text.main};
    transition: all 0.3s ease-in-out;
    width: max-content;
    min-width: 200px;
    transform: translate(-4rem, 15px);
    border-radius: 8px;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
    border: 1px solid ${p => p.theme.gray(100)};

    a:last-of-type {
        div {
            margin-bottom: 0;
        }
    }

    p {
        margin-right: 0px;
        font-size: 1.6rem;
    }

    ${({ customerMenu }) =>
        customerMenu &&
        `
        padding: 8px;
        right: 0;
        top: 100%;
        transform: translateY(8px);
    `}

    ${({ langSwitcher }) =>
        langSwitcher &&
        `
      left: 50%;
      top: 2.2rem;
      transform: translate(-50%, 15px);
      padding: 2rem;

      svg {
        height: 16px;
      }
  `}
`;

export const DropdownItem = styled.a`
    display: flex;
    cursor: pointer;
    width: 100%;

    svg {
        height: 2.6rem;
        margin-right: 10px;
        transform: translateY(2px);
    }

    h5,
    p {
        transition: 0.3s all ease-in-out;
    }

    h5 {
        font-size: 1.8rem;
        line-height: 1.8rem;
    }
`;

export const Dropdown = styled.div`
    font-size: 1.8rem;
    position: relative;

    & > p {
        display: inline;
    }

    h5 {
        text-align: left;
    }

    &:hover {
        color: blue;
        div {
            opacity: 1;
            visibility: visible;
        }
        /* svg:not(.no-default-fill) path {
            fill: blue;
        } */
    }

    &.hide div:last-of-type {
        display: none;
    }
`;
