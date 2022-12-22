import { useState, useEffect } from "react";

export function PriceEditor(price) {
  const [convertedPrice, setConvertedPrice] = useState(null);

  useEffect(() => {
    const stringPrice = price.toString();
    const array = [];
    for (let i = stringPrice.length; i > 0; i -= 3) {
      array.push(stringPrice.substring(i, i - 3));
    }
    let newPrice = "";
    for (let i = array.length - 1; i >= 0; i--) {
      if (i === 0) {
        newPrice += array[i];
      } else {
        newPrice += array[i] + ",";
      }
    }
    setConvertedPrice(newPrice);
  }, [price]);

  return convertedPrice;
}
