/*package net.kzn.shoppingbackend.daoimpl;

import java.util.Map;

import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import net.kzn.shoppingbackend.dto.Users;
import net.kzn.shoppingbackend.repository.UsersRepository;

@Repository
public class UserRepositoryImpl implements UsersRepository {

    private RedisTemplate<String, Users> redisTemplate;

    private RedisOperations<String, String> hash;
    private HashOperations<String, String, Users> hashOperations;

    public UserRepositoryImpl(RedisTemplate<String, Users> redisTemplate) {
        this.redisTemplate = redisTemplate;
        hashOperations = redisTemplate.opsForHash();
    }

    @Override
    public void save(Users user) {
        hashOperations.put("USER", "token", user);
    }

    @Override
    public Map<String, Users> findAll() {
        return hashOperations.entries("USER");
    }

    @Override
    public Users findById(String id) {
        return (Users)hashOperations.get("USER", id);
    }

    @Override
    public void update(Users user) {
        save(user);
        
    }

    @Override
    public void delete(String id) {

        hashOperations.delete("USER", id);
    }
}*/