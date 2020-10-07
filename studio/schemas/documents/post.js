import { format } from 'date-fns'
import client from 'part:@sanity/base/client'

/*
 * customize initialValue for specific owner deployments
 */

 const blog = JSON.stringify(process.env.SANITY_STUDIO_API_BLOG)
 console.log(`blog: `+blog)

export default {
    name: 'post',
    title: 'Posts',
    type: 'document',
    initialValue: async () => {
        const response = await client.fetch(`
        *[ _type == "owner" && slug.current == `+blog+` ][0]{
            "_ref": _id,
            "_type": "reference"
        }`)
        return {
            // publishAt: new Date().toISOString(),
            owner: response,
            approved: false,
            capstone: false
        }
        /*
         * publishAt: new Date().toISOString(),
         * approved: false,
         * capstone: false,
         * owner: await client.fetch(`
         *  *[ _type == "owner" && slug.current == `+blog+` ][0]{
         *   "_ref": owner->_id,
         *   "_type": "reference",
         *   "name": name,
         * }`)
         */
    },
    fieldsets: [
        {
            name: 'platformSettings',
            title: 'Platform Settings',
            options: {
                collapsible: true,
                collapsed: true
            }
        },
        {
            name: 'postSettings',
            options: {
                collapsible: false,
                collapsed: false
            }
        }
    ],
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: `Titles should be catchy, descriptive, and not too long.`,
            validation: Rule => Rule.error('You have to define title.').required()
        },
        {
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
            description: `Optional, used to support multi-line header titles.`,
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: `The post slug created from the title and subtitle, trimmed to 95 characters.`,
            options: {
                source: doc => doc.subtitle? `${doc.title}-${doc.subtitle}`:doc.title,
                maxLength: 95,
                slugify: input => input
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .slice(0, 95)
            },
            validation: Rule => Rule.error('Define a 96 charactor, all lowercase and without spaces (replace with "-"), or hit the [generate] button.').required()
        },
        {
            name: 'owner',
            title: 'Owner',
            type: 'document',
            description: `The post's parent facility or System.`,
            fieldset: 'platformSettings',
            type: 'reference',
            to: {
                type: 'owner'
            },
            validation: Rule => Rule.error('You have to define the blog for this post.').required()
        },
        {
            name: 'capstone',
            title: 'Capstone Post',
            type: 'boolean',
            fieldset: 'platformSettings',
            description: `Push post teaser to parent listing page. Links back to post on child blog.`
        },
        {
            name: 'approved',
            title: 'Approved',
            type: 'boolean',
            fieldset: 'platformSettings',
            description: `This post has completed all required internal and/or client reviews.`
        },
        {
            name: 'category',
            title: 'Category',
            type: 'document',
            fieldset: 'postSettings',
            description: `A category defines a post's navigational subsection, listing page and url path.`,
            weak: true,
            type: 'reference',
            to: {
                type: 'category'
            },
            validation: Rule => Rule.error('You have to define a category.').required()
        },
        // {
        //     name: 'teaserImage',
        //     title: 'Teaser Image',
        //     type: 'image',
        //     fieldset: 'postSettings',
        //     description: `Teaser images are used in listing pages, on Google and when people share your post in social media.`
        // },
        // {
        //     name: 'excerpt',
        //     title: 'Excerpt',
        //     type: 'excerpt',
        //     fieldset: 'postSettings',
        //     description: `Post Excerps are used in listing pages, on Google and when people share your post in social media.`,
        //     validation: Rule => Rule.error('You have to define an excerpt for this post.').required()
        // },
        {
            name: 'keywords',
            title: 'Keywords',
            fieldset: 'postSettings',
            description: `Add keywords to predefined list, then to the post.`,
            type: 'array',
            of: [{
                weak: true,
                type: 'reference',
                to: {
                    type: 'keyword'
                }
            }],
        },
    ],
    orderings: [
        {
            name: 'titleAsc',
            title: 'Title a–>z',
            by: [
                {
                    field: 'title',
                    direction: 'asc'
                }
            ]
        },
        {
            name: 'titleDesc',
            title: 'Title z->a',
            by: [
                {
                    field: 'title',
                    direction: 'desc'
                }
            ]
        },
        {
            name: 'ownerAsc',
            title: 'Owner a–>z',
            by: [
                {
                    field: 'owner.slug.current',
                    direction: 'asc'
                }
            ]
        },
        {
            name: 'ownerDesc',
            title: 'Owner z->a',
            by: [
                {
                    field: 'owner.slug.current',
                    direction: 'desc'
                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'title',
            slug: 'slug.current',
            category: 'category.slug.current',
            owner: 'owner.slug.current',
            approved: 'approved',
            created: '_createdAt'
        },
        prepare({ title, slug, category, owner, approved, created }) {
            //console.log(`owner: `+JSON.stringify(owner))
            const dateSegment=format(created, 'DD/MM/YYYY')
            const dt=`${title}`
            const at=title // post is approved, (a)pproved (t)itle
            const dp=`${owner} ./${category}/${slug}/ [created: ${dateSegment}]`
            const ap=`${owner} ./${category}/${slug}/ [approved]` // post is approved, (a)pproved (p)ath
            return {
                title: approved? at:dt,
                subtitle: approved? ap:dp
            }
        }
    }
}
