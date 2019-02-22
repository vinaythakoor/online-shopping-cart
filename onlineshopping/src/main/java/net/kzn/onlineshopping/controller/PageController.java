package net.kzn.onlineshopping.controller;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.transport.client.PreBuiltTransportClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import net.kzn.onlineshopping.exception.ProductNotFoundException;
import net.kzn.onlineshopping.handler.RegisterHandler;
import net.kzn.onlineshopping.model.RegisterModel;
import net.kzn.onlineshopping.pagin.Pagination;
import net.kzn.onlineshopping.userinfo.Userinfosplit;
import net.kzn.shoppingbackend.builder.SearchBuilder;
import net.kzn.shoppingbackend.dao.CategoryDAO;
import net.kzn.shoppingbackend.dao.ProductDAO;
import net.kzn.shoppingbackend.dao.UserDAO;
import net.kzn.shoppingbackend.dto.Address;
import net.kzn.shoppingbackend.dto.Category;
import net.kzn.shoppingbackend.dto.Pagin;
import net.kzn.shoppingbackend.dto.Product;
import net.kzn.shoppingbackend.dto.User;
import net.kzn.shoppingbackend.dto.Userinfo;
import net.kzn.shoppingbackend.repository.JwtTokenRepository;

@RestController
public class PageController {

	private static final Logger logger = LoggerFactory
			.getLogger(PageController.class);

	@Autowired
	private CategoryDAO categoryDAO;

	@Autowired
	private ProductDAO productDAO;

	@Autowired
	private UserDAO userDAO;

	@Autowired
	private Pagination pagination;

	private Pagin pagin;

	private SearchBuilder SearchBuilder;

	@Autowired
	private Userinfosplit split;
	
	@Autowired
	private JwtTokenRepository jwtTokenRepository;
  	
	TransportClient client;

    public PageController(JwtTokenRepository jwtTokenRepository) {
        this.jwtTokenRepository = jwtTokenRepository;
    }
 	
	@SuppressWarnings("resource")
	public PageController() throws UnknownHostException {
		client = new PreBuiltTransportClient(Settings.EMPTY)
				.addTransportAddress(new InetSocketTransportAddress(InetAddress
						.getByName("localhost"), 9300));
	} 

	@RequestMapping(value = "/")
	public Map<String, Object> index(
			@RequestParam(name = "logout", required = false) String logout,
			HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mv = new ModelAndView("page");
		  
		Map<String, Object> map = new HashMap<String, Object>();
	 	
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		System.out.println("authentication ===" + authentication);
		 
		System.out.println("request ===" + request.getHeader("Authorization"));
		String blackListToken = request.getHeader("Authorization");
 		System.out.println("exist ===" + jwtTokenRepository.exist(blackListToken)); 
		
 		Boolean keyBlacklist = jwtTokenRepository.exist(blackListToken);
 	  	
 		if(keyBlacklist) {
 			System.out.println("true");
 			map.put("Unautherize", "You dont have autharization to view this page..");
 			return map;
 		}else{
 			mv.addObject("title", "Home");
 	 		
 			logger.info("Inside PageController index method - INFO");
 			logger.debug("Inside PageController index method - DEBUG");

 			// passing the products of category one
 			Category category1 = null;
 			category1 = categoryDAO.get(4);
 			mv.addObject("title", category1.getName());
 			mv.addObject("viewproducts1",
 					productDAO.listActiveProductsByCategory(4));
 			
 			map.put("title", category1.getName());
 			map.put("viewproducts1",
 					productDAO.listActiveProductsByCategory(4));
 			 
 			// passing the products of category two
 			Category category2 = null;
 			category2 = categoryDAO.get(2);
 			mv.addObject("title", category2.getName());
 			mv.addObject("viewproducts2",
 					productDAO.listActiveProductsByCategory(2));

 			map.put("title", category2.getName());
 			map.put("viewproducts2",
 					productDAO.listActiveProductsByCategory(2));
 			
 			// passing the products of category three
 			Category category3 = null;
 			category3 = categoryDAO.get(3);
 			mv.addObject("title", category3.getName()); 
 			mv.addObject("viewproducts3",
 					productDAO.listActiveProductsByCategory(3));

 			map.put("title", category2.getName());
 			map.put("viewproducts3",
 					productDAO.listActiveProductsByCategory(3));
 			
 			
 			// passing the list of categories
 			mv.addObject("categories", categoryDAO.list());
 			map.put("categories", categoryDAO.list());
 			
 			if (logout != null) {
 				mv.addObject("message", "You have successfully logged out!");
 				map.put("message", "You have successfully logged out!");
 			}

 			//CsrfToken token = (CsrfToken)request.getAttribute(CsrfToken.class.getName());
 		    //System.out.println(token.getToken());
 		    //map.put("csrf", token.getToken());
 		    
 			mv.addObject("userClickHome", true);
 			return map;
  		}
	}

	@RequestMapping(value = "/userinfo")
	public Map<String, Object> userinfo(HttpServletRequest request,
			HttpServletResponse response) {
  
 		Map<String, Object> userdetailMap = new HashMap<String, Object>();
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		System.out.println("authentication ===" + authentication);
		 
		System.out.println("request ===" + request.getHeader("Authorization"));
		String blackListToken = request.getHeader("Authorization");
 		System.out.println("exist ===" + jwtTokenRepository.exist(blackListToken)); 
		
 		Boolean keyBlacklist = jwtTokenRepository.exist(blackListToken);
 		
 		if(request.getHeader("Authorization") != null && !keyBlacklist) {
 			System.out.println(authentication.getName());
 			User user = userDAO.getByEmail(authentication.getName());
 			userdetailMap.put("id", user.getId());
 			userdetailMap.put("fullname", user.getFirstName() + " " + user.getLastName());
 			userdetailMap.put("role", user.getRole());
 			 
 			if(user.getRole().equals("USER")) {
 				userdetailMap.put("cart", user.getCart());					
 				System.out.println("cart ===" + user.getCart());
			}
 			
 		 }
        System.out.println("userinfo....");
 		return userdetailMap;
	}

	@RequestMapping(value = "/about")
	public ModelAndView about(HttpServletRequest request,
			HttpServletResponse response) {
		ModelAndView mv = new ModelAndView("page");
		
        System.out.println("logout....");
		
		mv.addObject("title", "About Us");
		mv.addObject("userClickAbout", true);
		return mv;
	}

	@RequestMapping(value = "/contact")
	public ModelAndView contact() {
		ModelAndView mv = new ModelAndView("page");
		mv.addObject("title", "Contact Us");
		mv.addObject("userClickContact", true);
		return mv;
	}

	/*
	 * Methods to load all the products and based on category
	 */

	@RequestMapping(value = "/show/all/products")
	public List<Product> showAllProducts() {

		//ModelAndView mv = new ModelAndView("page");
		List<Product> list = productDAO.list();
		for(Product s:list) {
			System.out.println("list = "+ s);
		}		
		/*mv.addObject("title", "All Products");

		// passing the list of categories
		mv.addObject("categories", categoryDAO.list());
		mv.addObject("productlist", productDAO.list());
		mv.addObject("userClickAllProducts", true);
*/		return list;
	}

	@RequestMapping(value = "/show/category/{id}/products")
	public Map<String, Object> showCategoryProducts(@PathVariable("id") int id) {
		ModelAndView mv = new ModelAndView("page");
		Map<String, Object> map = new HashMap<String, Object>();
 		// categoryDAO to fetch a single category
		Category category = null;

		category = categoryDAO.get(id);
		map.put("title", category.getName());

		mv.addObject("title", category.getName());

		// passing the list of categories
		mv.addObject("categories", categoryDAO.list());
		map.put("categories", categoryDAO.list());
		
		// passing the single category object
		mv.addObject("category", category);
		map.put("category", category);
		
		mv.addObject("userClickCategoryProducts", true);
		return map;
	}

	/*
	 * Viewing a single product
	 */

	@RequestMapping(value = "/show/{id}/product")
	public Map<String, Object> showSingleProduct(@PathVariable int id)
			throws ProductNotFoundException {

		ModelAndView mv = new ModelAndView("page");
		Map<String, Object> productmap = new HashMap<String, Object>();
		
		Product product = productDAO.get(id);

		if (product == null)
			throw new ProductNotFoundException();

		// update the view count
		product.setViews(product.getViews() + 1);
		productDAO.update(product);
		// ---------------------------

		mv.addObject("title", product.getName());
		productmap.put("title", product.getName());
		
		mv.addObject("product", product);
		productmap.put("product", product);
		
		mv.addObject("userClickShowProduct", true);
		System.out.println("show/id product---");	
		return productmap;

	}

	@PostMapping(value = "/membershipdetail")
	public String register( @RequestBody Userinfo userinfo) {
			
		System.out.println("userdetail " + userinfo.getAddressLineOne());
		  
		User user = split.userdetails(userinfo);
		Address address = split.addressdetails(userinfo);
		split.saveuserAll(user, address);
		/*RegisterHandler handler = new RegisterHandler();
		handler.addUser(user);
		handler.addBilling(address);
		handler.saveAll();*/
		System.out.println("userdetail " + user);
		
		logger.info("Page Controller membership called!");
 		return "";
	}
	
/*	@RequestMapping(value = "/membership")
	public ModelAndView register() {
		ModelAndView mv = new ModelAndView("page");

		logger.info("Page Controller membership called!");

		return mv;
	}
*/

	@RequestMapping(value = "/login")
	public ModelAndView login(
			@RequestParam(name = "error", required = false) String error,
			@RequestParam(name = "logout", required = false) String logout,
			HttpServletRequest request,
			HttpServletResponse response) {
		ModelAndView mv = new ModelAndView("login");
		HttpSession session= request.getSession(false);
		Authentication auth = SecurityContextHolder.getContext()
				.getAuthentication();
		  
		SecurityContextHolder.clearContext();
         session= request.getSession(false);
        if(session != null) {
            session.invalidate();
        }
         
		System.out.println("auth ===" + auth);
		System.out.println("logout ===" + logout);

		Map<String, Object> mapproducts = new HashMap<String, Object>();
		System.out.println("Login");
		mv.addObject("title", "Login");
		mapproducts.put("title", "Login");
		if (error != null) { 
			mv.addObject("message", "Username and Password is invalid!");
			mapproducts.put("message", "Username and Password is invalid!");
		}
		if (logout != null) {
			mv.addObject("logout", "You have logged out successfully!");
			mapproducts.put("logout", "You have logged out successfully!");
		}
		if(request.getHeader("Authorization")!= null){
			System.out.println("request ===" + request.getHeader("Authorization"));
			String blackListToken = request.getHeader("Authorization");
			jwtTokenRepository.save(blackListToken);
			System.out.println("exist ===" + jwtTokenRepository.exist(blackListToken));
		}
		return mv; 
	}

/*	 @RequestMapping(value = "login", method = RequestMethod.POST)
	    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest) throws AuthenticationException {

	        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

	        // Reload password post-security so we can generate the token
	        final UserDetails userDetails = CustomUserDetailService.loadUserByUsername(authenticationRequest.getUsername());
	        final String token = jwtTokenUtil.generateToken(userDetails);

	        // Return the token
	        return ResponseEntity.ok(new JwtAuthenticationResponse(token));
	    }*/

	 
	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public String logout(HttpServletRequest request,
			HttpServletResponse response) {
		// Invalidates HTTP Session, then unbinds any objects bound to it.
		// Removes the authentication from securitycontext
		HttpSession session= request.getSession(false);
		SecurityContextHolder.clearContext();
         session= request.getSession(false);
        if(session != null) {
            session.invalidate();
        }
        for(Cookie cookie : request.getCookies()) {
            cookie.setMaxAge(0);
        }
        System.out.println("logout....");
    return "logout";
	}


	@RequestMapping(value = "/access-denied")
	public ModelAndView accessDenied() {
		ModelAndView mv = new ModelAndView("error");
		mv.addObject("errorTitle", "Aha! Caught You.");
		mv.addObject("errorDescription",
				"You are not authorized to view this page!");
		mv.addObject("title", "403 Access Denied");
		return mv;
	}
 
	@RequestMapping(value = "/view/category/{id}/products")
	
	public Map<String, Object> viewProducts(
			@PathVariable("id") int id, 
 			//@RequestParam(value = "project_task[]", required = false) List<String> project_task,
			@RequestParam(value = "SlideMin", required = false) String minimum,
			@RequestParam(value = "SlideMax", required = false) String maximum,
			@RequestParam(value = "brand", required = false) String brandss,
			HttpServletRequest request, HttpServletResponse response) {

		ModelAndView mv = new ModelAndView("page");
		Map<String, Object> mapproducts = new HashMap<String, Object>();
		// categoryDAO to fetch a single category
		String queryString = request.getQueryString();
		System.out.println("queryString " + queryString);
		System.out.println("queryString " + brandss);		
		List<String> brands = Arrays.asList(brandss.split("\\s*,\\s*"));
		
		int min, max;
		 
		if (minimum == null && maximum == null) {
			min = 200; 
			max = 10000000;
		} else {
			min = Integer.parseInt(minimum);
			max = Integer.parseInt(maximum);
		}

		System.out.println("id" + id);
		Category category = null;
		/*
		 * System.out.println("id" + id); System.out.println("min" + min +
		 * "minimum" + minimum); System.out.println("max" + max + "maximum" +
		 * maximum); for(String str: brands){ System.out.println("str" + str); }
		 */
		category = categoryDAO.get(id);
		List<Product> list = productDAO.getAllBrandsbycategory(id);
		Set<String> set = new HashSet<String>();
		List<String> brandlist = new ArrayList<String>();

		for (Product brand : list) {
			set.add(brand.getBrand());
		}

		for (String str : set) {
			brandlist.add(str);
		}

		if (brands == null) {
			System.out.println("null brands");
			TimeValue timeout = TimeValue.timeValueMillis(3);
			SearchResponse searchresponse = client
					.prepareSearch("product")
					.setTypes("product")
					.setQuery(QueryBuilders.termQuery("category_id", id))
					// .setQuery(QueryBuilders.termQuery("is_active", 1))
					.setPostFilter(
							QueryBuilders.rangeQuery("unit_price").from(min)
									.to(max)).setSize(100).setExplain(true).setTimeout(timeout)
					.execute().actionGet();

			SearchHit[] results = searchresponse.getHits().getHits();
			List<Map<String, Object>> listproduct = new ArrayList<Map<String, Object>>();
			Map<String, Object> map = new HashMap<String, Object>();

			System.out.println("Current results: " + results.length);
			for (SearchHit hit : results) {
				System.out.println("------------------------------");

				map = hit.getSource();
				/*
				 * String value = (String) map.get("brand"); set.add(value);
				 */
				//System.out.println("result=" + map);
				listproduct.add(map);
				// return list;
			}
			mv.addObject("viewproducts", listproduct);
			mapproducts.put("viewproducts", listproduct);
		} else {
			System.out.println("brands");
			BoolQueryBuilder query = QueryBuilders.boolQuery();
			for (String key : brands) {
				query.should(QueryBuilders.matchQuery("brand", key));
			}

			SearchResponse searchresponse = client
					.prepareSearch("product")
					.setTypes("product")
					.setQuery(QueryBuilders.termQuery("category_id", id))
					// .setQuery(QueryBuilders.termQuery("is_active", 1))
					.setPostFilter(
							QueryBuilders.rangeQuery("unit_price").from(min)
									.to(max)).setQuery(query).setSize(100)
					.setExplain(true).execute().actionGet();

			SearchHit[] results = searchresponse.getHits().getHits();
			List<Map<String, Object>> listproduct = new ArrayList<Map<String, Object>>();
			Map<String, Object> map = new HashMap<String, Object>();

			System.out.println("Current results: " + results.length);
			for (SearchHit hit : results) {
				System.out.println("------------------------------");

				map = hit.getSource();
				/*
				 * String value = (String) map.get("brand"); set.add(value);
				 */
				System.out.println("result=" + map); 
				listproduct.add(map);
				// return list;
			} 
			mv.addObject("viewproducts", listproduct);
			mapproducts.put("viewproducts", listproduct);
		}

		mv.addObject("title", category.getName());
		mapproducts.put("title", category.getName());
		
		mv.addObject("brandlist", brandlist);
		mapproducts.put("brandlist", brandlist);
		
		mv.addObject("userClickViewProducts", true);
 		
		return mapproducts;
	}

	@RequestMapping("/search")
	@ResponseBody
	public Map<String, Object> Search(
			@RequestParam(value = "searchTerm", required = false) String pSearchTerm,
			@RequestParam(value = "txtMinAge", required = false) String txtMinAge,
			@RequestParam(value = "txtMaxAge", required = false) String txtMaxAge,
			@RequestParam(value = "brand", required = false) String brandss, 
			@RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
			HttpServletRequest request, HttpServletResponse response) {

		ModelAndView mv = new ModelAndView("page");
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		Map<String, Object> mapproducts = new HashMap<String, Object>();
		long total;

		System.out.println("page = " + page);
		System.out.println("brandss = " + brandss); 
		
		List<String> brands = Arrays.asList(brandss.split("\\s*,\\s*"));
		
		// StringBuilder requestURL = new
		// StringBuilder(request.getRequestURL().toString());
		StringBuilder requestURL = new StringBuilder("search");
		String queryString = request.getQueryString();

		String url = requestURL.append('?').append(request.getQueryString())
				.toString();

		String m1 = url.replaceAll("[&?]page.*?(?=&|\\?|$)", "");

		System.out.println("requestURL m1 = " + m1);
		// System.out.println("queryString = " + queryString);

		// System.out.println("url = " + url);
		// System.out.println("new url = " + requestURL.append('?').append(m1));

		int from = 2 * (page - 1);

		Map<String, Object> map = new HashMap<String, Object>();

		if (txtMinAge == null && txtMaxAge == null) {
			SearchResponse searchresponse = client
					.prepareSearch("product")
					.setTypes("product")
					.setQuery(
							QueryBuilders.queryStringQuery(pSearchTerm + "*")
									.lenient(true).field("name"))
					.setExplain(true).setFrom(from).setSize(2).execute()
					.actionGet();

			SearchHit[] results = searchresponse.getHits().getHits();

			total = searchresponse.getHits().getTotalHits();

			List<String> brandlist = new ArrayList<String>();
			Set<String> set = new HashSet<String>();

			System.out.println("Current results: " + results.length);
			for (SearchHit hit : results) {
				System.out.println("------------------------------");
				// Map<String, Object> map = new HashMap<String, Object>();
				map = hit.getSource();
				String value = (String) map.get("brand");
				set.add(value);
				System.out.println("result=" + map);
				list.add(map);
				// return list;
			}

			for (String str : set) {
				brandlist.add(str);
			}

			System.out.println("pSearchTerm=" + pSearchTerm);
			System.out.println(txtMinAge);
			System.out.println(txtMaxAge);

			mv.addObject("searchTerm", pSearchTerm);
			mapproducts.put("searchTerm",pSearchTerm); 
			
			mv.addObject("title", "Search");
			mapproducts.put("title","Search");
			
			mv.addObject("searchResult", list);
			mapproducts.put("searchResult",list);	
			
			mv.addObject("brandlist", brandlist);
			mapproducts.put("brandlist",brandlist);
			
		 	// return mv;
		} else if (brands == null) {
			int min = Integer.parseInt(txtMinAge);
			int max = Integer.parseInt(txtMaxAge);

			SearchResponse searchresponse = client
					.prepareSearch("product")
					.setTypes("product")
					.setQuery(
							QueryBuilders.queryStringQuery(pSearchTerm + "*")
									.lenient(true).field("name"))
					.setPostFilter(
							QueryBuilders.rangeQuery("unit_price").from(min)
									.to(max)).setFrom(from).setSize(2)
					.setExplain(true).execute().actionGet();

			SearchHit[] results = searchresponse.getHits().getHits();
			total = searchresponse.getHits().getTotalHits();

			List<String> brandlist = new ArrayList<String>();
			Set<String> set = new HashSet<String>();

			System.out.println("Current results: " + results.length);
			for (SearchHit hit : results) {
				System.out.println("------------------------------");
				// Map<String, Object> map = new HashMap<String, Object>();
				map = hit.getSource();
				String value = (String) map.get("brand");
				set.add(value);
				System.out.println("result=" + map);
				list.add(map);
				// return list;
			}

			for (String str : set) {
				brandlist.add(str);
			}

			System.out.println("pSearchTerm=" + pSearchTerm);
			System.out.println(min);
			System.out.println(max);

			mv.addObject("searchTerm", pSearchTerm);
			mapproducts.put("searchTerm",pSearchTerm);
			
			mv.addObject("title", "Search");
			mapproducts.put("title", "Search");
			
			mv.addObject("searchResult", list);
			mapproducts.put("searchResult",list);
			
			mv.addObject("brandlist", brandlist);
			mapproducts.put("brandlist",brandlist);
			
			mv.addObject("userClickSearch", true);
			  
			// return mv;
		} else {

			int min = Integer.parseInt(txtMinAge);
			int max = Integer.parseInt(txtMaxAge);

			BoolQueryBuilder query = QueryBuilders.boolQuery();
			for (String key : brands) {
				query.must(QueryBuilders.matchQuery("brand", key));
			}

			// search term
			query.must(QueryBuilders.queryStringQuery(pSearchTerm + "*")
					.lenient(true).field("name"));

			// price range
			query.filter(QueryBuilders.rangeQuery("unit_price").from(min)
					.to(max));

			SearchResponse searchresponse = client.prepareSearch("product")
					.setTypes("product").setQuery(query).setFrom(from)
					.setSize(2).setExplain(true).execute().actionGet();

			/*
			 * SearchResponse searchresponse = client .prepareSearch("product")
			 * .setTypes("product") .setQuery(
			 * QueryBuilders.queryStringQuery(pSearchTerm + "*")
			 * .lenient(true).field("name")) .setPostFilter(
			 * QueryBuilders.rangeQuery("unit_price").from(min)
			 * .to(max)).setQuery(query).setExplain(true)
			 * .execute().actionGet();
			 */
			SearchHit[] results = searchresponse.getHits().getHits();
			total = searchresponse.getHits().getTotalHits();

			List<String> brandlist = new ArrayList<String>();
			Set<String> set = new HashSet<String>();

			System.out.println("Current results: " + results.length);
			for (SearchHit hit : results) {
				System.out.println("------------------------------");

				map = hit.getSource();
				String value = (String) map.get("brand");
				set.add(value);
				System.out.println("result=" + map);
				list.add(map);
				// return list;
			}

			for (String str : set) {
				brandlist.add(str);
			}

			System.out.println("pSearchTerm=" + pSearchTerm);
			System.out.println(min);
			System.out.println(max);

			mv.addObject("searchTerm", pSearchTerm);
			mapproducts.put("searchTerm",pSearchTerm);
			
			mv.addObject("title", "Search");
			mapproducts.put("title","Search");
			
			mv.addObject("searchResult", list);
			mapproducts.put("searchResult",list);
			
			mv.addObject("brandlist", brandlist);
			mapproducts.put("brandlist",brandlist);
			
			mv.addObject("userClickSearch", true);
		}

		List<Product> users = productDAO.getAllBrands();
		PagedListHolder<Product> pagedListHolder = new PagedListHolder<>(users);
		pagedListHolder.setPageSize(2);

		System.out.println("total results = " + total);
		// ///////

		long showpage = 5;
		long maxpages = total;
		long pages;

		if (total % 2 == 0) {
			pages = total / 2;
		} else {
			pages = (total / 2) + 1;
		}

		Long[] res = pagination.pagin(showpage, pages, page);

		System.out.println("begn ==" + res[0]);
		System.out.println("end ==" + res[1]);
		System.out.println("pages ==" + pages);
		// ////////////////

		mapproducts.put("total",total);
		
		mv.addObject("maxPages", pages);
		mapproducts.put("maxPages",pages);
		
		mv.addObject("page", page);
		mapproducts.put("page",page);
		
		System.out.println("urlvalue " + m1);
		mv.addObject("begin", res[0]);
		mapproducts.put("begin",res[0]);
		
		mv.addObject("end", res[1]);
		mapproducts.put("end",res[0]);
		
		mv.addObject("urlvalue", m1);
		mapproducts.put("urlvalue",m1);
		
		return mapproducts;
	}

	@RequestMapping(value = "/searchAutocomplete")
	@ResponseBody
	public List<String> plantNamesAutocomplete(
			@RequestParam(value = "term", required = false) String pSearchTerm) {
		// List<Product> suggestions = new ArrayList<Product>();

		System.out.println("search " + pSearchTerm);

		SearchResponse searchresponse = client
				.prepareSearch("product")
				.setTypes("product")
				.setQuery(
						QueryBuilders.queryStringQuery(pSearchTerm + "*")
								.lenient(true).field("name")).setExplain(true)
				.execute().actionGet();

		SearchHit[] results = searchresponse.getHits().getHits();
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		Map<String, Object> map = new HashMap<String, Object>();

		System.out.println("Current results: " + results.length);
		for (SearchHit hit : results) {
			System.out.println("------------------------------");

			map = hit.getSource();
			System.out.println("result=" + map.toString());
			list.add(map);
			list.toString();
			// return list;
		}

		List<String> listauto2 = new ArrayList<String>();

		for (Map<String, Object> hit : list) {
			String value = (String) hit.get("name");
			// listauto2.add(hit.values().toString());
			listauto2.add(value);
		}
		return listauto2;
	}

	// slider

	@RequestMapping("/search22")
	@ResponseBody
	public String Search22(
			@RequestParam(value = "searchTerm", required = false) String pSearchTerm,
			@RequestParam(value = "txtMinAge", required = false) String txtMinAge,
			@RequestParam(value = "txtMaxAge", required = false) String txtMaxAge,
			@RequestParam(value = "brand[]", required = false) List<String> brands,
			HttpServletRequest request, HttpServletResponse response) {

		System.out.println("min" + txtMinAge);
		System.out.println("max" + txtMaxAge);

		System.out.println("printing map----");
		// System.out.println(brands);
		/*
		 * for (Map.Entry<String, String> entry : brands.entrySet())
		 * System.out.println("Key = " + entry.getKey() + ", Value = " +
		 * entry.getValue());
		 */
		for (String element : brands) {
			System.out.println(element);
		}
		return "send data";
	}

	@RequestMapping(value = "/list")
	public ModelAndView listOfUsers(
			@RequestParam(required = false, defaultValue = "1") Integer page) {
		ModelAndView modelAndView = new ModelAndView("page");

		String url = "list";
		System.out.println("page = " + page);

		int from = 2 * (page - 1);

		// ////////////////

		BoolQueryBuilder query = QueryBuilders.boolQuery();

		// search term
		query.must(QueryBuilders.matchAllQuery());

		SearchResponse searchresponse = client.prepareSearch("product")
				.setTypes("product").setQuery(query).setFrom(from).setSize(2)
				.setExplain(true).execute().actionGet();

		SearchHit[] results = searchresponse.getHits().getHits();
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		List<String> brandlist = new ArrayList<String>();
		Set<String> set = new HashSet<String>();
		Map<String, Object> map = new HashMap<String, Object>();

		System.out.println("Current results: " + results.length);
		for (SearchHit hit : results) {
			System.out.println("------------------------------");

			map = hit.getSource();
			String value = (String) map.get("brand");
			set.add(value);
			System.out.println("result=" + map);
			list.add(map);
			// return list;
		}

		List<Product> users = productDAO.getAllBrands();
		PagedListHolder<Product> pagedListHolder = new PagedListHolder<>(users);
		pagedListHolder.setPageSize(2);

		// ///////

		int showpage = 5;
		int maxpages = pagedListHolder.getPageCount();

		Long[] res = pagination.pagin(showpage, maxpages, page);

		// ////////////////

		modelAndView.addObject("maxPages", pagedListHolder.getPageCount());

		if (page == null || page < 1 || page > pagedListHolder.getPageCount())
			page = 1;

		modelAndView.addObject("page", page);
		if (page == null || page < 1 || page > pagedListHolder.getPageCount()) {
			pagedListHolder.setPage(0);
			modelAndView.addObject("users", pagedListHolder.getPageList());
		} else if (page <= pagedListHolder.getPageCount()) {
			pagedListHolder.setPage(page - 1);
			modelAndView.addObject("users", pagedListHolder.getPageList());
		}

		modelAndView.addObject("begin", res[0]);
		modelAndView.addObject("end", res[1]);

		modelAndView.addObject("urlvalue", url);
		modelAndView.addObject("brandlist", list);
		modelAndView.addObject("userClickPagin", true);

		return modelAndView;
	}

}
