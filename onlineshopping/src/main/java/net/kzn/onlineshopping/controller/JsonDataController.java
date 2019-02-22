package net.kzn.onlineshopping.controller;

import java.util.List;

import net.kzn.shoppingbackend.builder.SearchBuilder;
import net.kzn.shoppingbackend.dao.ProductDAO;
import net.kzn.shoppingbackend.dto.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/json/data")
public class JsonDataController {

	@Autowired
	private ProductDAO productDAO;
	 
	private SearchBuilder SearchBuilder;
	
	@RequestMapping("/admin/all/products")
	@ResponseBody
	public List<Product> getAllProductsList() {		
		return productDAO.list();
				
	}	
	
	
	@RequestMapping("/all/products")
	@ResponseBody
	public List<Product> getAllProducts() {
		
		return productDAO.listActiveProducts();
				
	}
	
	@RequestMapping("/category/{id}/products")
	@ResponseBody
	public List<Product> getProductsByCategory(@PathVariable int id) {
		
		return productDAO.listActiveProductsByCategory(id);
				
	}
	
	
	@RequestMapping("/mv/products")
	@ResponseBody
	public List<Product> getMostViewedProducts() {		
		return productDAO.getProductsByParam("views", 5);				
	}
		
	@RequestMapping("/mp/products")
	@ResponseBody
	public List<Product> getMostPurchasedProducts() {		
		return productDAO.getProductsByParam("purchases", 5);				
	}
	
/* 	@RequestMapping("/search")
 	@ResponseBody
 	public List<Map<String, Object>> Search(@RequestParam(value = "searchTerm", required = false) String pSearchTerm,
			HttpServletRequest request, HttpServletResponse response) {
 			System.out.println("pSearchTerm="+ pSearchTerm);
 			List<Map<String, Object>> list =  SearchBuilder.view(pSearchTerm);
			System.out.println("result="+ list);
			return list;
	}*/
 }
