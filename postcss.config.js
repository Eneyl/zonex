module.exports = {
  plugins: [
    require('postcss-sort-media-queries')({
      sort: 'desktop-first' 
     }),
    require('autoprefixer'),
    require('postcss-pxtorem')({
      selectorBlackList: ['html'],
    }),
    
  ],
};
