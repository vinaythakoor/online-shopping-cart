package net.kzn.onlineshopping.controller;
  
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import net.kzn.shoppingbackend.builder.SearchBuilder;
import net.kzn.shoppingbackend.dto.Product;

import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController 
public class SearchController {

	private static final Logger logger = LoggerFactory.getLogger(PageController.class);

	//private SearchBuilder SearchBuilder;
 
	TransportClient client;

	// search

	/*	@RequestMapping(value="/searchAutocomplete")
	@ResponseBody
	public List<Map<String, Object>> plantNamesAutocomplete(@RequestParam(value="searchTerm", required = false, defaultValue="") String pSearchTerm)  {
		//List<Product> suggestions = new ArrayList<Product>();
	
		SearchResponse searchresponse = client
				.prepareSearch("product")
				.setTypes("product")
				.setQuery(
						QueryBuilders.queryStringQuery(pSearchTerm + "*")
								.lenient(true).field("name"))
				.setExplain(true).execute().actionGet();

		SearchHit[] results = searchresponse.getHits().getHits();
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();

		System.out.println("Current results: " + results.length);
		for (SearchHit hit : results) {
			System.out.println("------------------------------");
			Map<String, Object> map = new HashMap<String, Object>();
			map = hit.getSource();
			System.out.println("result=" + map);
			list.add(map);
			// return list;
		}
		
		return list;
 	}
*/	
/*	@RequestMapping(value = "/search")
	public ModelAndView Search(@RequestParam(value = "searchTerm", required = false) String pSearchTerm,
			HttpServletRequest request, HttpServletResponse response) {

		ModelAndView mv = new ModelAndView("search");

		mv.addObject("searchTerm", "pSearchTerm");
		mv.addObject("searchResult", SearchBuilder.view(pSearchTerm));

		mv.addObject("userClickSearch", true);

		return mv;
	}*/

	
/*    @GetMapping("/insert/{id}")
    public String insert(@PathVariable final String id) throws IOException {

        IndexResponse response = client.prepareIndex("employee", "id", id)
                .setSource(jsonBuilder()
                        .startObject()
                        .field("name", "Ajay")
                        .field("salary", 1200)
                        .field("teamName", "Development")
                        .endObject()
                )
                .get();
        return response.getResult().toString();
    }
*/
 
/*    @GetMapping("/update/{id}")
    public String update(@PathVariable final String id) throws IOException {

        UpdateRequest updateRequest = new UpdateRequest();
        updateRequest.index("employee")
                .type("id")
                .id(id)
                .doc(jsonBuilder()
                        .startObject()
                        .field("gender", "male")
                        .endObject());
        try {
            UpdateResponse updateResponse = client.update(updateRequest).get();
            System.out.println(updateResponse.status());
            return updateResponse.status().toString();
        } catch (InterruptedException | ExecutionException e) {
            System.out.println(e);
        }
        return "Exception";
    }

    @GetMapping("/delete/{id}")
    public String delete(@PathVariable final String id) {

        DeleteResponse deleteResponse = client.prepareDelete("employee", "id", id).get();

        System.out.println(deleteResponse.getResult().toString());
        return deleteResponse.getResult().toString();
    }*/


}

