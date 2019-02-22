package net.kzn.shoppingbackend.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;

import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "[user_detail]", type = "[user_detail]", shards = 1)
public class UserDetail implements Serializable{
 
   	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@NotBlank
	@Column(name = "first_name")
	private String firstName;
	@NotBlank
	@Column(name = "last_name")
	private String lastName;
	@NotBlank(message = "Please enter email address!")
	private String email;
	@NotBlank(message = "Please enter contact number!")
	@Column(name = "contact_number")
	private String contactNumber;
	private String role;
	@NotBlank(message = "Please enter password!")
	private String password;
	private boolean enabled = true;
	@Transient
	private String confirmPassword;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public boolean isEnabled() {
		return enabled;
	}
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	public String getConfirmPassword() {
		return confirmPassword;
	}
	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}
	@Override
	public String toString() {
		return "UserDetail [id=" + id + ", firstName=" + firstName
				+ ", lastName=" + lastName + ", email=" + email
				+ ", contactNumber=" + contactNumber + ", role=" + role
				+ ", password=" + password + ", enabled=" + enabled
				+ ", confirmPassword=" + confirmPassword + "]";
	}

	
}
 