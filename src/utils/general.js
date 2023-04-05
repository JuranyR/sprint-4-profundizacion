export const getPrice=(price)=>{
  if(price){
    return Number(price.replace(/[$]/g,"").trim())
  }
  return undefined
}

export const getTotalOrder= (products)=>{
  if(Array.isArray(products)){
    const sum = products.reduce(
      (accumulator, currentValue) => accumulator + getPrice(currentValue.totalOrder),
      0,
    );
    return sum.toFixed(2)
  }
  return undefined
}


export const validateEmail= (value) =>{
  const re = /\S+@\S+\.\S+/;
  if (!re.test(value)) {
    return 'Email invalid'
  }
  return true
}