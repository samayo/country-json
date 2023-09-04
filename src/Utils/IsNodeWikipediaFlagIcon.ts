import { HTMLElement, Node, NodeType } from 'node-html-parser'

const IsNodeWikipediaFlagIcon = (node: Node) =>
	node &&
	node.nodeType == NodeType.ELEMENT_NODE &&
	(node as HTMLElement).classList.contains('flagicon') &&
	(node as HTMLElement).rawTagName === 'span'

export default IsNodeWikipediaFlagIcon
