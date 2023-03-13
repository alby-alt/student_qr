export const paginate = (items, current_page, per_page_items) => {
	let page = current_page || 1,
	per_page = per_page_items || 10,
	offset = (page - 1) * per_page,

	paginatedItems = items.slice(offset).slice(0, per_page_items),
	total_pages = Math.ceil(items.length / per_page);

	return {
		pagination: {
			next: {
				page: (total_pages > page) ? page + 1 : null,
				limit: per_page,
				totalPages: total_pages
			}
		},
		totalPages: total_pages,
		limit: per_page,
		nextPage: (total_pages > page) ? page + 1 : null,
		totalDocs: items.length,
		list: paginatedItems
	};
}