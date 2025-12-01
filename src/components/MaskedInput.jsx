import React from "react";

export default function MaskedInput({ mask, value, onChange, ...props }) {
  const applyMask = (value, mask) => {
    if (!value) return "";
    
    const cleanValue = value.replace(/\D/g, "");
    let maskedValue = "";
    let valueIndex = 0;

    for (let i = 0; i < mask.length && valueIndex < cleanValue.length; i++) {
      if (mask[i] === "9") {
        maskedValue += cleanValue[valueIndex];
        valueIndex++;
      } else {
        maskedValue += mask[i];
      }
    }

    return maskedValue;
  };

  const handleChange = (e) => {
    const maskedValue = applyMask(e.target.value, mask);
    
    // Criar evento sintético com valor mascarado
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        name: e.target.name,
        value: maskedValue,
      },
    };
    
    onChange(syntheticEvent);
  };

  return (
    <input
      {...props}
      value={value}
      onChange={handleChange}
    />
  );
}
