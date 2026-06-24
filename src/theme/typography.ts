export const typography = {
  fontFamily: {
    sans: 'Google Sans Flex',
  },
  fontSize: {
    // Headings
    h1: 32,
    h2: 24,
    h3: 20,
    h4: 18,
    // Body text
    b1: 16,
    b2: 14,
    b3: 13,
    b4: 12,
  },
  fontWeight: {
    bold: '700',
    semibold: '600',
    medium: '500',
    regular: '400',
  },
  lineHeight: {
    h1: 40,
    h2: 32,
    h3: 26,
    h4: 24,
    b1: 24,
    b2: 20,
    b3: 18,
    b4: 16,
  },
  // Reusable text style definitions for JS-based components
  styles: {
    h1: {
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 40,
      fontFamily: 'Google Sans Flex',
    },
    h2: {
      fontSize: 24,
      fontWeight: '700' as const,
      lineHeight: 32,
      fontFamily: 'Google Sans Flex',
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 26,
      fontFamily: 'Google Sans Flex',
    },
    h4: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 24,
      fontFamily: 'Google Sans Flex',
    },
    b1: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
      fontFamily: 'Google Sans Flex',
    },
    b2: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
      fontFamily: 'Google Sans Flex',
    },
    b3: {
      fontSize: 13,
      fontWeight: '400' as const,
      lineHeight: 18,
      fontFamily: 'Google Sans Flex',
    },
    b4: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16,
      fontFamily: 'Google Sans Flex',
    },
  },
};
