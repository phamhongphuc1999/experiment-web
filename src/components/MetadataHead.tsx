import { siteMetadata } from 'src/configs/siteMetadata';

export function MetadataHead() {
  const { title, description, url, siteName, icon, image, twitterHandle, keywords } = siteMetadata;

  return (
    <head>
      <title>{title}</title>
      <link rel="icon" href={icon} />

      {/* Basic metadata */}
      <meta name="description" content={description} key="description" />
      <meta name="keywords" key="keywords" content={keywords} />
      <meta name="application-name" content={siteName} />

      {/* Open Graph metadata */}
      <meta property="og:title" content={title} key="title" />
      <meta property="og:description" content={description} key="ogdescription" />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={image} key="ogimage" />

      {/* Twitter metadata */}
      <meta name="twitter:card" content="summary_large_image" key="twittercard" />
      <meta name="twitter:site" content={`https://x.com/${twitterHandle}`} key="twittersite" />
      <meta name="twitter:title" content={title} key="twittertitle" />
      <meta name="twitter:description" content={description} key="twitterdescription" />
      <meta name="twitter:image" content={image} key="twitterimage" />
      <meta name="twitter:image:alt" content="cover image" key="twitteralt" />
    </head>
  );
}
