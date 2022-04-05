import React, { FC } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import getDocument from '../../utils/getDocument';
import TextLayout from '../../components/presets/TextLayout';

const ENGLISH_ID = "1NVtzL-jDIJZHoDwnrX75lK3fCEfxeqfNsJ0XHwq1Gwk";
const BAHASA_ID = "1lAgLqqzvCUoyzYDGD6iBE4elxo5wnqQbeaFfY-jl7NU";

const ShippingPolicy: FC = (props: InferGetStaticPropsType<typeof getStaticProps>) => (
  <TextLayout 
    title={{ en: 'Shipping Policy', id: 'Kebijakan Pengiriman' }} 
    content={props as never} />
)

export default ShippingPolicy;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      en: await getDocument(ENGLISH_ID),
      id: await getDocument(BAHASA_ID)
    }
  };
};
