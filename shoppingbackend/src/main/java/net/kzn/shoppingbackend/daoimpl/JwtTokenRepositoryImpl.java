package net.kzn.shoppingbackend.daoimpl;

import java.util.Map;

import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import net.kzn.shoppingbackend.dto.JwtInvalidToken;
import net.kzn.shoppingbackend.dto.Users;
import net.kzn.shoppingbackend.repository.JwtTokenRepository;

@Repository("JwtTokenRepository")
public class JwtTokenRepositoryImpl implements JwtTokenRepository {
 	
    private RedisTemplate<String, String> redisTemplate;

    private HashOperations<String, String, String> hashOperations;

    public JwtTokenRepositoryImpl(RedisTemplate<String, String> redisTemplate) {
    	this.redisTemplate = redisTemplate;
        hashOperations = redisTemplate.opsForHash();
    }
     
	@Override
	public void save(String token) {
		hashOperations.put("TOKEN", token, token);	
	}

	@Override
	public Map<String, String> findAll() {
		return hashOperations.entries("TOKEN");
	}

	@Override
	public String findById(String id) {
		return (String)hashOperations.get("TOKEN", id);
	}

	@Override
	public void update(JwtInvalidToken token) {
		// TODO Auto-generated method stub		
	}

	@Override
	public void delete(String id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean exist(String token) {
		Map<String, String>  map=  hashOperations.entries("TOKEN");
		return hashOperations.hasKey("TOKEN", token);
		//return redisTemplate.hasKey(token);
		//return map.containsKey(token);
		
	}

}
