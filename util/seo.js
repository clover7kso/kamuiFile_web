import ogtag from "../public/ogtag.png";
export const DEFAULT_SEO = {
  title: "Kamui File - Transfer your files",
  description: "Fast and Safe P2P file transfer",
  canonical: "https://kamuifile.com/",
  openGraph: {
    type: "website",
    url: "https://kamuifile.com/",
    title: "Kamui File - Transfer your files",
    description: "Fast and Safe P2P file transfer",
    site_name: "File Transfer",
    images: [
      {
        url: ogtag,
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
