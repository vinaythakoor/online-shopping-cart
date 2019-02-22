import axios from "axios";
import Qs from 'qs'
import cookie from 'react-cookies'
import {
  GET_ERRORS,
  GET_PROJECT_TASKS,
  GET_CATEGORY_PRODUCTS,
  GET_SEARCH_PRODUCTS,
  GET_SINGLE_PRODUCT,
  GET_USERINFO,
  GET_CART,
  GET_CHECKOUT,
  GET_ORDERDETAIL,
  GET_CATEGORIES 
} from "./types";
 
export const getBacklog = () => async dispatch => {
 
  let token = localStorage.getItem("token");
  //
  axios.defaults.headers.common['Authorization'] = token;

  let Config = {
    headers: {
      Authorization: "Bearer " + token
   }
  }
  console.log(token);
  var bodyParameters = {
    key: "value"
 }

  const res = await axios.get("http://localhost:8080/onlineshopping/",
                    "http://localhost:8080/onlineshopping/home",
                    "http://localhost:8080/onlineshopping/index");
  dispatch({
    type: GET_PROJECT_TASKS,
    payload: res.data
  });
};

export const getCategoryProducts = (ct_id,newProjectTask) => async dispatch => {
  
  let brands = localStorage.getItem('brands');
    
  let params = {
      SlideMin: localStorage.getItem('slideMin'),
      SlideMax: localStorage.getItem('slideMax'),
      brand : JSON.parse(localStorage.getItem('brands'))
    }
  
    let myAxios = axios.create({
      paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'repeat'})
  })

  const res = await myAxios.get(`http://localhost:8080/onlineshopping/view/category/${ct_id}/products`, {params});
  
  dispatch({
    type: GET_CATEGORY_PRODUCTS,
    payload: res.data
  });
 };

 export const getSearchProducts = (searchTerm,SlideMin,SlideMax,activepage) => async dispatch => {
  console.log("active" + searchTerm);
  let params = {
      searchTerm: searchTerm,
      SlideMin: SlideMin,
      SlideMax: SlideMax,
      brand : JSON.parse(localStorage.getItem('searchbrands')),
      page: activepage
    }
  
    let myAxios = axios.create({
      paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'repeat'})
    })

const res = await myAxios.get(`http://localhost:8080/onlineshopping/search`, {params});
  
  dispatch({
    type: GET_SEARCH_PRODUCTS,
    payload: res.data
  });
 };

 export const getSingleProduct = (ct_id) => async dispatch => {
   //alert("hii")
  const res = await axios.get(`http://localhost:8080/onlineshopping/show/${ct_id}/product`);
  
  dispatch({
    type: GET_SINGLE_PRODUCT,
    payload: res.data
  });
 };

  
    export const login = (username,password,csrf,history) => async dispatch => {
      console.log("login...")
      //cookie.save('XSRF-TOKEN', csrf)
        cookie.remove('undefined')
      //cookie.save();
      axios.defaults.xsrfCookieName = 'csrftoken'
      axios.defaults.xsrfHeaderName = 'X-CSRFToken'
      //axios.defaults.withCredentials = true; 
      axios.post('http://localhost:8080/onlineshopping/login', 
       JSON.stringify({
        email: username,
        password: password,
        //_csrf: csrf
     }), {
        headers: { 
         "Content-Type": "application/json",
         "Access-Control-Allow-Origin": "http://localhost:3000", 
        }, 
       }) 
      .then(function (response) {
        //console.log(response.data);
        localStorage.setItem("token", response.data);
        localStorage.setItem("Autherization", true);
        
        window.location.href = "http://localhost:3000/";  
      }) 
      .catch(function (error) {
        console.log(error);
      });
      };
 
      export const logout = (history) => async dispatch => {
        //alert("logout")
        //history.push("/login"); 
        console.log("logout...")
         let token = localStorage.getItem("token");
         axios.defaults.headers.common['Authorization'] = token;

         axios.post('http://localhost:8080/onlineshopping/logout') 
        .then(function (response) {
          localStorage.setItem("Autherization", false);
          //this.props.history.push("/login"); 
          window.location.href = "http://localhost:3000/login";
          // window.location.href("/login"); 
          //console.log(response);
        }) 
        .catch(function (error) {
          console.log(error);
        });
        };
 
  export const userinfo = () => async dispatch => {
 
          let token = localStorage.getItem("token");
          //
          axios.defaults.headers.common['Authorization'] = token;
         
          const res = await axios.get("http://localhost:8080/onlineshopping/userinfo");
          dispatch({
            type: GET_USERINFO,
            payload: res.data
          });
        };

export const Signup = ( UserDetails ) => async dispatch => {
          console.log(UserDetails)
          
          axios.post('http://localhost:8080/onlineshopping/membershipdetail', 
            UserDetails,{
            headers: { 
             "Content-Type": "application/json",
             "Access-Control-Allow-Origin": "http://localhost:3000", 
            }, 
           }) 
          .then(function (response) {
           // window.location.href = "http://localhost:3000/";  
          }) 
          .catch(function (error) {
            console.log(error);
          });
      };
       
export const getshowCart = (pt_id) => async dispatch => {
          //alert("hii")
         //console.log(response)
        const res = await axios.get(`http://localhost:8080/onlineshopping/cart/add/${pt_id}/product`)
        .then((response) => {
          window.location.href = "http://localhost:3000/cart/show?result=added";
          //alert("hii")
          //console.log(response)
          dispatch({
            type: GET_CART,
            payload: response.data 
          });
        }) 
         .catch(function (error) {
           console.log(error);
         });
    };

  export const getCart = (pt_id, history) => async dispatch => {
         //alert("hii")
         //console.log(response)
        const res = await axios.get(`http://localhost:8080/onlineshopping/cart/add/${pt_id}/product`);
        console.log(res.headers) 
        dispatch({
            type: GET_CART,
            payload: res.data 
          });
    };

  export const updateCart = (cartId, cartProductCount) => async dispatch => {
      //alert("hii")
      //console.log(response)
      let params = {
        count: cartProductCount, 
      }
    
      let myAxios = axios.create({
        paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'repeat'})
      })
  
     const res = await myAxios.get(`http://localhost:8080/onlineshopping/cart/${cartId}/update`, {params});
     console.log(res.headers) 
     dispatch({
         type: GET_CART,
         payload: res.data 
       });
 };
     
export const removeCart = (pt_id) => async dispatch => {
  //alert("hii")
  //console.log(response)
 const res = await axios.get(`http://localhost:8080/onlineshopping/cart/${pt_id}/remove`);
 console.log(res.headers) 
 dispatch({
     type: GET_CART,
     payload: res.data 
   });
};

  export const checkoutCart = () => async dispatch => {
    //alert("hii")
    //console.log(response)
   const res = await axios.get(`http://localhost:8080/onlineshopping/cart/validate`);
   console.log(res.headers) 
   dispatch({
       type: GET_CHECKOUT,
       payload: res.data 
     });
  };

  export const Addaddress = ( address ) => async dispatch => {
    console.log(address)
    
    axios.post('http://localhost:8080/onlineshopping/cart/addaddress', 
    address,{
      headers: { 
       "Content-Type": "application/json",
       "Access-Control-Allow-Origin": "http://localhost:3000", 
      }, 
     }) 
    .then((response) => {
      //window.location.href = "http://localhost:3000/cart/show?result=added";
      //alert("hii")
      //console.log(response)
      dispatch({
        type: GET_ORDERDETAIL,
        payload: response.data 
      });
    })

    .catch(function (error) {
      console.log(error);
    });
}; 

  export const saveAddress = (shippingId) => async dispatch => {
    //alert("hii")
    //console.log(response)
    let params = {
      shippingId: shippingId, 
    }

    let myAxios = axios.create({
      paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'repeat'})
    })

  const res = await myAxios.get(`http://localhost:8080/onlineshopping/cart/saveaddress`, {params});
  dispatch({
    type: GET_ORDERDETAIL,
    payload: res.data  
  });
  };

  export const productUpload = ( formData ) => async dispatch => {
  
      axios.post('http://localhost:8080/onlineshopping/manage/product', 
      formData, { 
      headers: { 
        //'content-type': 'multipart/form-data'  
        //'Content-Type': 'application/x-www-form-urlencoded'
        //"Content-Type": "application/json",
       }, 
     }) 
    .then(function (response) {
     // window.location.href = "http://localhost:3000/";  
    }) 
    .catch(function (error) {
      console.log(error);
    });
  };

  export const getcategories = () => async dispatch => {
    //alert("hii")
    //console.log(response)
   const res = await axios.get(`http://localhost:8080/onlineshopping/manage/categories`);
   console.log(res.headers) 
   dispatch({
       type: GET_CATEGORIES,
       payload: res.data 
     });
  };