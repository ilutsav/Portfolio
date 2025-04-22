// src/theme.js

// Define and export the Color Theme Constants
export const colorTheme = {
    // Backgrounds
    bgGradient: `bg-gradient-to-br from-white via-gray-50 to-gray-100`,
    bgSectionAlt: `bg-white`,
    bgCard: `bg-white`,
    bgFooter: `bg-gray-100`,
    bgNavbar: `bg-white/80`,
    bgTag: `bg-teal-100`,
    bgSkillBarTrack: `bg-gray-200`,
    bgPlaceholder: `bg-gradient-to-br from-teal-50 via-gray-50 to-cyan-50`,
    bgInput: `bg-gray-50`, // Input background for light theme

    // Text
    textPrimary: `text-gray-900`,
    textBody: `text-gray-800`,
    textSecondary: `text-gray-700`,
    textSubtle: `text-gray-600`, // For labels, placeholders, secondary info
    textAccent: `text-teal-600`,
    textAccentHover: `hover:text-teal-700`,
    textInverse: `text-white`,
    textTag: `text-teal-800`,
    textPlaceholder: `placeholder-gray-400`, // Placeholder text color
    textError: `text-red-600`, // For error messages
    textSuccess: `text-teal-700`, // For success messages (using darker accent)

    // Borders
    borderStandard: `border-gray-200`,
    borderAccent: `border-teal-500`,
    borderAccentLight: `border-teal-300`,
    borderNavActive: `border-b-2 border-teal-600`,
    borderCard: `border-gray-200`,
    borderInput: `border-gray-300`, // Default input border
    borderInputFocus: `focus:border-teal-500`, // Focus border color

    // Rings (for focus indication)
    ringAccent: `focus:ring-teal-500`, // Focus ring color
    ringWidth: `focus:ring-2`, // Focus ring width
    ringOffset: `focus:ring-offset-1`, // Optional offset for better visibility

    // Gradients
    gradientAccentBar: `bg-gradient-to-r from-teal-500 to-cyan-600`,
    gradientAccentText: `bg-gradient-to-r from-teal-600 to-cyan-600`,
    gradientButton: `bg-gradient-to-r from-teal-500 to-cyan-600`, // Button gradient
    gradientButtonHover: `hover:from-teal-600 hover:to-cyan-700`, // Button gradient hover

    // Buttons (Base styles + Specific styles)
    buttonBase: `font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2`,
    // Primary Button (using gradient)
    buttonPrimaryGradient: `text-white ${`bg-gradient-to-r from-teal-500 to-cyan-600`} hover:from-teal-600 hover:to-cyan-700 focus:ring-teal-500`,
    // Primary Button (using solid color - if needed elsewhere)
    buttonPrimarySolid: `text-white bg-teal-600 hover:bg-teal-700 focus:ring-teal-500`,
    // Button Widths
    buttonFullWidth: `w-full px-6 py-3`,
    buttonStandardWidth: `px-8 py-3`, // For non-full-width buttons like Hero

    // Shadows
    shadowCard: `shadow-lg`,
    shadowCardHover: `hover:shadow-xl`,
    shadowImage: `shadow-xl shadow-teal-400/20`
};