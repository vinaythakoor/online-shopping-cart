package net.kzn.shoppingbackend.builder;
  
import java.util.List;

import net.kzn.shoppingbackend.dto.User;

import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Component;

		@Component
		public class SearchQueryBuilder {
		
			 private ElasticsearchTemplate elasticsearchTemplate;
			 
			    @Autowired
			    public SearchQueryBuilder(ElasticsearchTemplate elasticsearchTemplate) {
			        this.elasticsearchTemplate = elasticsearchTemplate;
			    }
		        
		    public List<User> getAll(String text) {
		
		        QueryBuilder query = QueryBuilders.boolQuery()
		                .should(
		                        QueryBuilders.queryStringQuery(text)
		                                .lenient(true)
		                                .field("firstName")
		                                .field("role")
		                ).should(QueryBuilders.queryStringQuery("*" + text + "*")
		                        .lenient(true)
		                        .field("firstName")
		                        .field("role"));
		
		        NativeSearchQuery build = new NativeSearchQueryBuilder()
		                .withQuery(query)
		                .build();
		
		        List<User> userses = elasticsearchTemplate.queryForList(build, User.class);
		
		        return userses;
		    }
		}