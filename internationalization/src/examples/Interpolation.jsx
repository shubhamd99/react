import React from "react";
import { useTranslation } from "react-i18next";

const Interpolation = () => {
  const { t } = useTranslation();
  const userName = "Shubham";

  return (
    <div>
      <p>{t("interpolation.welcome", { name: userName })}</p>
    </div>
  );
};

export default Interpolation;
