import React from "react";
import { useTranslation } from "react-i18next";

const Formatting = () => {
  const { t } = useTranslation();
  const date = new Date();
  const price = 1234.56;

  return (
    <div>
      <p>{t("formatting.current_date", { date })}</p>
      <p>{t("formatting.date_long", { date })}</p>
      <p>{t("formatting.time_simple", { date })}</p>
      <p>{t("formatting.cost", { price })}</p>
      <p>{t("formatting.number_example", { val: 1234567.89 })}</p>
    </div>
  );
};

export default Formatting;
