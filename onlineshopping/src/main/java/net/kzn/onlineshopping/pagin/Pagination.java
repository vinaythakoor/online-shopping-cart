package net.kzn.onlineshopping.pagin;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import net.kzn.shoppingbackend.dto.Pagin;

@Component
public class Pagination {

	public Long[] pagin(long showpage, long maxpages, long page) {

		List<Long> list = new ArrayList<Long>();
		long begin, end;

		long lastcount = maxpages % showpage; // number of pages above maxpages
												// % 5

		long last = maxpages - lastcount;
		Long[] ans = new Long[2];

		if (page <= maxpages) {
			if (maxpages < showpage) {

				begin = 1;
				end = maxpages;
				ans[0] = begin;
				ans[1] = end;
				System.out.println("condition 1");
			} else if (page < showpage - 2) {
				begin = 1;
				end = showpage;
				ans[0] = begin;
				ans[1] = end;
				System.out.println("condition 2");
			} else if (page == maxpages) {
				begin = maxpages - (showpage - 1);
				end = maxpages;
				ans[0] = begin;
				ans[1] = end;
				System.out.println("condition 3");
			} else if (page > maxpages - 3) {
				begin = page - 3;
				end = maxpages;
				ans[0] = begin;
				ans[1] = end;
				System.out.println("condition 4");
			} else {
				Long count = (page / showpage) + 2;
				begin = page - 2;
				end = page + 3;
				ans[0] = begin;
				ans[1] = end;
				System.out.println("condition 5");
			}

		}
		return ans;
	}

}
