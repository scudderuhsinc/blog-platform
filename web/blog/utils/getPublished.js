const BlocksToMarkdown=require('@sanity/block-content-to-markdown')
const groq=require('groq')
const client=require('./sanityClient.js')
const serializers=require('./serializers')

//const blog = process.env.ELEVENTY_ENV
//console.log(`11ty blog: `+blog)

function generate(ea) {
  /* Convert to Markdown, for Each with Teaser's Body */
  // ea.teasers.forEach(function (tease) {
  //   tease.body=BlocksToMarkdown(tease.body, { serializers, ...client.config() })
  // });
  /* Convert to Markdown, for Each with Main's and Thank You's Body */
  return {
    ...ea,
    // main: BlocksToMarkdown(ea.main.body, { serializers, ...client.config() })
  }
}

async function getActive() {
  const filter=groq`*[_type == 'post' && owner->slug.current == '`+process.env.ELEVENTY_ENV+`']`
  const projection=groq`{
    _id,
  	"owner": owner-> {
      "name": name,
      "slug": slug.current,
      "link": link,
		},
    title,
    subtitle,
    "slug": slug.current,
    "category": category-> {
      "title": title,
      "slug": slug.current,
    }
  }`
  const order=`| order(schedual.startDate asc)`
  const query=[filter, projection, order].join(' ')
  //console.log(query)
  const docs=await client.fetch(query).catch(err => console.error(err))
  const activePages=docs.map(generate)
  //console.log(`Page: `+JSON.stringify(activePages))
  //console.log(docs)
  return activePages
}

module.exports=getActive