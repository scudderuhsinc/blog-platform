const sanityClient=require("@sanity/client");
const dotenv=require('dotenv');
dotenv.config();

/**
 * Sanity API
 * ../studio/sanity.json is not accessible
 * set api from environment variables
 */
const api = {
    "projectId":process.env.SANITY_API_PROJECT_ID, 
    "dataset": process.env.SANITY_API_DATASET,
    "blog": process.env.SANITY_API_BLOG
}
// set 11ty blog environment variable
process.env.ELEVENTY_ENV = process.env.SANITY_API_BLOG;

//console.log(`api: `+JSON.stringify(api));
//console.log(`11ty env: `+process.env.ELEVENTY_ENV)

/**
 * Sanity Client
 */
module.exports=sanityClient({ ...api, useCdn: true });