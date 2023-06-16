"use client";

import {
  GET_BRANDS,
  GET_CATEGORIES,
  GET_PRODUCTS,
  GET_SUB_CATEGORIES,
  USERS_ERROR,
  // GET_FILTERED_PRODUCTS,
  SET_FILTERED_PRODUCTS,
  GET_PRODUCT_BY_ID,
  SET_USER_STATE,
  SET_USER_INFO,
  ADD_CARRITO,
  DELETE_CARRITO,
  SET_CARRITO,
  ADD_COMMENT,
  CLEAR_USER_DATA,
  SET_TEMPORAL_CARRITO,
} from "./actions";

export const initialState = {
  filteredProducts: [],
  products: [],
  paginaactual: 1,
  categories: [],
  subCategories: [],
  brands: [],
  productDetail: [],
  userState: 1,
  userInfo: [],
  carrito: [],
};

try {
  if (typeof window !== "undefined") {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      initialState.comments = JSON.parse(storedComments);
    }
  }
} catch (error) {
  console.error("Error al acceder al localStorage:", error);
}
// * Estados del usuario
//* 1: No legueado, 2: autenticado, 3: Registrado

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
        allProducts: action.payload,
      };

    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        productDetail: action.payload,
        paginaactual: 1,
      };

    case GET_BRANDS:
      return {
        ...state,
        brands: [...action.payload],
        paginaactual: 1,
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: [...action.payload],
        paginaactual: 1,
      };

    case GET_SUB_CATEGORIES:
      return {
        ...state,
        subCategories: [...action.payload],
        paginaactual: 1,
      };

    case SET_FILTERED_PRODUCTS:
      return {
        ...state,
        filteredProducts: [...action.payload],
        paginaactual: 1,
      };

    case ADD_CARRITO:
      return {
        ...state,
        carrito: [...state.carrito, action.payload],
      };

    case DELETE_CARRITO:
      const { id, quantityToDelete } = action.payload;
      const productIndex = state.carrito.findIndex(
        (product) => product.id === id
      );

      if (productIndex !== -1) {
        const updatedCart = [...state.carrito];
        const product = updatedCart[productIndex];

        if (product.quantity > quantityToDelete) {
          // Si la cantidad es mayor a quantityToDelete, decrementar la cantidad
          updatedCart[productIndex] = {
            ...product,
            quantity: product.quantity - quantityToDelete,
          };
        } else {
          // Si la cantidad es menor o igual a quantityToDelete, eliminar el producto del carrito
          updatedCart.splice(productIndex, 1);
        }
        state.userInfo.carrito = updatedCart;

        return {
          ...state,
          carrito: updatedCart,
        };
      }

    case SET_CARRITO:
      return {
        ...state,
        carrito: action.payload,
      };

    case USERS_ERROR:
      return {
        error: action.payload,
      };

    case SET_USER_STATE:
      return {
        ...state,
        userState: action.payload,
      };
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case CLEAR_USER_DATA:
      return {
        ...state,
        userInfo: [],
        carrito: [],
      };
    default:
      return state;
  }
}
