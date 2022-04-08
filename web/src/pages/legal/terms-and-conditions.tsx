import React, { FC } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import GenerateProps from '../../server-props/legal';
import withLayout, { withLayoutProps } from '../../components/layout/Layout';
import TextLayout from '../../components/presets/TextLayout';

const ENGLISH_ID = "16JZkgHATvPYASiMQRDSqGbI4EWQSkIXHW7q1SjtR1MQ";
const BAHASA_ID = "10oFsSW9eaZI2to3A02IO_0AEa7D77UkBvzEfSdbNwO8";

const TermsAndConditions: FC = (props: InferGetStaticPropsType<typeof getStaticProps>) => (
  <TextLayout 
    title={{ en: 'Terms and Conditions', id: 'Syarat dan Ketentuan' }} 
    content={props as never} />
)

export default withLayout(TermsAndConditions);
export const getStaticProps: GetStaticProps = withLayoutProps(GenerateProps(ENGLISH_ID, BAHASA_ID));
