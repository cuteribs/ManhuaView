import React from 'react';
import { FlatList, RefreshControl, ScrollView, ActivityIndicator, View, Text, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import { Icon, IconButton, Book } from 'app/components';
import { Manhuafen } from 'app/parsers';
import { colors } from 'app/styles';

const parser = Manhuafen;

export default class UpdatePage extends React.Component {
	state = { isLoading: false, mainTags: [] };
	async refresh(renew) {
		this.setState({ isLoading: true });
		let mainTags;

		if (!renew) {
			let cache = await AsyncStorage.getItem('mainTags');

			if (cache) {
				mainTags = JSON.parse(cache);
			} else {
				renew = true;
			}
		}
		if (renew) {
			const result = await parser.getMainTags();

			if (result.success) {
				mainTags = result.mainTags;
				await AsyncStorage.setItem('mainTags', JSON.stringify(mainTags));
			}

			console.log('mainTags', result);
		}

		this.setState({ isLoading: false, mainTags: mainTags || [] });
	}
	componentDidMount() {
		console.log('UpdatePage componentDidMount');
		this.refresh(false);
	}
	renderTag(tag) {
		console.log('tag', tag);
		return (
			<View key={tag.title} style={{ padding: 5 }}>
				<Text style={{ fontSize: 20, margin: 5 }}>{tag.title}</Text>
				<View style={styles.body.tagContainer}>
					{tag.items.map(i => <Book key={i.id} data={i} />)}
				</View>
			</View>
		);
	}
	renderBody() {
		const { isLoading, mainTags } = this.state;

		if (isLoading) {
			return <ActivityIndicator size='large' />;
		}

		return <ScrollView style={styles.body.container}>{mainTags.map((t) => this.renderTag(t))}</ScrollView>;
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
				{this.renderBody()}
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
			backgroundColor: colors.primary,
		},
		title: { marginLeft: 31, fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: colors.onPrimary },
		button: { fontSize: 20, color: colors.onPrimary },
	},
	body: {
		container: { flex: 1 },
		tagContainer: { flexDirection: 'row', flexWrap: 'wrap' }
	},
};
