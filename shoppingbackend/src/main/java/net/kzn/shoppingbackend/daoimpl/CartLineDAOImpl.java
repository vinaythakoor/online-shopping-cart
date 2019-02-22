package net.kzn.shoppingbackend.daoimpl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import net.kzn.shoppingbackend.dao.CartLineDAO;
import net.kzn.shoppingbackend.dto.Cart;
import net.kzn.shoppingbackend.dto.CartLine;
import net.kzn.shoppingbackend.dto.OrderDetail;
import net.kzn.shoppingbackend.dto.OrderItem;

@Repository("cartLineDAO")
@Transactional
public class CartLineDAOImpl implements CartLineDAO {

    @PersistenceContext
    @Autowired
    private EntityManager em;
        
	 	@Override
	public CartLine getByCartAndProduct(int cartId, int productId) {
		String query = "FROM CartLine WHERE cartId = :cartId AND product.id = :productId";
		try {
	 	 	
				return em
	 					.createQuery(query, CartLine.class)
	 				  	.setParameter("cartId", cartId)
						.setParameter("productId", productId)
							.getSingleResult();
			
		}catch(Exception ex) {
			return null;	
		}
		
	}

	@Override
	public boolean add(CartLine cartLine) {
		try {
			em.persist(cartLine);
			return true;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean update(CartLine cartLine) {
		try {
			em.merge(cartLine);
			return true;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean remove(CartLine cartLine) {	
		try {			
			//sessionFactory.getCurrentSession().delete(cartLine);
			em.remove(cartLine);
			return true;
		}catch(Exception ex) {
			return false;
		}		
	}


	@Override
	public List<CartLine> list(int cartId) {
		String query = "FROM CartLine WHERE cartId = :cartId";
		 
			return em
					.createQuery(query, CartLine.class)
				  	.setParameter("cartId", cartId)
				 	.getResultList();
	}

	@Override
	public CartLine get(int id) {		
		//return sessionFactory.getCurrentSession().get(CartLine.class, Integer.valueOf(id));
		
		return em.find(CartLine.class, Integer.valueOf(id));
				
	}

	@Override
	public boolean updateCart(Cart cart) {
		try {			
			//sessionFactory.getCurrentSession().update(cart);		
			em.merge(cart);
			return true;
		}
		catch(Exception ex) {
			return false;
		}
	}

	@Override
	public List<CartLine> listAvailable(int cartId) {
		String query = "FROM CartLine WHERE cartId = :cartId AND available = :available";
		return 	em
								.createQuery(query, CartLine.class)
									.setParameter("cartId", cartId)
									.setParameter("available", true)
										.getResultList();
	}

	@Override
	public boolean addOrderDetail(OrderDetail orderDetail) {
		try {			
			em.persist(orderDetail);			
			return true;
		}
		catch(Exception ex) {
			return false;
		}
	}
	
	@Override
	public List<OrderItem> cartItems(int OrderId) {
		String query = "FROM OrderItem WHERE order_id = :OrderId";
		return 	em
								.createQuery(query, OrderItem.class)
									.setParameter("OrderId", OrderId)
 										.getResultList();
	}
		
}