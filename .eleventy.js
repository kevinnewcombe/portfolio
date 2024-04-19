
const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
const eleventyPluginFilesMinifier = require("@sherby/eleventy-plugin-files-minifier");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./favicon.ico"); // add favicon to the build
  eleventyConfig.addWatchTarget("./src/assets/");

  // minify css
	eleventyConfig.addFilter("cssmin", function (code) {
		return new CleanCSS({}).minify(code).styles;
	});

	// minify html
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
  eleventyConfig.addPlugin(eleventyPluginFilesMinifier);

	return {
    dir: {
      input: "src",
      output: "_site"
    }
  }
};
