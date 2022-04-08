import React, { FC, ReactElement, HTMLInputTypeAttribute } from 'react';
import styled from 'styled-components';

const FormInput: FC<IFormInputProps> = props => {
  const { label, value, onChange, placeholder, type, errorMessages, extra } = props;
  return (
    <Container>
      {label}
      {errorMessages && errorMessages.length > 0 && 
        errorMessages.map((error, i) => (error.condition) && <span key={i}>{error.message}</span>)}
      {type === 'textarea' ? (
        <textarea placeholder={placeholder} disabled={!onChange} 
          value={value} onChange={e => onChange(e.target.value)} />
      ) : (
        <input type={type ?? 'text'} placeholder={placeholder} disabled={!onChange}
          value={value} onChange={e => onChange(e.target.value)} />
      )}
      {extra && <div>{extra}</div>}
    </Container>
  );
}

export default FormInput;

const Container = styled.label`
  display: block;
  margin-bottom: 20px;
  font-size: 12px;
  font-weight: 600;
  position: relative;

  > span {
    color: #f44;
    font-weight: 400;
    margin-left: 10px;
  }
  
  > input, > textarea {
    width: 100%;
    background: #fff;
    border: 1px solid ${props => props.theme.accent};
    padding: 10px;
    margin-top: 2px;

    :focus {
      outline: none;
    }
  }

  > textarea {
    resize: vertical;
    min-height: 64px;
  }

  > div:last-child {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    padding-right: 7px;

    > * {
      background: none;
      border: none;
      display: flex;
      align-items: center;
      padding: 7px 3px;

      :hover {
        cursor: pointer;
      }
    }
  }
`;

interface IFormInputProps {
  label: string
  value: string
  onChange?: (value: string) => void
  placeholder?: string
  type?: HTMLInputTypeAttribute | 'textarea'
  errorMessages?: Array<IErrors>
  extra?: ReactElement
}

interface IErrors {
  condition: boolean
  message: string
}