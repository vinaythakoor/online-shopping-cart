package net.kzn.onlineshopping.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.kzn.onlineshopping.model.CheckoutModel;
import net.kzn.onlineshopping.service.CartService;
import net.kzn.onlineshopping.userinfo.CartHandler;
import net.kzn.onlineshopping.userinfo.Userinfosplit;
import net.kzn.shoppingbackend.dao.UserDAO;
import net.kzn.shoppingbackend.dto.Address;
import net.kzn.shoppingbackend.dto.User;
import net.kzn.shoppingbackend.dto.Userinfo;

@RestController
@RequestMapping("/cart")
public class CartController {

	private final static Logger logger = LoggerFactory.getLogger(CartController.class);
	
	@Autowired
	private CartService cartService;

	@Autowired
	private CartHandler cartHandler;

	@Autowired
	private UserDAO userDAO;

	@RequestMapping("/{cartLineId}/update")
	public Map<String, Object> udpateCartLine(@PathVariable int cartLineId, @RequestParam int count,
			HttpServletRequest req,
			HttpServletResponse resp) {
		String response = cartService.manageCartLine(cartLineId, count);		
		 
		Map<String, Object> showcart = cartService.showCart(response);
		showcart.put("result",response);
		//System.out.println(showcart);
		return showcart;
		 
	}
	
	@RequestMapping("/add/{productId}/product")
	public Map<String, Object> addCartLine(@PathVariable int productId,
			HttpServletRequest req,
			HttpServletResponse resp) {
		String response = cartService.addCartLine(productId);
  		
		Map<String, Object> showcart = cartService.showCart(response);
		showcart.put("result",response);
		//System.out.println(showcart);
		return showcart;
	}
	
	@RequestMapping("/{cartLineId}/remove")
	public Map<String, Object> removeCartLine(@PathVariable int cartLineId,
			HttpServletRequest req,
			HttpServletResponse resp) {
		String response = cartService.removeCartLine(cartLineId);
	 	
		Map<String, Object> showcart = cartService.showCart(response);
		showcart.put("result",response);
		
		//System.out.println(showcart);
		return showcart;
	}
	
	@PostMapping(value = "/addaddress")
	public Map<String, Object> Addaddress( @RequestBody Address address) throws Exception {
	 	
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
 
		Map<String, Object> orderdetails = new HashMap<String, Object>();
		System.out.println("user address " + address);

		CheckoutModel checkoutModel = cartHandler.init(username);
		cartHandler.saveAddress( checkoutModel , address );
		cartHandler.saveOrder( checkoutModel );
		orderdetails.put("order", cartHandler.getOrderDetail( checkoutModel ));
		return orderdetails;
	}
	
	@RequestMapping(value = "/saveaddress")
 	public Map<String, Object> saveshippingAddress(
		 	@RequestParam(value = "shippingId", required = false) String shippingId,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		
		Map<String, Object> orderdetails = new HashMap<String, Object>();
		
		System.out.println("user shippingId " + shippingId);	
	
		int shipId = Integer.parseInt(shippingId);
		 
		CheckoutModel checkoutModel = cartHandler.init(username);
		
		cartHandler.saveAddressSelection( checkoutModel, shipId ); 
		cartHandler.saveOrder( checkoutModel );
		orderdetails.put("order", cartHandler.getOrderDetail( checkoutModel ));
		return orderdetails;
	}
	
	/* after validating it redirect to checkout
	 * if result received is success proceed to checkout 
	 * else display the message to the user about the changes in cart page
	 * */	
	@RequestMapping("/validate")
	public Map<String, Object> validateCart(HttpServletRequest req, HttpServletResponse resp) {	
		String response = cartService.validateCartLine();
		
		resp.addHeader("result", response);
		
		if(!response.equals("result=success")) {
			Map<String, Object> showcart = cartService.showCart(response);
			showcart.put("result",response);
			//System.out.println(showcart);
			return showcart;
		}
		else {
			Map<String, Object> showcart = cartService.showCart(response);
			showcart.put("result",response);
			//System.out.println(showcart);
			return showcart;
		}
	}	
}


