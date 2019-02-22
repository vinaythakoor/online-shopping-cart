/*package net.kzn.onlineshopping.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.kzn.shoppingbackend.dto.Users;
import net.kzn.shoppingbackend.repository.UsersRepository;

@RestController
@RequestMapping("/rest/user")
public class RedisUserResource {

    private UsersRepository usersRepository;

    public RedisUserResource(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @GetMapping("/add/{id}/{name}")
    public Users add(@PathVariable("id") final String id,
                    @PathVariable("name") final String name) {
        usersRepository.save(new Users(id, name, 20000L));
        return usersRepository.findById(id);
    }

    @GetMapping("/update/{id}/{name}")
    public Users update(@PathVariable("id") final String id,
                       @PathVariable("name") final String name) {
        usersRepository.update(new Users(id, name, 1000L));
        return usersRepository.findById(id);
    }

    @GetMapping("/delete/{id}")
    public Map<String, Users> delete(@PathVariable("id") final String id) {
        usersRepository.delete(id);
        return all();
    }

    @GetMapping("/all")
    public Map<String, Users> all() {
        return usersRepository.findAll();
    }
}
*/