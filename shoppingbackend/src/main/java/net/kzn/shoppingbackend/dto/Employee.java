package net.kzn.shoppingbackend.dto;
 
public class Employee {

	private String searchTerm;

	private String txtMinAge;

	private String txtMaxAge;
	  
	private String[] brands;

	public String getSearchTerm() {
		return searchTerm;
	}

	public void setSearchTerm(String searchTerm) {
		this.searchTerm = searchTerm;
	}

	public String getTxtMinAge() {
		return txtMinAge;
	}

	public void setTxtMinAge(String txtMinAge) {
		this.txtMinAge = txtMinAge;
	}

	public String getTxtMaxAge() {
		return txtMaxAge;
	}

	public void setTxtMaxAge(String txtMaxAge) {
		this.txtMaxAge = txtMaxAge;
	}
  	
	public Employee() {
		super();
	}

	public String[] getBrands() {
		return brands;
	}

	public void setBrands(String[] brands) {
		this.brands = brands;
	}
  
}
