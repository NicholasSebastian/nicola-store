import React, { FC } from "react";
import Head from 'next/head';

const title = "LANICA Fashion";

const SEO: FC<ISeoProps> = ({ pageTitle }) => (
  <Head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{pageTitle ? `${pageTitle} - ${title}` : title}</title>
  </Head>
);

export default SEO;

interface ISeoProps {
  pageTitle?: string
}