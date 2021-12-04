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
      'md':{'max':'800px'},
      'lg':{'min':'800px'},
      'xl':{'min':'1100px'}
    }
  }
}
