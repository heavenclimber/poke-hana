/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}", // include these if not using `src/`
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E6F7F5", // Very light Hana Green
          100: "#BCE8E2", // Light Hana Green
          200: "#8EDACC", // Medium-light green
          300: "#5DC3B7", // Main Hana Green
          400: "#43A898", // Darker green
          500: "#2A8F7D", // Dark Hana Green
          600: "#23715F", // Deep green
          700: "#1A4B3E", // Very dark green
          800: "#122B21", // Almost black green
          900: "#0B170F", // Near black green
        },
        secondary: {
          50: "#FEF7EB", // Very light gold
          100: "#FCEBD1", // Light gold
          200: "#FAD9AC", // Light-medium gold
          300: "#FBCFAA", // Main Hana Gold
          400: "#E2B57E", // Medium dark gold
          500: "#D79A7A", // Dark gold
          600: "#B37A5B", // Deeper gold brown
          700: "#7D533E", // Very dark gold brown
          800: "#4C3425", // Deep brown
          900: "#261B14", // Almost black brown
        },
        red: {
          50: "#FFE7E7", // Very light red
          100: "#FFB6B6", // Light red
          200: "#FF8B8B", // Medium light red
          300: "#F96060", // Main red
          400: "#E03D3D", // Dark red
          500: "#B83131", // Darker red
          600: "#8E2727", // Deep red
          700: "#5E1B1B", // Very dark red
          800: "#3A1111", // Almost black red
          900: "#1C0808", // Near black red
        },
        neutral: {
          50: "#F9F9F9", // Very light gray
          100: "#E6E6E6", // Light gray
          200: "#BFBFBF", // Medium gray
          300: "#999999", // Medium dark gray
          400: "#666666", // Dark gray
          500: "#404040", // Darker gray
          600: "#2B1D40", // Dark gray (blueish)
          700: "#212121", // Black (main)
          800: "#1A1A1A", // Very dark gray
          900: "#0D0D0D", // Near black
        },
        warmgray: {
          50: "#F8F6F1", // Very light warm gray
          100: "#E6E0D5", // Light warm gray
          200: "#CCC2A8", // Medium warm gray
          300: "#B2A67C", // Brownish gray
          400: "#988950", // Dark warm gray
          500: "#7F6D24", // Deep warm gray
          600: "#665717", // Darker warm gray
          700: "#4C4010", // Very dark warm gray
          800: "#332B0A", // Almost black warm gray
          900: "#1A1505", // Near black warm gray
          950: "#0D0A02", // Black warm gray
        },

        // Semantic colors for alerts, messages, etc.
        danger: {
          50: "#FFE7E7", // Very light danger red
          100: "#FFB6B6", // Light danger red
          200: "#FF8B8B", // Medium danger red
          300: "#F96060", // Main danger red
          400: "#E03D3D", // Dark danger red
          500: "#B83131", // Darker danger red
          600: "#8E2727", // Deep danger red
          700: "#5E1B1B", // Very dark danger red
          800: "#3A1111", // Almost black danger red
          900: "#1C0808", // Near black danger red
        },
        success: {
          50: "#E6FAF1", // Very light success green
          100: "#B8EFD1", // Light success green
          200: "#8ADDAD", // Medium success green
          300: "#53CF7D", // Main success green
          400: "#38B961", // Dark success green
          500: "#2A8F4A", // Darker success green
          600: "#1F6B36", // Deep success green
          700: "#154821", // Very dark success green
          800: "#0A2B11", // Almost black success green
          900: "#041606", // Near black success green
        },
        info: {
          50: "#E6F0FA", // Very light info blue
          100: "#B8D6F7", // Light info blue
          200: "#8BB9F2", // Medium info blue
          300: "#529EF0", // Main info blue
          400: "#367DDB", // Dark info blue
          500: "#275EA9", // Darker info blue
          600: "#1B4477", // Deep info blue
          700: "#10304A", // Very dark info blue
          800: "#081C24", // Almost black info blue
          900: "#040E12", // Near black info blue
        },
      },
    },
  },
  plugins: [],
};
