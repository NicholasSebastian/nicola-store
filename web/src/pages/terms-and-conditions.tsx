import React, { FC } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import getDocument from '../utils/getDocument';
import TextLayout from '../components/TextLayout';

const ENGLISH_ID = "16JZkgHATvPYASiMQRDSqGbI4EWQSkIXHW7q1SjtR1MQ";
const BAHASA_ID = "10oFsSW9eaZI2to3A02IO_0AEa7D77UkBvzEfSdbNwO8";

const TermsAndConditions: FC = (props: InferGetStaticPropsType<typeof getStaticProps>) => (
  <TextLayout 
    title={{ en: 'Terms and Conditions', id: 'Syarat dan Ketentuan' }} 
    content={props as never} />
)

export default TermsAndConditions;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      en: await getDocument(ENGLISH_ID),
      id: await getDocument(BAHASA_ID)
    }
  };
};
