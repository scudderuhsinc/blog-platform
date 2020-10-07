export default {
    name: 'owner',
    title: 'Owners',
    type: 'document',
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string',
            description: `Facility or System Name`
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            description: `Facility or System Code, initals`
        },
        // {
        //     name: 'logo',
        //     title: 'Logo',
        //     description: `This will be the blog's logo in the header.`,
        //     type: 'mainImage'
        // },
        {
            name: 'link',
            title: 'Link',
            description: `This will be the blog's parent website.`,
            type: 'url'
        }
    ]
}