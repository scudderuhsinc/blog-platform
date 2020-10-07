# Blog Platform
Supports corporate, system, acute, ipm and behavioral health blogs

## getting started
Here are a few resources for you to get started developing and updating the platform in your local development enviornment. Also, at the end of this document is "built with" listing of the 

### studio `studio/`
To get started with the *Sanity Studio Dashboard*, here are a few resources:

* Documentation

    * [Sanity.io - “getting started”](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)

* Help

    * [Join the community Slack](https://slack.sanity.io/?utm_source=readme)

* Local Development
    * here

*Command Line Interface (CLI)*
>
> build `$ sanity build`
>

>
> start local `$ sanity start`
>

### 11ty `web/`
To get started with the *static site builder, 11ty*, here are a few resources:

* Documentation
    * here

* Tutorials
    * [FilamentGroup.com - "Build a Blog"](https://www.filamentgroup.com/lab/build-a-blog/)

* Local Development
    * here

*Command Line Interface (CLI)*
>
> build `$ npx @11ty/eleventy`
>

>
> build & serve: `$ npx @11ty/eleventy --serve`
>

## post

### title
### subtitle
### slug

### owner
Posts are grouped together to create a blog, one blog per owner. A blog can be owned by the UHS corporatation, a healthcare system, acute care, ipm or behavioral health facility. Every post must have one and only one owner.

### capstone posts
Corporate blog posts are specific to *Universal Health Services* but the listing pages also incorporate teasers from content found on other blog websites. If an external post is to be listed on the corporate blog, the post is defined as a *capstone* post. By default each post is not a *capstone*, or false. Set the *capstone* value to true and a post will be represented as a teaser on the corporate blog. The teaser link will forward a user to the individual blog and post. To avoid any confusion by search engines, the individual blog's post is defined as *canonical*.

>
> Studio: Posts > Plattform Settings > Capstone Post - True/False
>

### canonical posts
If content is shared by two or most posts on seporate blogs, search engines could confuse which post should be represented in search results. Define the canonical record for similar or duplicate blog posts.
>
>  example: `<link rel="canonical" href="https://example.com/dresses/green-dresses" />`
>

Further information can be found on Google's [webmaster documentation](https://support.google.com/webmasters/answer/139066)

### approved
Approval documents that a post has completed all the required internal and/or client review processes.
>
> Studio: Posts > Platform Settings > Approved - true/false
>

### featured image
### copy
### copy teaser

## categories
All blogs share one immutable set of categories. Categories define the navigational menu used by all blogs. Categories also define the listing pages a post will appear within and the unique url path.
>
> path: `https:// <owner> / blog / <category-name> / <post-title>`
>

* Manage categories
>
> Studio: Categories > List : Category Names
>

Each post is required to have one and only one category.
* Add a categorgy to a Post
>
> Studio: Posts > *Settings Group* > Category Listing - pull-down menu 
>

## keywords
Keywords define the. Only Administators can add or delete keywords from list of options. 
* Manage keywords
>
> Studio: Keywords > List : Keyword Names
>

Each post can have any number of keywords from a predefined list of options.
* Add keywords to a Post
>
> Studio: Posts >  *Settings Group* > Keywords - text field, auto complete
>

## global ctas
'Call to Actions'

## owners

### name
### slug
### ctas
Blog specific 'Call to Actions'

## multi-blog support
This platform is designed to build multiple blogs from one [Sanity Dataset](https://www.sanity.io/docs/datasets) and [code base](https://github.com/Universal-Health-Services). All `posts` have an associated blog and is defined by a refrence type to `owner`. Some basic rules to keep in mind:

* one (1) `owner` to many (n) `posts`, 1-to-many
* each `post` has one (1) refrence to a single (1) `owner`, 1-to-1
* a `<blog-code>` or 'slug' defines the corporate, system, acute, ipm or behavioral health blog `owner`
* a `<blog-code>` is a unique identifier and is used to limit the [groq](https://www.sanity.io/docs/overview-groq) queries for each blog's *Studio* deployment, resulting in posts for the single owner, **individual blog Studios are not currently implemented**
* the `<blog-code>` also is used within templates and CSS styles to customize the front-end presentation
* see list of *supported owners*

### supported owners
1. corporate
    * [Universal Health Services, Inc. (UHS)](https://www.uhsinc.com/) - slug: **corp**
2. systems
3. acute care facilities
4. ipm facilities
    * [Manatee Weight Loss Center](https://www.msaweightloss.com/) - slug: **mwlc**
5. behavioral health facilities

### environment variables
Enviornmental variables allow a single datastore, code base and templetes files to create each individual blog. 

**do not** maintain any `.env.*` files within repos.

The existing *studio/.env.example* and *web/.env-example* are **examples** for local development purposes. Make a duplicate of the example files and rename for your local enviornment. For a local development enviornment, use *env.development* and *env-development*. Update the variables for the project.

Set any production environmental variables through your host or continous integration provider.

Here are a few resources for managing .env files:

1. [11ty Docs](https://www.11ty.dev/docs/data-js/#example-exposing-environment-variables)
2. [Node Docs](https://nodejs.org/api/process.html#process_process_env)
3. [dotenv NPM Package](https://www.npmjs.com/package/dotenv)
4. [Netlify Docs](https://community.netlify.com/t/common-issue-using-environment-variables-on-netlify-correctly/267/19)

- [tutorial](https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786)

## TO DO

### front-end
* search, "text" string input search: tags, categories, titles & post content
* search, suggested text from user input

### platform
*schema(s), variable – function description*

* **owner** & **post**, all `<blog-code>` posts – create functionality to pull blog owner from environment variable 'owner' > 'slug' into GROQ query (i.e. only posts owned by `armc`)

### studio
*schema(s), variable – function description*

* #### all
    * **post**, publishAt – create functionality to set a future Publish Date
    * *any*, Slugs – remove punctuation from titles when creating slugs
    * *any*, Slugs – remove words such as: the, a, *more here* from titles when creating slugs

* #### blog specific
    * **post**, initialValue – set to .env variable 'owner' > 'slug' (i.e. the blog code, e.g. `armc` )


## built with

### administrative dashboard
* [React](https://reactjs.org/)
* [Sanity.io](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
* [Font Awesome Icons](https://react-icons.github.io/react-icons/icons?name=fa)

### static front-end files
* [11ty](https://www.11ty.dev/)
* [UHS Design Standards](#)
* [UHS Styles](#)
* [another](#)

