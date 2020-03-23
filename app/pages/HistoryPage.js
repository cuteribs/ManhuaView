import React from 'react';
import { AsyncStorage, FlatList } from 'react-native';
import { Body, Button, Container, Content, Header, Icon, Left, Right, Title } from 'native-base';
import { ComicItem } from './ComicItem';

export class HistoryPage extends React.Component {
	state = {
		isLoading: false,
		history: [],
		historyList: []
	};
	async getHistory() {
		this.setState({ isLoading: true });
		let value = await AsyncStorage.getItem('history');

		if (value) {
			let history = JSON.parse(value);
			this.setState({ history, historyList: history.reverse() });
		}
		this.setState({ isLoading: false });
	}
	async remove(item) {
		let history = this.state.history;
		let index = history.indexOf(item);
		history.splice(index, 1);
		await AsyncStorage.setItem('history', JSON.stringify(history));
		this.getHistory();
	}
	componentDidMount() {
		this.props.navigation.addListener('didFocus', () => this.getHistory());
	}
	render() {
		return (
			<Container style={{ marginTop: Expo.Constants.statusBarHeight }}>
				<Header>
					<Left style={{ flex: 1 }} />
					<Body style={{ flex: 1, alignItems: 'center' }}>
						<Title>阅读历史</Title>
					</Body>
					<Right style={{ flex: 1 }}>
						<Button transparent onPress={() => this.props.navigation.navigate('Search')}>
							<Icon name="search" />
						</Button>
					</Right>
				</Header>
				<Content>
					<FlatList
						numColumns={3}
						data={this.state.history}
						keyExtractor={item => item.title}
						renderItem={({ item }) => <ComicItem item={item} removeAction={item => this.remove(item)} navigation={this.props.navigation} />}
					/>
				</Content>
			</Container>
		);
	}
}
