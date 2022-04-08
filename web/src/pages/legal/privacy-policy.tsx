import React, { FC } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import GenerateProps from '../../server-props/legal';
import withLayout, { withLayoutProps } from '../../components/layout/Layout';
import TextLayout from '../../components/presets/TextLayout';

const ENGLISH_ID = "1gJ-Bms_azOlqhBflSd7RIQNBraxK6wY3oFsje2bPWb8";
const BAHASA_ID = "1B8d6FnIv6h80RWjhVcxmleeTCddX7V4SfYwRbBMi1y4";

const PrivacyPolicy: FC = (props: InferGetStaticPropsType<typeof getStaticProps>) => (
  <TextLayout 
    title={{ en: 'Privacy Policy', id: 'Kebijakan Pribadi' }} 
    content={props as never} />
)

export default withLayout(PrivacyPolicy);
export const getStaticProps: GetStaticProps = withLayoutProps(GenerateProps(ENGLISH_ID, BAHASA_ID));
