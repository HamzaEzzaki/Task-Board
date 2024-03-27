/** @type {import('tailwindcss').Config} */
export default {
  content: [  
  './index.html',
  './src/**/*.vue',
  './src/**/*.js',],
  theme: {
    extend: {
      colors: {
        'primary': '#EBEBEB',
        'primary2': '#F5F5F5',
        'btntxt': '#656565',
        'btnhover':'rgba(94, 111, 225, 0.13)',
        'cardbg':'#F5F4F4',
        'gray0': '#F5F5F5',
        'gray-text': '#656565',
        'gray1': '#EBEBEB',
        'gray2': '#EBE9F1',
        'gray3': 'rgba(0, 0, 0, 0.25)',
        'gray4': '#6b7280',
        'gray5': '#575758',
        'blue1' :'rgba(94, 111, 225, 0.13)',
        'cyan' : '#22d3ee',
        'red'  : '#f87171',
        'white': '#ffffff',
        'yellow' : 'rgba(241, 189, 108, 1)',
        'sky' : 'rgba(158, 231, 227, 1)',
        'purple': 'rgba(205, 149, 234, 1)'
      }
    },
  },
  plugins: [],
}

