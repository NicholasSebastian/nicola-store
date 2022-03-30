import React, { FC } from "react";
import Head from 'next/head';

// https://developers.google.com/search/docs/advanced/guidelines/get-started
// https://www.wordstream.com/serp

// The title tag should be under 60 characters long.
// The description meta tag should be under 160 characters long.

// TODO: Schema Markup - https://www.link-assistant.com/news/structured-data-for-seo.html

const TITLE = "lanica the label";
const DESCRIPTION = "The official online store of lanica the label. \
  Designed and manufactured in house for quality and style. \
  Dresses, tops, knits, jackets, denim, accessories and more!";

const SEO: FC<ISeoProps> = ({ pageTitle, url, imageUrl }) => {
  const title = pageTitle ? `${pageTitle} - ${TITLE}` : TITLE;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={DESCRIPTION} />
  
      {/* SEO begins here */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      
      {/* OpenGraph tags */}
      <meta name="og:title" property="og:title" content={title} />
      <meta name="og:type" property="og:type" content='website' />
      <meta name="og:description" property="og:description" content={DESCRIPTION} />
      {url && <meta name="og:url" property="og:url" content={url} />}
      {imageUrl && <meta name="og:image" property="og:image" content={imageUrl} />}
    </Head>
  );
}

export default SEO;

interface ISeoProps {
  pageTitle?: string
  url?: string
  imageUrl?: string
}