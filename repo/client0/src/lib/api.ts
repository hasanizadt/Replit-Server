'use client';

import { useQuery as urqlUseQuery, useMutation as urqlUseMutation } from 'urql';
import { GET_FEATURED_PRODUCTS } from '@/lib/urql/Query/Products/product.query';
import { GET_PROFILE } from '@/lib/urql/Query/Account/profile.query';
import { LOGIN, REGISTRATION } from '@/lib/urql/Query/Account/auth.query';
import { ADD_CART, GET_CART } from '@/lib/urql/Query/Cart/cart.query';

// کوئری های محصولات
export const useFeaturedProducts = () => {
  return urqlUseQuery({
    query: GET_FEATURED_PRODUCTS
  });
};

// کوئری های حساب کاربری
export const useProfile = (userId: string) => {
  return urqlUseQuery({
    query: GET_PROFILE,
    variables: { id: userId }
  });
};

// میوتیشن های حساب کاربری
export const useLogin = () => {
  return urqlUseMutation(LOGIN);
};

export const useRegister = () => {
  return urqlUseMutation(REGISTRATION);
};

// کوئری های سبد خرید
export const useCart = () => {
  return urqlUseQuery({
    query: GET_CART
  });
};

export const useAddToCart = () => {
  return urqlUseMutation(ADD_CART);
};