// Register `hName`, `hProperties` types, used when turning markdown to HTML:
/// <reference types="mdast-util-to-hast" />
// Register directive nodes in mdast:
/// <reference types="mdast-util-directive" />
import { visit } from 'unist-util-visit'
import { h } from 'hastscript'


export function figure() {
    /**
     * @param {import('mdast').Root} tree
     *   Tree.
     * @returns {undefined}
     *   Nothing.
     */
    return function (tree) {
        visit(tree, 'leafDirective', function (node) {
            if (node.name !== 'Figure') {
                return;
            }
            const data = node.data || (node.data = {})
            const attributes = node.attributes || {}
            data.hName = 'Figure';
            data.hProperties = attributes;
            console.log(node)
        })
    }
}
