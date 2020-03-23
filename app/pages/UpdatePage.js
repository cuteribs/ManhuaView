import React from 'react';
import Expo from 'expo';
import Constants from 'expo-constants';
import { TouchableNativeFeedback, FlatList, RefreshControl, View, Text } from 'react-native';
// import { ComicItem } from './ComicItem';
// import * as api from 'app/api';

export default class UpdatePage extends React.Component {
	state = { isLoading: false, sections: [] };
	// async refresh(renew) {
	// 	this.setState({ isLoading: true });
	// 	let sections;

	// 	if (!renew) {
	// 		let cache = await AsyncStorage.getItem('sections');

	// 		if (cache) {
	// 			sections = JSON.parse(cache);
	// 		} else {
	// 			renew = true;
	// 		}
	// 	}

	// 	if (renew) {
	// 		let json = await api.getMainTags();

	// 		if (json.success) {
	// 			sections = json.tags;
	// 			await AsyncStorage.setItem('sections', JSON.stringify(sections));
	// 		}
	// 	}

	// 	this.setState({ sections: sections || [], isLoading: false });
	// }
	// componentDidMount() {
	// 	this.refresh(false);
	// }
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
				<View style={styles.header.container}>
					<Text style={styles.header.title}>{title}</Text>
					<TouchableNativeFeedback onPress={() => navigation.navigate('Search')}>
						{/* <Icon name="ios-search" /> */}
					</TouchableNativeFeedback>
				</View>
				<View style={styles.body.container}>
					{this.state.sections.map(s => this.renderSection(s))}</View>
			</View>
		);
	}
}

const styles = {
	fill: { flex: 1 },
	container: { paddingTop: Constants.statusBarHeight },
	header: {
		conatiner: { height: 56, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ff00ff' },
		title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', backgroundColor: 'transparent' }
	},
	body: {
		container: { flex: 1 }
	}
};
