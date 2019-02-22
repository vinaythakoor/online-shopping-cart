package net.kzn.shoppingbackend.daoimpl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import net.kzn.shoppingbackend.dao.ProductDAO;
import net.kzn.shoppingbackend.dto.Product;


@Repository("productDAO")
@Transactional
public class ProductDAOImpl implements ProductDAO {

	@PersistenceContext
    @Autowired
    private EntityManager em;
	 
	/*
	 * SINGLE
	 * */
	
	@Override
	public Product get(int productId) {
		try {			
			return em
						.find(Product.class,Integer.valueOf(productId));			
		}
		catch(Exception ex) {		
			ex.printStackTrace();			
		}
		return null;
	}

	/*
	 * LIST
	 * */
	
	@Override
	public List<Product> list() {
		return em
					.createQuery("FROM Product" , Product.class)
						.getResultList();
	}

	/*
	 * INSERT
	 * */
	@Override
	public boolean add(Product product) {
		try {			
			em
						.persist(product);
			return true;
		}
		catch(Exception ex) {		
			ex.printStackTrace();			
		}		
		return false;
	}

	/*
	 * UPDATE
	 * */
	@Override
	public boolean update(Product product) {
		try {			
			em
						.merge(product);
			return true;
		}
		catch(Exception ex) {		
			//ex.printStackTrace();
			return false;
		}					
	}

	
	/*
	 * DELETE
	 * */
	@Override
	public boolean delete(Product product) {
		try {
			
			product.setActive(false);
			// call the update method
			return this.update(product);
		}
		catch(Exception ex) {		
			ex.printStackTrace();			
		}		
		return false;			
	}

	@Override
	public List<Product> listActiveProducts() {
		String selectActiveProducts = "FROM Product WHERE active = :active";
		return em
					.createQuery(selectActiveProducts, Product.class)
						.setParameter("active", true)
							.getResultList();
	}

	@Override
	public List<Product> listActiveProductsByCategory(int categoryId) {
		String selectActiveProductsByCategory = "FROM Product WHERE active = :active AND categoryId = :categoryId";
		return em
					.createQuery(selectActiveProductsByCategory, Product.class)
						.setParameter("active", true)
						.setParameter("categoryId",categoryId)
						.setMaxResults(12)
							.getResultList();
	}

	@Override
	public List<Product> getLatestActiveProducts(int count) {
		return em
				.createQuery("FROM Product WHERE active = :active ORDER BY id", Product.class)
						.setParameter("active", true)
							.setFirstResult(0)
							.setMaxResults(count)
								.getResultList();					
	}

	@Override
	public List<Product> getProductsByParam(String param, int count) {
		
		String query = "FROM Product WHERE active = true ORDER BY " + param + " DESC";
		
		return em
					.createQuery(query,Product.class)
					.setFirstResult(0)
					.setMaxResults(count)
					.getResultList();
					
		
	}
	
	@Override
	public List<Product> searchProductsByParam(String name) {
	 	String query = "FROM Product WHERE name = :name";
	 	return em
					.createQuery(query,Product.class)
					.setParameter("name",name)	
					.getResultList();
	 }
	
	@Override
	public List<Product> getAllBrands() {
	 	String query = "FROM Product";
	 	return em
					.createQuery(query,Product.class)
					.getResultList();
	 }

	@Override
	public List<Product> getAllBrandsbycategory(int categoryId) {
		String query = "FROM Product WHERE categoryId = :categoryId";
	 	return em
					.createQuery(query,Product.class)
					.setParameter("categoryId",categoryId)	
					.getResultList();
		  
	}
	
	

}
