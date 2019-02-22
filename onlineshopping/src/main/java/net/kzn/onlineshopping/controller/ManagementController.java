package net.kzn.onlineshopping.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import net.kzn.onlineshopping.validator.Addproductdetails;
import net.kzn.shoppingbackend.dao.CategoryDAO;
import net.kzn.shoppingbackend.dao.ProductDAO;
import net.kzn.shoppingbackend.dto.Category;
import net.kzn.shoppingbackend.dto.Product;

@RestController
@RequestMapping("/manage")
public class ManagementController {

	private static final Logger logger = LoggerFactory.getLogger(ManagementController.class);

	@Autowired
	private ProductDAO productDAO;
	
	@Autowired
	private CategoryDAO categoryDAO;		

	@RequestMapping("/product")
	public ModelAndView manageProduct(@RequestParam(name="success",required=false)String success) {		

		ModelAndView mv = new ModelAndView("page");	
		mv.addObject("title","Product Management");		
		mv.addObject("userClickManageProduct",true);
		
		Product nProduct = new Product();
		
		// assuming that the user is ADMIN
		// later we will fixed it based on user is SUPPLIER or ADMIN
		nProduct.setSupplierId(1);
		nProduct.setActive(true);

		mv.addObject("product", nProduct);

		
		if(success != null) {
			if(success.equals("product")){
				mv.addObject("message", "Product submitted successfully!");
			}	
			else if (success.equals("category")) {
				mv.addObject("message", "Category submitted successfully!");
			}
		}
			
		return mv;
		
	}

	
	@RequestMapping("/{id}/product")
	public ModelAndView manageProductEdit(@PathVariable int id) {		

		ModelAndView mv = new ModelAndView("page");	
		mv.addObject("title","Product Management");		
		mv.addObject("userClickManageProduct",true);
		
		// Product nProduct = new Product();		
		mv.addObject("product", productDAO.get(id));

			
		return mv;
		
	}
	
 	@RequestMapping(value = "/product", method=RequestMethod.POST)
	public String managePostProduct(
			@RequestParam(name = "data", required = false) String add,
			//@RequestBody AddProduct addProduct,
			@RequestParam(name = "file", required = false) MultipartFile file ,
		  HttpServletRequest request) {
 		
		Map<String, String> map = new HashMap<String, String>();
		Map<String, String> map1 = new HashMap<String, String>();
		//	addProduct.replaceAll("[{}\"]", "").split(",").forEach(string -> { String[] c = string.split(":"); map.put(c[0], c[1]); });
 		 
		String theString = "{\"name\":\"m\",\"brand\":\"m\",\"description\":\"m\"}";
		List<String> addProduct = Arrays.asList(theString.split("\\s*,\\s*"));
		Map<String, String> finishedMap = new HashMap<>();
 
		for (String str : addProduct) {
			String st = str.replaceAll("[{}\"]", "");
			String[] c = st.split(":");
			System.out.println(Arrays.toString(c));
			finishedMap.put(c[0], c[1]);
		}
 
		System.out.println("finishedMap "+ finishedMap);
		
/*		map1.put("vinay", "1");
 		map1.put("v", "2");
		for(String str: addProduct){ 
			System.out.println(str); // {"name":"m"
			String st = str.replaceAll("[{}]", "");
	 		String[] c = st.split(":"); 
			map.put(c[0], c[1]);	 
		 }
*/		
		// {"name":"m", "brand":"m", "description":"m"}
		// {"name" = "m", "brand" = "m", "description" = "m"}
			
		System.out.println("addProduct "+ add); 
 		System.out.println("addProduct "+ addProduct);
		System.out.println("addProduct "+ file.getOriginalFilename());
		//System.out.println("map "+ theOtherString);
		System.out.println("map "+ finishedMap.get("name"));
  
		Addproductdetails detail = new Addproductdetails();
		/*Product mProduct = detail.addproduct(map, file);
		   
		System.out.println(mProduct);
		// mandatory file upload check
		if(mProduct.getId() == 0) {
			new ProductValidator().validate(mProduct);
		}
		else {
			// edit check only when the file has been selected
			if(!mProduct.getFile().getOriginalFilename().equals("")) {
				new ProductValidator().validate(mProduct);
			}			
		}
		  
		
		if(mProduct.getId() == 0 ) {
			productDAO.add(mProduct);
		}
		else {
	productDAO.update(mProduct);
		}
	
		 //upload the file
		 if(!mProduct.getFile().getOriginalFilename().equals("") ){
			FileUploadUtility.uploadFile(request, mProduct.getFile(), mProduct.getCode()); 
		 }
*/		 
		return "redirect:/manage/product?success=product";
	}

	
	@RequestMapping(value = "/product/{id}/activation", method=RequestMethod.POST)
	@ResponseBody
	public String managePostProductActivation(@PathVariable int id) {		
		Product product = productDAO.get(id);
		boolean isActive = product.isActive();
		product.setActive(!isActive);
		productDAO.update(product);		
		return (isActive)? "Product Dectivated Successfully!": "Product Activated Successfully";
	}
			

	@RequestMapping(value = "/category", method=RequestMethod.POST)
	public String managePostCategory(@ModelAttribute("category") Category mCategory, HttpServletRequest request) {					
		categoryDAO.add(mCategory);		
		return "redirect:" + request.getHeader("Referer") + "?success=category";
	}
			
	
	
	 
 	@RequestMapping(value = "/categories")
	public Map<String, Object>  modelCategories() {
		Map<String, Object> categories = new HashMap<>();
		categories.put("categories", categoryDAO.list());
		System.out.println("cat "+ categories);
		return categories;
	}
	
	@ModelAttribute("category")
	public Category modelCategory() {
		return new Category();
	}
	
}
 

	
