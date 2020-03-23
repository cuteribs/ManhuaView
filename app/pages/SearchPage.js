import React from 'react';
import { AsyncStorage, FlatList } from 'react-native';
import { Button, Container, Content, Header, Icon, Input, Item, Right, Spinner, Text } from 'native-base';
import * as api from '../api';
import { ComicItem } from './ComicItem';

export class SearchPage extends React.Component {
	state = {
		isLoading: false,
		keywords: null,
		result: [],
		history: []
	};
	async search(keywords) {

		if (!keywords || !keywords.trim()) {
			return;
		}

		this.setState({ isLoading: true });
		let result;

		let json = await api.search(keywords);

		if (json.success) {
			result = json.result;
			let history = this.state.history;
			history.push(keywords.trim());
			this.setState({ history, result, isLoading: false });
		} else {
			this.setState({ isLoading: false });
		};
	}
	async getHistory() {
		let value = await AsyncStorage.getItem('search-history');

		if (value) {
			let history = JOSN.parse(value);
			this.setState({ history });
		}
	}
	componentDidMount() {
		this.getHistory();
	}
	renderContent() {
		if (this.state.isLoading) {
			return <Spinner title={'loading...'} />;
		}

		return (
			<FlatList
				numColumns={3}
				data={this.state.result}
				keyExtractor={item => item['Category Id']}
				renderItem={({ item }) => <ComicItem item={item} navigation={this.props.navigation} />}
			/>
		);
	}
	render() {
		return (
			<Container style={{ marginTop: Expo.Constants.statusBarHeight }}>
				<Header searchBar rounded>
					<Item>
						<Input placeholder="搜索" onSubmitEditing={e => this.search(e.nativeEvent.text)} />
						<Icon name="ios-search" />
					</Item>
					<Right style={{ flex: 0 }}>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Text>取消</Text>
						</Button>
					</Right>
				</Header>
				<Content>{this.renderContent()}</Content>
			</Container>
		);
	}
}
