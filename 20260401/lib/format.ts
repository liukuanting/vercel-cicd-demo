export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("zh-TW", {
    month: "long",
    day: "numeric",
    weekday: "short"
  }).format(new Date(dateString));
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    maximumFractionDigits: 0
  }).format(value);
}
