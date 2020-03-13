export default {
    name: 'post',
    title: 'Post',
    type: 'document',
    initialValue: {
        global: false
    },
    fields: [
        {
            name: 'publishedAt',
            type: 'datetime',
            title: 'Published at',
            description: `This can be used to schedule post for publishing.`
        },
        {
            name: 'title',
            type: 'string',
            title: 'Title',
            description: `Titles should be catchy, descriptive, and not too long.`,
            validation: Rule => Rule.error('You have to define title.').required()
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            description: `The title slug to show the post, trimmed to 96 characters.`,
            validation: Rule => Rule.error('Define a 96 charactor, all lowercase and without spaces (replace with "-"), or hit the [generate] button.').required(),
            options: {
                source: 'title',
                maxLength: 96,
                slugify: input => input
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .slice(0, 95)
            }
        },
        {
            name: 'owner',
            title: 'Owner',
            type: 'document',
            description: `The post's parent facility or System.`,
            weak: true,
            type: 'reference',
            to: {
                type: 'owner'
            },
            validation: Rule => Rule.error('You have to define the blog for this post.').required()
        },
        {
            name: 'global',
            title: 'Global Post',
            type: 'boolean',
            description: `Push this post to global listing page.`
        },
        {
            name: 'category',
            title: 'Category',
            type: 'document',
            weak: true,
            type: 'reference',
            to: {
                type: 'category'
            },
            validation: Rule => Rule.error('You have to define a category.').required()
        },
        {
            name: 'keywords',
            title: 'Keywords',
            type: 'array',
            of: [{
                weak: true,
                type: 'reference',
                to: {
                    type: 'keyword'
                }
            }]
        },
        {
            name: 'excerpt',
            type: 'string',
            title: 'Excerpt',
            description: `This ends up on summary pages, on Google, when people share your post in social media.`,
            validation: Rule => Rule.error('You have to define an excerpt for this post.').required()
        },
    ],
    orderings: [
        {
            name: 'publishingDateAsc',
            title: 'Publishing date new–>old',
            by: [
                {
                    field: 'publishedAt',
                    direction: 'asc'
                },
                {
                    field: 'title',
                    direction: 'asc'
                }
            ]
        },
        {
            name: 'publishingDateDesc',
            title: 'Publishing date old->new',
            by: [
                {
                    field: 'publishedAt',
                    direction: 'desc'
                },
                {
                    field: 'title',
                    direction: 'asc'
                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'title',
            publishedAt: 'publishedAt'
        },
        prepare({ title='No title', publishedAt, slug={}, media }) {
            const dateSegment=format(publishedAt, 'YYYY/MM')
            const path=`/${dateSegment}/${slug.current}/`
            return {
                title,
                subtitle: publishedAt? path:'Unpublished post'
            }
        }
    }
}
