export const searchPhotoApi = async (SearchValue = '', currentPage = 1) => {
  const response = await fetch(
    `https://pixabay.com/api/?q=${SearchValue}&page=${currentPage}&key=36096830-1929e3c4e7943bc1682b1faff&image_type=photo&orientation=horizontal&per_page=12`
  );
  return await response.json();
};
