export const calculatePages = (
  total: number,
  limit: number,
  currentPage: number
) => {
  const totalPages = Math.ceil(total / limit);

  const next = totalPages > currentPage ? currentPage + 1 : null;

  const previous = currentPage > 1 ? currentPage - 1 : null;

  return {
    next,
    previous,
  };
};
