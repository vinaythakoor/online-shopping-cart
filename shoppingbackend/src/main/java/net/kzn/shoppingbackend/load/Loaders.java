/*package net.kzn.shoppingbackend.load;
  
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import net.kzn.shoppingbackend.dao.UserDAO;
import net.kzn.shoppingbackend.dto.User;
import net.kzn.shoppingbackend.dto.UserDetail;
import net.kzn.shoppingbackend.repository.UsersRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional
public class Loaders {

    @Autowired
    ElasticsearchOperations operations;

private final UsersRepository UsersRepository;
    
    Loaders(UsersRepository UsersRepository) {
        this.UsersRepository = UsersRepository;
    }
 
    @Autowired
    UserDAO userDao;

    @PostConstruct
    public void loadAll(){

        operations.putMapping(User.class);
        System.out.println("Loading Data");
        
        List<User> data = userDao.getdata();
        userJpaRepository.saveAll(data); //saves to H2 DB

         List<User> usersList = userDao.getdata(); //Get from H2 DB
          
         List<UserDetail> myList = new ArrayList<>();
            
        UsersRepository.saveAll(usersList); //loads into Elastic
        System.out.printf("Loading Completed");

        //userJpaRepository.save(data); //saves to H2 DB
        
        
        usersRepository.saveAll(userDao.getdata()); //loads into Elastic
        System.out.printf("Loading Completed");

    }

    private List<UserDetail> getData() {
        List<UserDetail> userses = new ArrayList<>();
        userses.add(new UserDetail("Ajay",123L, "Accounting", 12000L));
        userses.add(new UserDetail("Jaga",1234L, "Finance", 22000L));
        userses.add(new UserDetail("Thiru",1235L, "Accounting", 12000L));
        return userses;
    }
}*/