import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  pathPrefix: "/",
  siteMetadata: {
    title: "D.N.",
    siteUrl: "https://www.unimimic.github.io",
    description: "Dev Notes",
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-YRQ273VWPD", // Google Analytics / GA
        ],
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.png"
      }
    },
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        concurrency: 2, // 減少圖片處理的併行數量
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        // remarkPlugins: [require(`remark-math`)],
        // rehypePlugins: [require(`rehype-katex`)],
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          "gatsby-remark-katex",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "blog",
        "path": "./content/posts/"
      },
      __key: "pages"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "notes",
        "path": "./content/notion/"
      },
      __key: "notes"
    },
  ]
};

export default config;
