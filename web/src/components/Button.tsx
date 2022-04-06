import React, { FC, HTMLAttributes } from 'react';
import styled, { css } from "styled-components";

const Button: FC<IButtonProps> = ({ primary, ...props }) => {
  return primary ? <PrimaryButton {...props} /> : <DefaultButton {...props} />
}

export default Button;

const sharedStyles = css`
  display: block;
  padding: 12px 30px;
  font-size: 14px;
  transition: all 100ms linear;

  :hover:not([disabled]) {
    cursor: pointer;
  }
`;

const DefaultButton = styled.button`
  ${sharedStyles}
  background-color: transparent;
  color: ${props => props.theme.darkFont};
  border: 1px solid ${props => props.theme.accent};

  :hover:not([disabled]) {
    background-color: ${props => props.theme.accent};
    color: ${props => props.theme.lightFont};
  }

  :disabled {
    background-color: ${props => props.theme.shadow};
  }
`;

const PrimaryButton = styled.button`
  ${sharedStyles}
  background-color: ${props => props.theme.accent};
  color: ${props => props.theme.lightFont};
  border: 1px solid transparent;

  :hover:not([disabled]) {
    background-color: ${props => props.theme.bg};
    color: ${props => props.theme.darkFont};
    border-color: ${props => props.theme.accent};
  }

  :disabled {
    background-color: transparent;
    color: ${props => props.theme.darkFont};
    border-color: ${props => props.theme.accent};
  }
`;

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  primary?: boolean
  disabled?: boolean
}