package net.kzn.shoppingbackend.dto;

import java.util.ArrayList;

public class MyData {

	private ArrayList<Integer> a;

	public ArrayList<Integer> getA() {
		return a;
	}

	public void setA(ArrayList<Integer> a) {
		this.a = a;
	}

	public MyData(ArrayList<Integer> a) {
		super();
		this.a = a;
	}
	
}
