// src/theme/typography.ts
// Typography definitions using Poppins font

export const typography = {
  // Font families
  fontFamily: 'Poppins-Regular, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontFamilyBold: 'Poppins-Bold, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontFamilyMedium: 'Poppins-Medium, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',

  // Heading sizes (responsive scaled)
  h1: { fontSize: 32, fontFamily: 'Poppins-Bold', fontWeight: '700', lineHeight: 40 }, // Large bold header
  h2: { fontSize: 24, fontFamily: 'Poppins-Bold', fontWeight: '700', lineHeight: 32 }, // Section title
  h3: { fontSize: 20, fontFamily: 'Poppins-Bold', fontWeight: '700', lineHeight: 28 },
  h4: { fontSize: 18, fontFamily: 'Poppins-Bold', fontWeight: '700', lineHeight: 26 },

  // Body text
  body: { fontSize: 16, fontFamily: 'Poppins-Regular', fontWeight: '400', lineHeight: 24 },
  small: { fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: '400', lineHeight: 20 },
  label: { fontSize: 12, fontFamily: 'Poppins-Medium', fontWeight: '500', lineHeight: 16 },
};

export const Typography = typography;
