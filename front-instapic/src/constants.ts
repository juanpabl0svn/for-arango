export const API_URL = 'http://localhost:3000';

export const GET = (url: string) =>
  fetch(`${API_URL}${url}`)
    .then((res) => res.json())
    .catch(() => null);

export const POST = (url: string, data: any) =>
  fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch(() => null);

export const POST_STORAGE = (data: FormData) => {
  return fetch('https://sipsoftware.co/test_img/up.php', {
    method: 'POST',
    body: data,
  }).then((res) => res.json());
};
