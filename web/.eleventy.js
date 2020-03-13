
const { DateTime }=require("luxon");
const CleanCSS=require("clean-css");
const util=require('util');

module.exports=function (eleventyConfig) {


  // Find and copy any `png` files, maintaining directory structure.
  // UHS Footer Logo
  //eleventyConfig.addPassthroughCopy("*.png");

  eleventyConfig.addFilter("debug", function (value) {
    return util.inspect(value, { compact: false })
  });

  eleventyConfig.addFilter("readableDate", dateObj => {
    return new Date(dateObj).toDateString()
  });

  https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  // https://www.11ty.io/docs/quicktips/inline-css/
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  let markdownIt=require("markdown-it");
  let markdownItAnchor=require("markdown-it-anchor");
  let options={
    html: true,
    breaks: true,
    linkify: true
  };
  let opts={
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  };

  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts)
  );

  eleventyConfig.addFilter("markdownify", function (value) {
    const md=new markdownIt(options)
    return md.render(value)
  })

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "blog",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
}
