/** 日期格式化：YYYY-MM-DD → 中文可读格式 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/** 计算阅读时长（按 400 字/分钟） */
export function readingTime(content: string): string {
  const words = content.replace(/<[^>]*>/g, '').length;
  const minutes = Math.max(1, Math.ceil(words / 400));
  return `${minutes} 分钟阅读`;
}

/** 从日期和标题生成 slug */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
