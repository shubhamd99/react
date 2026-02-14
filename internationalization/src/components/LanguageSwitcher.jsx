import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button
        onClick={() => changeLanguage("en")}
        disabled={i18n.resolvedLanguage === "en"}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage("es")}
        disabled={i18n.resolvedLanguage === "es"}
      >
        Español
      </button>
      <button
        onClick={() => changeLanguage("hi")}
        disabled={i18n.resolvedLanguage === "hi"}
      >
        हिंदी
      </button>
    </div>
  );
};

export default LanguageSwitcher;
