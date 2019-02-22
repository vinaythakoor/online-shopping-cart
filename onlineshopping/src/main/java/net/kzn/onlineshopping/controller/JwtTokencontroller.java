package net.kzn.onlineshopping.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.kzn.shoppingbackend.repository.JwtTokenRepository;;

@RestController
@RequestMapping("/rest/user")

public class JwtTokencontroller {
  
	    private JwtTokenRepository jwtTokenRepository;

	    public JwtTokencontroller(JwtTokenRepository jwtTokenRepository) {
	        this.jwtTokenRepository = jwtTokenRepository;
	    }

	    @GetMapping("/add/{id}/{name}")
	    public String add(@PathVariable("id") final String id,
	                    @PathVariable("name") final String name) {
	    	jwtTokenRepository.save(name);
	        return jwtTokenRepository.findById(name);
	    }
  
	    @GetMapping("/all")
	    public Map<String, String> all() {
	        return jwtTokenRepository.findAll();
	    }
	    
	    @GetMapping("/exist/{token}")
	    public boolean add(@PathVariable("token") final String token) {
	    	return jwtTokenRepository.exist(token);
	    }
	}

		