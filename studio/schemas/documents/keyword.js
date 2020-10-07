export default {
    name: 'keyword',
    title: 'Keywords',
    type: 'document',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string'
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            description: `url friendly string, 95 characters or less.`,
            options: {
                source: 'title',
                maxLength: 95, // will be ignored if slugify is set
                slugify: input => input
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .slice(0, 95)
            }
        },
        // {
        //     name: 'description',
        //     type: 'description',
        //     validation: Rule => Rule.error('You have to define a description for this keyword.').required()
        // }
    ]
}