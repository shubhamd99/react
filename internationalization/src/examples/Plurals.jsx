import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Plurals = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{t("interpolation.unread_messages", { count })}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
};

export default Plurals;
