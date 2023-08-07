/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'metropolis': ['Metropolis', 'sans-serif'],
      },
      colors: {
        'bg-color': 'var(--bg-color)',
        'sidebar-color': 'var(--sidebar-color)',
        'header-color': 'var(--header-color)',
        'text-color': 'var(--text-color)',
        'accent-color': 'var(--accent-color)',
        'menu-background-color': 'var(--menu-background-color)',
        'light-gray': 'var(--light-gray)',
        'medium-gray': 'var(--medium-gray)',
        'dark-gray': 'var(--dark-gray)',
        'menu-text-color': 'var(--menu-text-color)',
        'border': 'var(--border)',
        'error': 'var(--error)',
        'warning':'var(--warning)',
      },
      minWidth: {
        'sidebar-width': 'var(--sidebar-width)',
      },
      height: {
        'header-height': 'var(--header-height)',
      },
    },
  },
  plugins: [],
}

