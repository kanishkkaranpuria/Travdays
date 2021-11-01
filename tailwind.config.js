module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  theme: {
    screens: {
      'sm': {'max': '450px'},
    }
  }
}
