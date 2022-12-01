import React from 'react';
import styled from 'styled-components';

const ConBox = styled.div`
	border: 1px solid #222;
	border-radius: 10px;
	padding: 10px;
	margin: 10px;
`;

const List = ({ ...map }) => {
	return (
		<div>
			<ConBox>
				<p>{map.place_name}</p>
				<p>{map.road_address_name}</p>
				<p>{map?.phone}</p>
			</ConBox>
		</div>
	);
};

export default List;
