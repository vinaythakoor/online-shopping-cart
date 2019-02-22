package net.kzn.onlineshopping.model;

import org.springframework.web.multipart.MultipartFile;

public class FormWrapper {
    private MultipartFile image;

    
	public MultipartFile getImage() {
		return image;
	}


	public void setImage(MultipartFile image) {
		this.image = image;
	}


	@Override
	public String toString() {
		return "FormWrapper [image=" + image + "]";
	}
    
    
} 