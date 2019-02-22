/*package net.kzn.shoppingbackend.ItemMigrator;

import javax.annotation.PostConstruct;

import net.kzn.shoppingbackend.dao.UserDAO;
import net.kzn.shoppingbackend.dto.User;
import net.kzn.shoppingbackend.repository.UsersRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
  
 

@Component
public class ItemMigrator {
 
		@Autowired
	    ElasticsearchOperations operations;
		@Autowired
	    UsersRepository UsersRepository;
		@Autowired
		UserDAO userDAO;
	 
	    @Autowired
	    public ItemMigrator(UserDAO userDAO, ElasticsearchTemplate operations, UsersRepository UsersRepository) {
	        this.userDAO = userDAO;
	        this.operations = operations;
	        this.UsersRepository = UsersRepository;
	    }
	 
	    @PostConstruct
	    @Transactional
	    public void loadAll() {
	        Iterable<User> items = userDAO.getdata();
	        operations.putMapping(User.class);
	        UsersRepository.saveAll(items);
	    }
	 
	}*/