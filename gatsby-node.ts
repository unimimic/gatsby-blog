import * as path from "path"
import * as fs from "fs"

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

// 函數來清理文件名，移除 UUID
function cleanFileName(fileName: string): string {
  const titleMatch = fileName.match(/^(.+?)\s+[a-f0-9]{32}$/);
  const cleanTitle = titleMatch ? titleMatch[1] : fileName;
  
  return cleanTitle
    .replace(/\s+/g, '-')
    .replace(/[^\w\-\u4e00-\u9fff]/g, '')
    .toLowerCase();
}

// 建立文件名映射表
const fileNameMapping = new Map<string, string>();

function buildFileNameMapping(notionDir: string) {
  // 遞歸遍歷 notion 目錄
  function scanDirectory(dir: string) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.endsWith('.md')) {
        const fileName = path.basename(item, '.md');
        const cleanSlug = cleanFileName(fileName);
        fileNameMapping.set(fileName, cleanSlug);
      }
    });
  }
  
  if (fs.existsSync(notionDir)) {
    scanDirectory(notionDir);
  }
}

exports.createPages = async ({ graphql, actions }: { graphql: any, actions: any }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve(`./src/templates/blog-post.tsx`)
  const notionTemplate = path.resolve(`./src/templates/notion-note.tsx`)
  
  // 建立文件名映射表
  const notionDir = path.resolve('./content/notion/');
  buildFileNameMapping(notionDir);
  
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
    const filePath = node.internal.contentFilePath;
    
    // 確保只處理 .md 或 .mdx 檔案
    if (!filePath.endsWith('.md') && !filePath.endsWith('.mdx')) {
      return;
    }
    
    // 判斷是否為 notion 筆記
    if (filePath.includes('/content/notion/') && filePath.endsWith('.md')) {
      // 為 notion 筆記創建頁面
      const fileName = path.basename(filePath, '.md');
      const slug = cleanFileName(fileName);
      
      createPage({
        path: `/notes/${slug}`,
        component: `${notionTemplate}?__contentFilePath=${filePath}`,
        context: {
          id: node.id,
          originalFileName: fileName,
          fileNameMapping: Object.fromEntries(fileNameMapping), // 將映射表傳遞給模板
        },
      })
    } else if (filePath.includes('/content/posts/')) {
      // 為一般 blog posts 創建頁面
      const contentDir = path.basename(path.dirname(filePath));
      const lowercaseContentDir = contentDir.toLowerCase();

      createPage({
        path: `/posts/${lowercaseContentDir}`,
        component: `${postTemplate}?__contentFilePath=${filePath}`,
        context: {
          id: node.id,
        },
      })
    }
  })
};
