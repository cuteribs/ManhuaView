import React from 'react';
import Expo from 'expo';
import Constants from 'expo-constants';
import { Icon, IconButton } from 'app/components';
import { FlatList, RefreshControl, View, Text } from 'react-native';
import { colors } from 'app/styles';
// import { ComicItem } from './ComicItem';

const parser = require('$parsers/Manhuafen.js');

export default class UpdatePage extends React.Component {
	state = { isLoading: false, sections: [] };
	async refresh(renew) {
		this.setState({ isLoading: true });
		let sections;

		if (!renew) {
			let cache = await AsyncStorage.getItem('sections');

			if (cache) {
				sections = JSON.parse(cache);
			} else {
				renew = true;
			}
		}

		if (renew) {
			let json = await api.getMainTags();

			if (json.success) {
				sections = json.tags;
				await AsyncStorage.setItem('sections', JSON.stringify(sections));
			}
		}

		this.setState({ sections: sections || [], isLoading: false });
	}
	componentDidMount() {
		// this.refresh(false);
		console.log('parser', parser);
	}
	renderSection(section) {
		return (
			<View key={section.title} style={{ padding: 5 }}>
				<Text style={{ fontSize: 20, margin: 5 }}>{section.title}</Text>
				<FlatList
					numColumns={3}
					data={section.items}
					keyExtractor={item => item.title}
					// renderItem={({ item }) => <ComicItem item={item} navigation={this.props.navigation} />}
				/>
			</View>
		);
	}
	render() {
		const { navigation } = this.props;
		const title = '排骨看漫';

		return (
			<View style={styles.container}>
				<View style={styles.statusBar} />
				<View style={styles.header.container}>
					<Text style={[styles.fill, styles.header.title]}>{title}</Text>
					<IconButton
						name='ios-search'
						style={styles.header.button}
						onPress={() => navigation.navigate('Search')}
					/>
				</View>
				<View style={styles.body.container}>{this.state.sections.map(s => this.renderSection(s))}</View>
			</View>
		);
	}
}

const styles = {
	fill: { flex: 1 },
	statusBar: { height: Constants.statusBarHeight, backgroundColor: colors.primary },
	container: { flex: 1, backgroundColor: colors.backgroundColor },
	header: {
		container: {
			padding: 5,
			height: 50,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			backgroundColor: colors.primary
		},
		title: { marginLeft: 31, fontSize: 14, fontWeight: 'bold', textAlign: 'center', color: colors.onPrimary },
		button: { fontSize: 20, color: colors.onPrimary }
	},
	body: {
		container: { flex: 1 }
	}
};
