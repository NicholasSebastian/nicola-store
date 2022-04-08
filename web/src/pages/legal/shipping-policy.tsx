import React, { FC } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import GenerateProps from '../../server-props/legal';
import withLayout, { withLayoutProps } from '../../components/layout/Layout';
import TextLayout from '../../components/presets/TextLayout';

const ENGLISH_ID = "1NVtzL-jDIJZHoDwnrX75lK3fCEfxeqfNsJ0XHwq1Gwk";
const BAHASA_ID = "1lAgLqqzvCUoyzYDGD6iBE4elxo5wnqQbeaFfY-jl7NU";

const ShippingPolicy: FC = (props: InferGetStaticPropsType<typeof getStaticProps>) => (
  <TextLayout 
    title={{ en: 'Shipping Policy', id: 'Kebijakan Pengiriman' }} 
    content={props as never} />
)

export default withLayout(ShippingPolicy);
export const getStaticProps: GetStaticProps = withLayoutProps(GenerateProps(ENGLISH_ID, BAHASA_ID));
