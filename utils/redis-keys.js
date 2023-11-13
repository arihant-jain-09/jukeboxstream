export const userLikesKey = (userId) => `users:likes#${userId}`;
export const itemsKey = (itemId) => `items#${itemId}`;
export const itemByLikesKey = () => `items:likes`;
export const itemByViewsKey = (itemId) => `items:views#${itemId}`;
export const itemColorKey = (itemId) => `items:colors#${itemId}`;
export const userItemsKey = (userId, itemId) =>
  `items:user:${userId}#${itemId}`;
export const userItemColorKey = (userId, itemId) =>
  `items:colors:user:${userId}#${itemId}`;
