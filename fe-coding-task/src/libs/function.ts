// Format query payload according to API specifications
export const createQuery = (quarters: String[], houseType: String[]) => {
	const payload = {
		"query": [
			{
				"code": "Boligtype",
				"selection": {
					"filter": "item",
					"values": houseType
				}
			},
			{
				"code": "ContentsCode",
				"selection": {
					"filter": "item",
					"values": [
						"KvPris"
					]
				}
			},
			{
				"code": "Tid",
				"selection": {
					"filter": "item",
					"values": quarters
				}
			}
		],
		"response": {
			"format": "json-stat2"
		}
	};
	return payload;
};