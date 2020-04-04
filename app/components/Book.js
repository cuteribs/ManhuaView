import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, Dimensions, Text } from 'react-native';
import { Comic } from 'app/models';
import { colors } from 'app/styles';

export class Book extends React.Component {
	static propTypes = {
		data: PropTypes.instanceOf(Comic),
	};
	render() {
		const { data, removeAction, navigation } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.body}>
					<View style={styles.cover}>
						<Image style={styles.cover.image} source={{ uri: data.cover }} resizeMode='stretch' />
						<Text style={styles.cover.tip}>{data.tip}</Text>
					</View>
					<View style={styles.text}>
						<Text style={styles.text.title} numberOfLines={1} ellipsizeMode='tail'>
							{data.title}
						</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = {
	container: { width: '33.3%' },
	body: { flex: 1 },
	cover: {
		image: { width: '100%', height: 200},
		text: { position: 'absolute', bottom: 0 },
	},
	text: {
		title: { fontSize: 14, color: colors.onPrimary },
	},
};
