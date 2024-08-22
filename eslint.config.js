import tseslint from 'typescript-eslint'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import { fixupConfigRules } from '@eslint/compat'

export default [
  { 
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] 
  },
  { 
    languageOptions: { 
      parserOptions: { 
        ecmaFeatures: { 
          jsx: true 
        } 
      } 
    } 
  },
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/no-unescaped-entities": "warn",
    }
  },
]
