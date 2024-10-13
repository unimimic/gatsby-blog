import * as path from "path"

export const onCreateWebpackConfig = ({ actions }: { actions: any }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
        "@/lib/utils": path.resolve(__dirname, "src/lib/utils"),
      },
    },
  })
}

exports.createPages = async ({ graphql, actions }: { graphql: any, actions: any }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve(`./src/templates/blog-post.tsx`)
  const { data } = await graphql(`
    query GetAllMdx {
      allMdx {
        nodes {
          id
          internal {
            contentFilePath
          }
        }
      }
    }
  `)
  data.allMdx.nodes.forEach((node: { id: any; internal: { contentFilePath: any; }; }) => {
    // 從 contentFilePath 提取資料夾名稱
    const contentDir = path.basename(path.dirname(node.internal.contentFilePath));

    createPage({
      path: `/blog-post/${contentDir}`,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
      },
    })
  })
  
};
