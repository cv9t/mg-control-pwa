module.exports = {
  '{apps,libs}/**/*.{js,ts,jsx,tsx,json}': [
    (files) => `nx format:write --files=${files.join(',')}`,
    (files) => `nx affected -t lint --files=${files.join(',')}`,
  ],
};
