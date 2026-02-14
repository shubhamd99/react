import React from "react";
import { useTranslation } from "react-i18next";

const Context = () => {
  const { t } = useTranslation();

  return (
    <div>
      <p>{t("context.friend")}</p>
      <p>{t("context.friend", { context: "male" })}</p>
      <p>{t("context.friend", { context: "female" })}</p>
    </div>
  );
};

export default Context;
