/**
 * Format date to Persian format
 * @param dateString ISO date string
 * @returns Formatted date in Persian locale
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR");
  } catch {
    return "تاریخ نامشخص";
  }
}
