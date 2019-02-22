import {
    GET_PROJECT_TASKS,
    GET_CATEGORY_PRODUCTS,
    GET_SEARCH_PRODUCTS,
    GET_SINGLE_PRODUCT,
    GET_USERINFO,
    GET_CART,
    GET_CHECKOUT,
    GET_ORDERDETAIL,
    GET_CATEGORIES
   } from "../actions/types";
  
  const initialState = {
    project_tasks: [],
    project_task: {},
    catagory_products : [],
    search_products : [],
    single_product : [],
    user_info: [],
    cart_products: [],
    checkout_products: [],
    order_details: [],
    product_categories: [] 
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_PROJECT_TASKS:
        return {
          ...state,
          project_tasks: action.payload
        };

      case GET_CATEGORY_PRODUCTS:
        return {
          ...state,
          catagory_products: action.payload
        };

      case GET_SEARCH_PRODUCTS:
        return {
          ...state,
          search_products: action.payload
        };
      
      case GET_SINGLE_PRODUCT:
        return {
          ...state,
          single_product: action.payload
        };  
    
      case GET_USERINFO:
        return {
          ...state,
          user_info: action.payload
        };

        case GET_CART:
        return {
          ...state,
          cart_products: action.payload
        };

        case GET_CHECKOUT:
        return {
          ...state,
          checkout_products: action.payload
        };

        case GET_ORDERDETAIL:
        return {
          ...state,
          order_details: action.payload
        };

        case GET_CATEGORIES:
        return {
          ...state,
          product_categories: action.payload
        };

      default:
        return state;
    }
  }
  