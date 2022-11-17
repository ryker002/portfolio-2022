import React from "react";

import _ from "lodash";

import url from "url";

import ImageMeta from "./ImageMeta";
import config from "../../utils/siteConfig";
import Head from "next/head";

const WebsiteMeta = ({
  data,
  settings,
  canonical,
  title,
  description,
  image,
  type,
}) => {
  const publisherLogo = url.resolve(
    config.siteUrl,
    settings.logo || config.siteIcon
  );
  let shareImage =
    image || data.feature_image || _.get(settings, `cover_image`, null);

  shareImage = shareImage ? url.resolve(config.siteUrl, shareImage) : null;

  description =
    description ||
    data.meta_description ||
    data.description ||
    config.siteDescriptionMeta ||
    settings.description;

  title = `${title || data.meta_title || data.name || data.title} - ${
    settings.title
  }`;

  const jsonLd = {
    "@context": `https://schema.org/`,
    "@type": type,
    url: canonical,
    image: shareImage
      ? {
          "@type": `ImageObject`,
          url: shareImage,
          width: config.shareImageWidth,
          height: config.shareImageHeight,
        }
      : undefined,
    publisher: {
      "@type": `Organization`,
      name: settings.title,
      logo: {
        "@type": `ImageObject`,
        url: publisherLogo,
        width: 60,
        height: 60,
      },
    },
    mainEntityOfPage: {
      "@type": `WebPage`,
      "@id": config.siteUrl,
    },
    description,
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <link rel='canonical' href={canonical} />
        <meta property='og:site_name' content={settings.title} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:url' content={canonical} />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:url' content={canonical} />
        <link
          rel='icon'
          href={settings.icon}
          type={"image/" + settings.icon.split(".").pop()}
        />
        {settings.twitter && (
          <meta
            name='twitter:site'
            content={`https://twitter.com/${settings.twitter.replace(
              /^@/,
              ``
            )}/`}
          />
        )}
        {settings.twitter && (
          <meta name='twitter:creator' content={settings.twitter} />
        )}
        <script type='application/ld+json'>
          {JSON.stringify(jsonLd, undefined, 4)}
        </script>
      </Head>
      <ImageMeta image={shareImage} />
    </>
  );
};

export default WebsiteMeta;
