export const metaGen = ({ title, description, url }) => {
  return {
    title: title,
    description: description,
    canonical: url,
    openGraph: {
      type: "website",
      url: url,
      title: title,
      description: description,
      site_name: "Kamui File",
      images: [
        {
          url: "https://kamuifile.com/ogtag.png",
          width: 1200,
          height: 630,
          alt: "Kamui File",
        },
      ],
    },
    twitter: {
      handle: "@handle",
      site: "@site",
      cardType: "summary_large_image",
    },
  };
};
