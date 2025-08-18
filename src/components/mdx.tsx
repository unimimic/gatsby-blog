import * as React from "react"
import { Link } from "gatsby"

// 函數來清理文件名，移除 UUID
function cleanFileName(fileName: string): string {
  const titleMatch = fileName.match(/^(.+?)\s+[a-f0-9]{32}$/);
  const cleanTitle = titleMatch ? titleMatch[1] : fileName;
  
  return cleanTitle
    .replace(/\s+/g, '-')
    .replace(/[^\w\-\u4e00-\u9fff]/g, '')
    .toLowerCase();
}

// 智能連結組件，自動處理 Notion 內部連結
const SmartLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { href, children, ...rest } = props;
  
  // 如果沒有 href，回退到普通 a 標籤
  if (!href) {
    return <a {...props} />
  }
  
  // 如果是外部連結，使用普通 a 標籤
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a 
        href={href} 
        className="text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }
  
  // 如果是相對路徑且指向 .md 文件，處理為內部連結
  if (href.endsWith('.md') && !href.startsWith('/')) {
    // 解碼 URL 編碼的字符
    const decodedHref = decodeURIComponent(href);
    
    // 提取文件名（可能包含路徑）
    const fileName = decodedHref.replace(/\.md$/, '').split('/').pop() || '';
    
    // 清理文件名並生成 slug
    const cleanSlug = cleanFileName(fileName);
    
    // 生成內部連結
    const internalPath = `/notes/${cleanSlug}`;
    
    return (
      <Link 
        to={internalPath}
        className="text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
        {...rest}
      >
        {children}
      </Link>
    );
  }
  
  // 如果是絕對路徑或其他內部連結，使用 Gatsby Link
  if (href.startsWith('/')) {
    return (
      <Link 
        to={href}
        className="text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
        {...rest}
      >
        {children}
      </Link>
    );
  }
  
  // 其他情況，使用普通 a 標籤
  return (
    <a 
      href={href}
      className="text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
      {...rest}
    >
      {children}
    </a>
  );
};

// 解析 markdown 表格的函數
function parseMarkdownTable(content: string): JSX.Element | null {
  // 匹配表格行的正則表達式
  const lines = content.split('\n');
  const tableLines: string[] = [];
  let inTable = false;
  let hasSeparator = false;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // 檢查是否為表格行
    if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
      // 檢查是否為分隔線（包含 --- 的行）
      if (trimmedLine.includes('---')) {
        // 分隔線，標記有分隔線但不添加到 tableLines
        hasSeparator = true;
        continue;
      }
      
      tableLines.push(trimmedLine);
      inTable = true;
    } else if (inTable && trimmedLine === '') {
      // 空行，結束表格
      break;
    } else if (inTable) {
      // 遇到非表格行，結束表格
      break;
    }
  }
  
  if (tableLines.length < 1) return null;
  
  let headers: string[] = [];
  let dataRows: string[][] = [];
  
  if (hasSeparator) {
    // 有分隔線，第一行是表頭
    const headerLine = tableLines[0];
    headers = headerLine.split('|').slice(1, -1).map(cell => cell.trim());
    dataRows = tableLines.slice(1).map(line => 
      line.split('|').slice(1, -1).map(cell => cell.trim())
    );
  } else {
    // 沒有分隔線，所有行都是數據行，不顯示表頭
    headers = [];
    dataRows = tableLines.map(line => 
      line.split('|').slice(1, -1).map(cell => cell.trim())
    );
  }
  
  return (
    <div className="overflow-x-auto my-6 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto">
        {headers.length > 0 && (
          <thead className="bg-gray-100 dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-600">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider bg-gray-100 dark:bg-gray-800 whitespace-nowrap border-b-2 border-gray-300 dark:border-gray-600"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {dataRows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150' : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150'}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 處理包含 markdown 表格的段落
const EnhancedParagraph = (props: React.HTMLAttributes<HTMLParagraphElement>) => {
  const { children, ...rest } = props;
  
  // 如果 children 是字串且包含表格語法
  if (typeof children === 'string' && children.includes('|') && children.includes('\n')) {
    const table = parseMarkdownTable(children);
    if (table) {
      return table;
    }
  }
  
  return <p className="my-4 text-base leading-7 text-gray-800 dark:text-gray-300" {...rest}>{children}</p>;
};

// custom components for markdown content
export const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold mt-8 mb-6 pb-3 border-b-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-bold mt-8 mb-5 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-semibold mt-6 mb-4 text-gray-900 dark:text-gray-100" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-xl font-semibold mt-5 mb-3 text-gray-900 dark:text-gray-100" {...props} />
  ),
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5 className="text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100" {...props} />
  ),
  h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6 className="text-base font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100" {...props} />
  ),
  p: EnhancedParagraph,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 my-4 space-y-1 text-gray-800 dark:text-gray-300" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 my-4 space-y-1 text-gray-800 dark:text-gray-300" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="my-1 leading-relaxed" {...props} />
  ),
  a: SmartLink,
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2 my-6 bg-blue-50 dark:bg-blue-900/20 text-gray-700 dark:text-gray-300 rounded-r-md" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-gray-100 dark:bg-gray-800 rounded px-1.5 py-0.5 font-mono text-sm text-pink-600 dark:text-pink-400 border border-gray-200 dark:border-gray-700" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre style={{ overflowX: "auto"}} className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 my-6 overflow-x-auto text-sm font-mono text-gray-100 border border-gray-200 dark:border-gray-700 shadow-lg" {...props} />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-gray-100 dark:bg-gray-800" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider bg-gray-100 dark:bg-gray-800 whitespace-nowrap border-b-2 border-gray-300 dark:border-gray-600" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap border-t border-gray-200 dark:border-gray-700" {...props} />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-t border-gray-300 dark:border-gray-700" {...props} />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img className="max-w-full h-auto rounded-md my-4" {...props} alt={props.alt || ''} />
  ),
  // 添加粗體和斜體支援
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-gray-900 dark:text-gray-100" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-gray-800 dark:text-gray-200" {...props} />
  ),
  // 添加刪除線支援
  del: (props: React.HTMLAttributes<HTMLElement>) => (
    <del className="line-through text-gray-500 dark:text-gray-400" {...props} />
  ),
  // 添加標記/高亮支援
  mark: (props: React.HTMLAttributes<HTMLElement>) => (
    <mark className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded text-gray-900 dark:text-gray-100" {...props} />
  ),
}