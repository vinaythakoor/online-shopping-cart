package net.kzn.shoppingbackend.dto;

import java.io.Serializable;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Component
public class AddProduct implements Serializable {

	private static final long serialVersionUID = 1L;
	
	// private fields
	private int id;
	private String code;
 	private String name;
 	private String brand;
 	private String description;
 	private double unitPrice;
	private int quantity;
 	private boolean active;
 	@JsonIgnore
	private int categoryId;
	@Column(name = "supplier_id")
	@JsonIgnore
	private int supplierId;
	private int purchases;
	private int views;
  
	// default constructor
	public AddProduct() {
		
		this.code = "PRD" + UUID.randomUUID().toString().substring(26).toUpperCase();
		
	}
	
	
	// setters and getters	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public double getUnitPrice() {
		return unitPrice;
	}
	public void setUnitPrice(double unitPrice) {
		this.unitPrice = unitPrice;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	public int getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}
	public int getSupplierId() {
		return supplierId;
	}
	public void setSupplierId(int supplierId) {
		this.supplierId = supplierId;
	}

	public int getPurchases() {
		return purchases;
	}

	public void setPurchases(int purchases) {
		this.purchases = purchases;
	}

	public int getViews() {
		return views;
	}

	public void setViews(int views) {
		this.views = views;
	}

	
	
	public AddProduct(int id, String code, String name, String brand, String description, double unitPrice, int quantity,
			boolean active, int categoryId, int supplierId, int purchases, int views) {
		super();
		this.id = id;
		this.code = code;
		this.name = name;
		this.brand = brand;
		this.description = description;
		this.unitPrice = unitPrice;
		this.quantity = quantity;
		this.active = active;
		this.categoryId = categoryId;
		this.supplierId = supplierId;
		this.purchases = purchases;
		this.views = views; 
	}

	@Override
	public String toString() {
		return "AddProduct [id=" + id + ", code=" + code + ", name=" + name + ", brand=" + brand + ", description="
				+ description + ", unitPrice=" + unitPrice + ", quantity=" + quantity + ", active=" + active
				+ ", categoryId=" + categoryId + ", supplierId=" + supplierId + ", purchases=" + purchases + ", views="
				+ views +"]";
	}

	// toString for debugging
	
}
