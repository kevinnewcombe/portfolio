module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./favicon.ico");
};


// minify inlined css
const CleanCSS = require("clean-css");
module.exports = function (eleventyConfig) {
	eleventyConfig.addFilter("cssmin", function (code) {
		return new CleanCSS({}).minify(code).styles;
	});
};

const htmlmin = require("html-minifier");
module.exports = (eleventyConfig) => {
  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        collapseWhitespace: true,
        removeComments: true,  
        useShortDoctype: true,
      });
    }

    return content;
  });
};
const eleventyPluginFilesMinifier = require("@sherby/eleventy-plugin-files-minifier");
module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(eleventyPluginFilesMinifier);
};
