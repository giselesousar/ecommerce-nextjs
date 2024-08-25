export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
};

export const formatQueryString = (params: any) => {
  const arrayKeys = Object.keys(params);
  const arrayValues = Object.values(params);

  const query = arrayValues.map((value, index) => {
    if (Array.isArray(value)) {
      const queryArray = value.map(
        (valueArray) => `${arrayKeys[index]}=${valueArray}`
      );

      return queryArray.join("&");
    } else {
      return `${arrayKeys[index]}=${value}`;
    }
  });

  return query.join("&");
};
