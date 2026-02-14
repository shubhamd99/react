import React from "react";
import { useTranslation } from "react-i18next";

const BasicUsage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <p>{t("basic.greeting")}</p>
      <p>{t("description")}</p>
    </div>
  );
};

export default BasicUsage;
