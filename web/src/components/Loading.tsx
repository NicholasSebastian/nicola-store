import React, { FC } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import styled from 'styled-components';

const Loading: FC = () => (
  <Styles>
    <AiOutlineLoading3Quarters size={28} />
  </Styles>
)

export default Loading;

const Styles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;

  > svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;