package net.kzn.onlineshopping.validator;

import java.util.HashMap;
import java.util.Map;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import net.kzn.shoppingbackend.dto.Product;

public class ProductValidator  {
  
	public Map<String, Object> validate(Object target) {
		
		Map<String, Object> errors = new HashMap<String, Object>();
		Product product = (Product) target;
		if(product.getFile() == null || product.getFile().getOriginalFilename().equals("")) {
			errors.put("file","Please select a file to upload!");
		}
		if(! (product.getFile().getContentType().equals("image/jpeg") || 
				product.getFile().getContentType().equals("image/png")) ||
				product.getFile().getContentType().equals("image/gif")
			 )
			{
				errors.put("file", "Please select an image file to upload!");
			}
		return errors;
	}

}
