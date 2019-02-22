package net.kzn.onlineshopping.controller;

import java.util.List;

import net.kzn.shoppingbackend.builder.SearchQueryBuilder;
import net.kzn.shoppingbackend.dto.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

		@RestController
		@RequestMapping("/rest/manual/search")
		public class ManualSearchResource {
		
			 @Autowired
			    private SearchQueryBuilder searchQueryBuilder;
			 
			    @GetMapping(value = "/{text}")
			    public List<User> getAll(@PathVariable final String text) {
			        return searchQueryBuilder.getAll(text);
			    }
		}