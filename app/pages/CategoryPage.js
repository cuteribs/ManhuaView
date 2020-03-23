import React from 'react';
import { FlatList, View } from 'react-native';
import { Body, Button, Container, Content, Header, Icon, Left, Picker, Right, Spinner, Title } from 'native-base';
import * as api from '../api';
import { ComicItem } from './ComicItem';

export class CategoryPage extends React.Component {
	state = {
		isLoading: true,
		filters: [],
		comics: []
	};
	navigation = this.props.navigation;
	async getList(path) {
		this.setState({ isLoading: true });
		let result;
		path = path || '';
		let json = await api.getList(path);

		if (json.success) {
			result = json.result;
		}

		result.filters.forEach(f => {
			let selectedItem = f.items.find(i => i.selected);
			f.selectedItem = selectedItem;
		});

		this.setState({ filters: result.filters, comics: result.comics, isLoading: false });
	}
	componentDidMount() {
		this.getList();
	}
	onValueChange(value) {
		this.getList(value);
	}
	renderFilter(filter) {
		return (
			<Picker
				mode="dropdown"
				style={{ flex: 1 }}
				key={filter.label}
				selectedValue={filter.selectedItem.path}
				onValueChange={value => this.onValueChange(value)}>
				{filter.items.map(i => (
					<Picker.Item label={i.text} value={i.path} key={i.path} />
				))}
			</Picker>
		);
	}
	renderContent() {
		if (this.state.isLoading) {
			return <Spinner color="black" style={{ flex: 1, justifyContent: 'center' }} />;
		}

		return (
			<Content>
				<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
					{this.state.filters.map(f => this.renderFilter(f))}
				</View>
				<FlatList
					numColumns={3}
					data={this.state.comics}
					keyExtractor={item => item.title}
					renderItem={({ item }) => <ComicItem item={item} navigation={this.props.navigation} />}
				/>
			</Content>
		);
	}
	render() {
		return (
			<Container style={{ marginTop: Expo.Constants.statusBarHeight }}>
				<Header>
					<Left style={{ flex: 1 }} />
					<Body style={{ flex: 1, alignItems: 'center' }}>
						<Title>漫画分类</Title>
					</Body>
					<Right style={{ flex: 1 }}>
						<Button transparent onPress={() => this.props.navigation.navigate('Search')}>
							<Icon name="search" />
						</Button>
					</Right>
				</Header>
				{this.renderContent()}
			</Container>
		);
	}
}
