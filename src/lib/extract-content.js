import remarkMdx from 'remark-mdx'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'

/**
 * 
 * @param {string} content 
 * @returns string
 */
export default function extractContent(raw_content) {
    // return content
    const tree = unified()
        .use(remarkParse)
        .use(remarkMdx)
        .use(remarkMath)
        .use(remarkGfm)
        // .processSync(content)
        .parse(raw_content)

    let content = "";

    // use dfs to extract text and code from the ast
    const dfs = (node) => {
        if (node.type === 'text') {
            content += node.value;
        } else if (node.type === 'code') {
            content += node.value;
        } else if (node.children) {
            node.children.forEach(child => dfs(child));
        }
    }

    dfs(tree);

    return content;
}
