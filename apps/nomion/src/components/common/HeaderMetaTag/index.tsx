import React, { FC } from "react";
import Head from 'next/head'

export type HeaderMetaTag = {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

const HeadMetaTag: FC<HeaderMetaTag> = (props) => {
  const { title, description, image, type } = props;
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      
      <meta property="title" content={title} key="title" />
      <meta property="description" content={description} key="description" />
      <meta name="image" content={image} key="image" />

      {/* OpenGraph tags */}
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:type" content={type} key="og:type" />
      <meta property="og:image" content={image} key="og:image" />
      {/* <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" /> */}
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
      <meta property="twitter:domain" content="" key="twitter:domain" />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta
        name="twitter:description"
        content={description}
        key="twitter:description"
      />
    </Head>
  );
}

export default HeadMetaTag;
