import React, { FC, ReactElement, HTMLInputTypeAttribute } from 'react';
import styled from 'styled-components';

const FormItem: FC<IFormItemProps> = props => {
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
      {extra}
    </Container>
  );
}

export default FormItem;

const Container = styled.label`
  display: block;
  margin-bottom: 20px;
  position: relative;
  font-size: 12px;
  font-weight: 600;

  > span {
    color: #f44;
    font-weight: 400;
    margin-left: 10px;
  }
  
  > input, > textarea {
    width: 100%;
    background: transparent;
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

  > button {
    position: absolute;
    bottom: 0;
    right: 0;

    background: none;
    border: none;
    display: flex;
    align-items: center;
    padding: 10px;

    :hover {
      cursor: pointer;
    }
  }
`;

interface IFormItemProps {
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