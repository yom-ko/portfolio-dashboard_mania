export const fetchArticles = url =>
  fetch(url).then(response => response.json());

export const url =
  'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=111e8ebd07184c4290fce4a5e5f390a6';

export default fetchArticles;
