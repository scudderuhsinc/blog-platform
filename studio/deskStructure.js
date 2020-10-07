import S from '@sanity/desk-tool/structure-builder'
import post from 'react-icons/lib/fa/bookmark'
import category from 'react-icons/lib/fa/sitemap'
import keywords from 'react-icons/lib/fa/hashtag'
//import cta from 'react-icons/lib/fa/route'
import owner from 'react-icons/lib/fa/hospital-o'

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Posts')
        .icon(post)
        .schemaType('post')
        .child(S.documentTypeList('post').title('Posts')),
      S.listItem()
        .title('Categories')
        .icon(category)
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      S.listItem()
        .title('Keywords')
        .icon(keywords)
        .schemaType('keyword')
        .child(S.documentTypeList('keyword').title('Keywords')),
      S.listItem()
        .title('Owners')
        .icon(owner)
        .schemaType('owner')
        .child(S.documentTypeList('owner').title('Owners')),
    ])