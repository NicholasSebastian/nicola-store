import React, { FC } from 'react';
import styled from 'styled-components';

const FormOption: FC<IFormOptionProps> = props => {
  const { id, label, options, value, onChange } = props;
  return (
    <Container>
      {label}
      <div>
        {options.map((option, i) => {
          const selected = option.value === value;
          return (
            <label key={i} className={selected ? 'selected' : undefined}>
              <input type='radio' name={id} value={option.value} 
                checked={selected} onChange={e => onChange(e.currentTarget.value)} />
              {option.label}
            </label>
          );
        })}
      </div>
    </Container>
  );
}

export default FormOption;

const Container = styled.div`
  margin-bottom: 20px;
  font-size: 12px;
  font-weight: 600;

  > div {
    border: 1px solid ${props => props.theme.accent};
    padding: 10px;
    margin-top: 2px;

    > label {
      display: block;
      padding: 5px 10px;
      font-size: 13px;
      font-weight: 400;

      > input[type='radio'] {
        display: none;
      }

      :hover {
        cursor: pointer;
      }
    }

    > label.selected {
      background-color: ${props => props.theme.accent};
      color: ${props => props.theme.lightFont};
    }
  }
`;

interface IFormOptionProps {
  id: string
  label: string
  options: Array<IOption>
  value: string
  onChange: (value: string) => void
}

interface IOption {
  value: any
  label: string
}