export default {
    name: 'owner',
    title: 'Owner',
    type: 'document',
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string',
            description: `Facility or System Name`
        },
        {
            title: 'Code',
            name: 'code',
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