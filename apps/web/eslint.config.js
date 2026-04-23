import nextConfig from "eslint-config-next";

export default [
  ...nextConfig.map(c => {
    if (c.ignores) return c;
    if (c.name === "next/typescript") {
      return {
        ...c,
        rules: {
          ...c.rules,
          "@typescript-eslint/no-unused-vars": "warn",
          "@typescript-eslint/no-explicit-any": "warn",
        }
      };
    }
    return {
      ...c,
      rules: {
        ...c.rules,
        "react/no-unescaped-entities": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react-hooks/set-state-in-effect": "warn",
        "react-hooks/purity": "off",
      }
    };
  })
];
