export const API_URL = 'http://localhost:3000';

export const GET = (url: string) =>
  fetch(`${API_URL}${url}`).then((res) => res.json());

export const POST = (url: string, data: any) =>
  fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
