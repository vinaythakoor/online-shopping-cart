package net.kzn.onlineshopping.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import net.kzn.onlineshopping.model.UserModel;
import net.kzn.shoppingbackend.dao.CartLineDAO;
import net.kzn.shoppingbackend.dao.ProductDAO;
import net.kzn.shoppingbackend.dao.UserDAO;
import net.kzn.shoppingbackend.dto.Cart;
import net.kzn.shoppingbackend.dto.CartLine;
import net.kzn.shoppingbackend.dto.Product;
import net.kzn.shoppingbackend.dto.User;

@Service("cartService")
public class CartService {

	@Autowired
	private CartLineDAO cartLineDAO;
	
	@Autowired
	private ProductDAO productDAO;
		
	@Autowired
	private HttpSession session;
	
	@Autowired
	private UserDAO userDAO;

	public List<CartLine> getCartLines() {
		//System.out.println("cartLineDAO "+cartLineDAO.list(getCart().getId()));
 		return cartLineDAO.list(getCart().getId());

	}
	
	/* to update the cart count */
	public String manageCartLine(int cartLineId, int count) {
		
		CartLine cartLine = cartLineDAO.get(cartLineId);		

		double oldTotal = cartLine.getTotal();

		
		Product product = cartLine.getProduct();
		
		// check if that much quantity is available or not
		if(product.getQuantity() < count) {
			return "unavailable";		
		}	
		
		// update the cart line
		cartLine.setProductCount(count);
		cartLine.setBuyingPrice(product.getUnitPrice());
		cartLine.setTotal(product.getUnitPrice() * count);
		cartLineDAO.update(cartLine);

	
		// update the cart
		Cart cart = this.getCart();
		cart.setGrandTotal(cart.getGrandTotal() - oldTotal + cartLine.getTotal());
		cartLineDAO.updateCart(cart);
		
		return "updated";
	}



	public String addCartLine(int productId) {		
		Cart cart = this.getCart();
		String response = null;
		CartLine cartLine = cartLineDAO.getByCartAndProduct(cart.getId(), productId);
		if(cartLine==null) {
			// add a new cartLine if a new product is getting added
			cartLine = new CartLine();
			Product product = productDAO.get(productId);
			// transfer the product details to cartLine
			cartLine.setCartId(cart.getId());
			cartLine.setProduct(product);
			cartLine.setProductCount(1);
			cartLine.setBuyingPrice(product.getUnitPrice());
			cartLine.setTotal(product.getUnitPrice());
			
			// insert a new cartLine
			cartLineDAO.add(cartLine);
			
			// update the cart
			cart.setGrandTotal(cart.getGrandTotal() + cartLine.getTotal());
			cart.setCartLines(cart.getCartLines() + 1);
			cartLineDAO.updateCart(cart);

			response = "added";						
		} 
		else {
			// check if the cartLine has been already reached to maximum count
			if(cartLine.getProductCount() < 3) {
				// call the manageCartLine method to increase the count
				response = this.manageCartLine(cartLine.getId(), cartLine.getProductCount() + 1);				
			}			
			else {				
				response = "maximum";				
			}						
		}		
		return response;
	}
	
	private Cart getCart() {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = userDAO.getByEmail(authentication.getName());		
		
		UserModel usermodel = new UserModel();
		usermodel.setId(user.getId());
		usermodel.setFullName(user.getFirstName() + " " + user.getLastName());
		usermodel.setRole(user.getRole());
		usermodel.setCart(user.getCart());
		
		//System.out.println(usermodel);
		return usermodel.getCart();
	}


	public String removeCartLine(int cartLineId) {
		
		CartLine cartLine = cartLineDAO.get(cartLineId);
		// deduct the cart
		// update the cart
		Cart cart = this.getCart();	
		cart.setGrandTotal(cart.getGrandTotal() - cartLine.getTotal());
		cart.setCartLines(cart.getCartLines() - 1);		
		cartLineDAO.updateCart(cart);
		
		// remove the cartLine
		cartLineDAO.remove(cartLine);
				
		return "deleted";
	}


	public String validateCartLine() {
		Cart cart = this.getCart();
		List<CartLine> cartLines = cartLineDAO.list(cart.getId());
		double grandTotal = 0.0;
		int lineCount = 0;
		String response = "success";
		boolean changed = false;
		Product product = null;
		for(CartLine cartLine : cartLines) {					
			product = cartLine.getProduct();
			changed = false;
			// check if the product is active or not
			// if it is not active make the availability of cartLine as false
			if((!product.isActive() && product.getQuantity() == 0) && cartLine.isAvailable()) {
				cartLine.setAvailable(false);
				changed = true;
			}			
			// check if the cartLine is not available
			// check whether the product is active and has at least one quantity available
			if((product.isActive() && product.getQuantity() > 0) && !(cartLine.isAvailable())) {
					cartLine.setAvailable(true);
					changed = true;
			}
			
			// check if the buying price of product has been changed
			if(cartLine.getBuyingPrice() != product.getUnitPrice()) {
				// set the buying price to the new price
				cartLine.setBuyingPrice(product.getUnitPrice());
				// calculate and set the new total
				cartLine.setTotal(cartLine.getProductCount() * product.getUnitPrice());
				changed = true;				
			}
			
			// check if that much quantity of product is available or not
			if(cartLine.getProductCount() > product.getQuantity()) {
				cartLine.setProductCount(product.getQuantity());										
				cartLine.setTotal(cartLine.getProductCount() * product.getUnitPrice());
				changed = true;
				
			}
			
			// changes has happened
			if(changed) {				
				//update the cartLine
				cartLineDAO.update(cartLine);
				// set the result as modified
				response = "modified";
			}
			
			grandTotal += cartLine.getTotal();
			lineCount++;
		}
		
		cart.setCartLines(lineCount++);
		cart.setGrandTotal(grandTotal);
		cartLineDAO.updateCart(cart);

		return response;
	}
	
	public Map<String, Object> showCart( String result ) {
		
		Map<String, Object> cartMap = new HashMap<String, Object>();
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		cartMap.put("title", "Shopping Cart");
		 
		if(result!=null) {
			switch(result) {
				case "added":
					System.out.println("re = "+result);
 					cartMap.put("message", "Product has been successfully added inside cart!");
					validateCartLine();
					break;
				case "unavailable":
					System.out.println("re = "+result);
 					cartMap.put("message", "Product quantity is not available!");
					break;
				case "updated":
					System.out.println("res = "+result);
				 	cartMap.put("message", "Cart has been updated successfully!");
					validateCartLine();
					break;
				case "modified":
					System.out.println("re = "+result);
				 	cartMap.put("message", "One or more items inside cart has been modified!");
					break;
				case "maximum":
					System.out.println("re = "+result);
					cartMap.put("message", "You have reached maximum number of product limit to Add!");
					break;
				case "deleted":
					System.out.println("re = "+result);
				 	cartMap.put("message", "CartLine has been successfully removed!");
					break;
 			}
		}
		else {
			String response = validateCartLine();
			if(response.equals("modified")) {
				 cartMap.put("message", "One or more items inside cart has been modified!");
			}
		}
		
 		 cartMap.put("cartLines", getCartLines());
 		 cartMap.put("cart", getCart());
 		 User user = userDAO.getByEmail(authentication.getName());
 		 //System.out.println("user address =="+ userDAO.getBillingAddress(user.getId()));
 		 cartMap.put("Address", userDAO.getBillingAddress(user.getId()));
		 return cartMap;
		
	}

}
