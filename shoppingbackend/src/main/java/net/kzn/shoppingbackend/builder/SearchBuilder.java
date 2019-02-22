package net.kzn.shoppingbackend.builder;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.transport.client.PreBuiltTransportClient;

public class SearchBuilder {

	TransportClient client;

	@SuppressWarnings("resource")
	public SearchBuilder() throws UnknownHostException {
		client = new PreBuiltTransportClient(Settings.EMPTY)
				.addTransportAddress(new InetSocketTransportAddress(InetAddress
						.getByName("localhost"), 9300));
	}

	public List<Map<String, Object>> view(final String id) {
		System.out.println("id=" + id);
		SearchResponse response = client.prepareSearch("user_detail")
				.setTypes("user")
				.setQuery(QueryBuilders.matchQuery("first_name", id))
				.setExplain(true).execute().actionGet();

		SearchHit[] results = response.getHits().getHits();
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();

		System.out.println("Current results: " + results.length);
		for (SearchHit hit : results) {
			System.out.println("------------------------------");
			Map<String, Object> map = new HashMap<String, Object>();
			map = hit.getSource();
			System.out.println("result=" + map);
			list.add(map);
			//return list;
		}
   	 	return list;
	}

	/*
	 * public static void searchDocument(Client client, String index, String
	 * type, String field, String value) {
	 * 
	 * SearchResponse response = client.prepareSearch(index).setTypes(type)
	 * .setSearchType(SearchType.DFS_QUERY_THEN_FETCH)
	 * .setQuery(QueryBuilders.termQuery("first_name",
	 * id)).setFrom(1).setSize(4) .setExplain(true).execute().actionGet() ;
	 * 
	 * SearchHit[] results = response.getHits().getHits();
	 * 
	 * System.out.println("Current results: " + results.length); for (SearchHit
	 * hit : results) { System.out.println("------------------------------");
	 * Map<String, Object> result = hit.getSource(); System.out.println(result);
	 * } }
	 */
}
