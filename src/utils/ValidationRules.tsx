function validatePercentage(percentageInput: number) {
  return percentageInput >= 0 && percentageInput < 100;
}

function validateNumberTextAmount(numberTextAmountInput: string) {
  const regex = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/;
  return regex.test(numberTextAmountInput);
}
