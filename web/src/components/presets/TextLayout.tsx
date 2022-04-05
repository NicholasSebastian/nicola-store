import React, { FC } from 'react';
import styled from 'styled-components';
import useLanguage from '../../hooks/useLanguage';
import SEO from '../SEO';

const TextLayout: FC<IContent> = (props) => {
  const [language] = useLanguage();
  return (
    <Container>
      <SEO pageTitle={props.title.en} />
      <h1>{props.title[language]}</h1>
      <article dangerouslySetInnerHTML={{ __html: props.content[language] }} />
    </Container>
  );
}

export default TextLayout;

const Container = styled.div`
  width: 90%;
  max-width: 700px;
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 110px;
  
  > h1 {
    margin-bottom: 30px;
  }
`;

interface IContent {
  title: {
    en: string
    id: string
  }
  content: {
    en: string
    id: string
  }
}
