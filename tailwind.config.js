module.exports = {
  content: [
    './App.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        success: {
          light: '#D1FAE5',
          DEFAULT: '#10B981',
          dark: '#065F46',
        },
        warning: {
          light: '#FEF3C7',
          DEFAULT: '#F59E0B',
          dark: '#78350F',
        },
        error: {
          light: '#FEE2E2',
          DEFAULT: '#EF4444',
          dark: '#7F1D1D',
        },
      },
      fontFamily: {
        sans: ['Google Sans Flex', 'System', 'sans-serif'],
      },
      fontSize: {
        h1: ['32px', { lineHeight: '40px', fontWeight: '700' }],
        h2: ['24px', { lineHeight: '32px', fontWeight: '700' }],
        h3: ['20px', { lineHeight: '26px', fontWeight: '600' }],
        h4: ['18px', { lineHeight: '24px', fontWeight: '600' }],
        b1: ['16px', { lineHeight: '24px', fontWeight: '400' }],
        b2: ['14px', { lineHeight: '20px', fontWeight: '400' }],
        b3: ['13px', { lineHeight: '18px', fontWeight: '400' }],
        b4: ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },
      borderRadius: {
        'large-btn': '9999px', // Fully rounded by default for components
      },
    },
  },
  plugins: [],
};
