package net.kzn.shoppingbackend.daoimpl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import net.kzn.shoppingbackend.dao.UserDAO;
import net.kzn.shoppingbackend.dto.Address;
import net.kzn.shoppingbackend.dto.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository("userDAO")
@Transactional
public class UserDAOImpl implements UserDAO {

	@PersistenceContext
    @Autowired
    private EntityManager em;
	 
	@Override
	public User getByEmail(String email) {
		String selectQuery = "FROM User WHERE email = :email";
		try {
		return em
					.createQuery(selectQuery,User.class)
						.setParameter("email",email)
							.getSingleResult();
		}
		catch(Exception ex) {
			return null;
		}
 	}

	@Override
	public boolean add(User user) {
		try {			
			em.persist(user);			
			return true;
		}
		catch(Exception ex) {
			return false;
		}
	}

	@Override
	public boolean addAddress(Address address) {
		try {			
			// will look for this code later and why we need to change it
			em.persist(address);			
			return true;
		}
		catch(Exception ex) {
			return false;
		}
	}
	
	@Override
	public boolean updateAddress(Address address) {
		try {			
			em.merge(address);			
			return true;
		}
		catch(Exception ex) {
			return false;
		}
	}	
	

	@Override
	public List<Address> listShippingAddresses(int userId) {
		String selectQuery = "FROM Address WHERE userId = :userId AND shipping = :isShipping ORDER BY id DESC";
		return em
					.createQuery(selectQuery,Address.class)
						.setParameter("userId", userId)
						.setParameter("isShipping", true)
							.getResultList();
		
	}

	@Override
	public Address getBillingAddress(int userId) {
		String selectQuery = "FROM Address WHERE userId = :userId AND billing = :isBilling";
		try{
		return em
					.createQuery(selectQuery,Address.class)
						.setParameter("userId", userId)
						.setParameter("isBilling", true)
						.getSingleResult();
		}
		catch(Exception ex) {
			return null;
		}
	}

	@Override
	public User get(int id) {
		try {			
			return em.find(User.class, id);			
		}
		catch(Exception ex) {
			System.out.println(ex.getMessage());
			return null;
		}
	}

	@Override
	public Address getAddress(int addressId) {
		try {			
			return em.find(Address.class, addressId);			
		}
		catch(Exception ex) {
			System.out.println(ex.getMessage());
			return null;
		}
	}

	@Override
	public List<User> getdata() {
		String selectQuery = "FROM User";
		try {
		return em
					.createQuery(selectQuery,User.class)
					 		.getResultList();
		}
		catch(Exception ex) {
			return null;
		}
	}
}
