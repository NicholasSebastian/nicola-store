import React, { FC } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import GenerateProps from '../../server-props/legal';
import withLayout, { withLayoutProps } from '../../components/layout/Layout';
import TextLayout from '../../components/presets/TextLayout';

const ENGLISH_ID = "1OimW1usf8t5OWSAe6YS4SnUPZcLQwNHwKfsL8SOfq_w";
const BAHASA_ID = "1PRQXB8OZud_TOfrBqB712SQi9br1pdWef2FGpEfJuTA";

const ReturnsPolicy: FC = (props: InferGetStaticPropsType<typeof getStaticProps>) => (
  <TextLayout 
    title={{ en: 'Returns Policy', id: 'Kebijakan Pengembalian' }} 
    content={props as never} />
);

export default withLayout(ReturnsPolicy);
export const getStaticProps: GetStaticProps = withLayoutProps(GenerateProps(ENGLISH_ID, BAHASA_ID));