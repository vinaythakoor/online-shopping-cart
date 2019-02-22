package net.kzn.shoppingbackend.repository;

import java.util.Map;

import net.kzn.shoppingbackend.dto.JwtInvalidToken;
  
public interface JwtTokenRepository {

    void save(String token);
    Map<String, String> findAll();
    String findById(String id);
    void update(JwtInvalidToken token);
    void delete(String id);
    boolean exist (String token);
}
