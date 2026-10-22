// Servicio de conexión con la API REST de Express
const API_BASE = 'http://localhost:3000/api';

export const getProductos = async () => {
  const res = await fetch(`${API_BASE}/productos`);
  return await res.json();
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return await res.json();
};

export const registrarUser = async (userData) => {
  const res = await fetch(`${API_BASE}/auth/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return await res.json();
};
