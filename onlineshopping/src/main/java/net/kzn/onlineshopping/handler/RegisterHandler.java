package net.kzn.onlineshopping.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.binding.message.MessageBuilder;
import org.springframework.binding.message.MessageContext;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import net.kzn.onlineshopping.model.RegisterModel;
import net.kzn.shoppingbackend.dao.UserDAO;
import net.kzn.shoppingbackend.dto.Address;
import net.kzn.shoppingbackend.dto.Cart;
import net.kzn.shoppingbackend.dto.User;

@Component
public class RegisterHandler {
	
	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	 
	
	public RegisterModel init() {
		
		return new RegisterModel();
	}
	
	RegisterModel model = new RegisterModel();
	
	public void addUser( User user) {
		model.setUser(user);
	}
	
	public void addBilling( Address billing) {
		model.setBilling(billing);;
	}
	
	public String saveAll() {
		String transitionValue = "success";
		System.out.println("userdetail saved... " + model);
		System.out.println("userdetail saved... " + model.getUser());
		System.out.println("Address saved... " + model.getBilling());
		//fetch the user
		
		User user = model.getUser();
		
		if(user.getRole().equals("USER")) {
			Cart cart = new Cart();
			cart.setUser(user);
			user.setCart(cart);
			System.out.println("userdetail cart");
		}
		
		//encode the password
		System.out.println("before userdetail password" + user.getPassword());
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		System.out.println("after userdetail password");
		
		//save the user
		userDAO.add(user);
		
		//get the address
		
		Address billing = model.getBilling();
		billing.setUserId(user.getId());
		billing.setBilling(true);
		
		// save the address
		userDAO.addAddress(billing);
		 
		return transitionValue;
	}
	
/*	public String validateUser(User user, MessageContext error) {
		
		String transitionValue = "success";
		
		// checking if password matches confirm password
		
		if(!(user.getPassword().equals(user.getConfirmPassword()))) {
			
			error.addMessage(new MessageBuilder()
					.error()
					.source("confirmPassword")
					.defaultText("Password does not match the confirm password!")
					.build()
					);
			transitionValue = "failure";
		}
		
		// check the uniqueness of the email id
		
		if(userDAO.getByEmail(user.getEmail())!=null) {
			
			error.addMessage(new MessageBuilder()
					.error()
					.source("email")
					.defaultText("Email address is already used!")
					.build()
					);
			transitionValue = "failure";
		}
		
		if(user.getFirstName().isEmpty()) {
			
			error.addMessage(new MessageBuilder()
					.error()
					.source("firstName")
					.defaultText("Please Enter First Name!")
					.build()
					);
			transitionValue = "failure";
		}
		
		if(user.getLastName().isEmpty()) {
			
			error.addMessage(new MessageBuilder()
					.error()
					.source("lastName")
					.defaultText("Please Enter Last Name!")
					.build()
					);
			transitionValue = "failure";
		}
		

		if(user.getEmail().isEmpty()) {
			
			error.addMessage(new MessageBuilder()
					.error()
					.source("email")
					.defaultText("Please Enter Email!")
					.build()
					);
			transitionValue = "failure";
		}
		

		if(user.getContactNumber().isEmpty()) {
			
			error.addMessage(new MessageBuilder()
					.error()
					.source("contactNumber")
					.defaultText("Please Enter Contact Number!")
					.build()
					);
			transitionValue = "failure";
		}
		
		if(user.getPassword().isEmpty()) {
			
			error.addMessage(new MessageBuilder()
					.error()
					.source("password")
					.defaultText("Please Enter Password!")
					.build()
					);
			transitionValue = "failure";
		}
		

		if(user.getConfirmPassword().isEmpty()) {
			
			error.addMessage(new MessageBuilder()
					.error()
					.source("confirmPassword")
					.defaultText("Please Enter Confirm Password!")
					.build()
					);
			transitionValue = "failure";
		}

		return transitionValue;
	}
	
	
	//validate address fields
	public String validateAddress(Address Address, MessageContext error) {
		
		String transitionValue = "success";
		
		// checking if password matches confirm password
		
 		
		if(Address.getAddressLineOne().isEmpty()) {
			
			error.addMessage(new MessageBuilder()
					.error()
					.source("addressLineOne")
					.defaultText("Please Enter Address Line One!")
					.build()
					);
			transitionValue = "failure";
		}
 
		if(Address.getAddressLineTwo().isEmpty()) {
			
			error.addMessage(new MessageBuilder()
					.error()
					.source("addressLineTwo")
					.defaultText("Please Enter Address Line Two!")
					.build()
					);
			transitionValue = "failure";
		}
		
		if(Address.getCity().isEmpty()) {
			
			error.addMessage(new MessageBuilder()
					.error()
					.source("city")
					.defaultText("Please Enter city!")
					.build()
					);
			transitionValue = "failure";
		}
		
		if(Address.getPostalCode().isEmpty()) {
			
			error.addMessage(new MessageBuilder()
					.error()
					.source("postalCode")
					.defaultText("Please Enter PostalCode!")
					.build()
					);
			transitionValue = "failure";
		}
		
		if(Address.getState().isEmpty()) {
			
			error.addMessage(new MessageBuilder()
					.error()
					.source("state")
					.defaultText("Please Enter State!")
					.build()
					);
			transitionValue = "failure";
		}
		
		if(Address.getCountry().isEmpty()) {
			
			error.addMessage(new MessageBuilder()
					.error()
					.source("country")
					.defaultText("Please Enter Country!")
					.build()
					);
			transitionValue = "failure";
		}
 
		return transitionValue;
	}
*/	
}
 