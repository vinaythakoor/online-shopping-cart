package net.kzn.shoppingbackend.dto;

import java.io.Serializable;

public class Search implements Serializable {

  		private static final long serialVersionUID = 1L;
		 
	 	private String searchterm;

		public String getSearchterm() {
			return searchterm;
		}

		public void setSearchterm(String searchterm) {
			this.searchterm = searchterm;
		}
	 	 
	 }
