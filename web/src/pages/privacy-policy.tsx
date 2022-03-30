import React, { FC } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import getDocument from '../utils/getDocument';
import TextLayout from '../components/TextLayout';

const ENGLISH_ID = "1gJ-Bms_azOlqhBflSd7RIQNBraxK6wY3oFsje2bPWb8";
const BAHASA_ID = "1B8d6FnIv6h80RWjhVcxmleeTCddX7V4SfYwRbBMi1y4";

const PrivacyPolicy: FC = (props: InferGetStaticPropsType<typeof getStaticProps>) => (
  <TextLayout 
    title={{ en: 'Privacy Policy', id: 'Kebijakan Pribadi' }} 
    content={props as never} />
)

export default PrivacyPolicy;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      en: await getDocument(ENGLISH_ID),
      id: await getDocument(BAHASA_ID)
    }
  };
};