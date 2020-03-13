//const imageUrl=require('./imageUrl')

module.exports={
  types: {
    code: props =>
      '```'+props.node.language+'\n'+props.node.code+'\n```',
    //code: ({ node }) =>
    //  '```'+node.language+'\n'+node.code+'\n```' //,
    //mainImage: ({ node }) => `![${node.alt}](${imageUrl(node).width(600).url()})` // ,
    //heroImage: ({ node }) => `![${node.alt}](${imageUrl(node).url()})`
  }
}