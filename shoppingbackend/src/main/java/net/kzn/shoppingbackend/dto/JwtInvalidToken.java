package net.kzn.shoppingbackend.dto;

import java.io.Serializable;

public class JwtInvalidToken implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String token;
	public JwtInvalidToken(Long id, String token) {
		super();
		this.id = id;
		this.token = token;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
