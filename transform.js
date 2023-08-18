module.exports = {
  process() {
    return {
      code: 'module.export = {};'
    };
  },

  getCacheKey () {
    return 'transform';
  }
};
