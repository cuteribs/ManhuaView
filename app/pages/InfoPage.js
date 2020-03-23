import React from 'react';
import { AsyncStorage, FlatList, ImageBackground, View, Dimensions } from 'react-native';
import { Button, Container, Content, Icon, Spinner, Text, Toast } from 'native-base';
import { LinearGradient } from 'expo';
import * as api from '../api';

export class InfoPage extends React.Component {
	state = { isLoading: true, info: null, chapters: [], chapterList: [] };
	async getInfo(url) {
		this.setState({ isLoading: true });
		let info;
		let json = await api.getInfo(url);

		if (json.success) {
			info = json.comic;
			this.setState({ isLoading: false, info, chapters: info.chapters, chapterList: info.chapters.reverse() });

			let history = [];
			let value = await AsyncStorage.getItem('history');

			if (value) {
				history = JSON.parse(value);
			}

			let exists = history.find(h => h.url === url);

			if (exists) {
				let index = history.indexOf(exists);
				history.splice(index, 1);
			} else if (history.length >= 100) {
				history.shift();
			}

			history.push({
				cover: info.cover,
				title: info.title,
				subTitle: info.subTitle,
				url: url
			});
			AsyncStorage.setItem('history', JSON.stringify(history));
		} else {
			this.setState({ isLoading: false });
		}
	}
	componentDidMount() {
		const url = this.props.navigation.getParam('url');
		this.getInfo(url);
	}
	render() {
		if (this.state.isLoading) {
			return (
				<View style={{ flex: 1, marginTop: Expo.Constants.statusBarHeight }}>
					<Button transparent onPress={() => this.props.navigation.goBack()}>
						<Icon name="arrow-back" />
					</Button>
					<Spinner color="black" style={{ flex: 1, justifyContent: 'center' }} />
				</View>
			);
		}

		return (
			<Container style={{ marginTop: Expo.Constants.statusBarHeight }}>
				<Content>
					<FlatList
						data={this.state.info.chapters}
						keyExtractor={item => item.title}
						numColumns={4}
						initialNumToRender={36}
						ListHeaderComponent={
							<View>
								<ImageBackground
									source={{ uri: this.state.info.cover }}
									style={{ aspectRatio: 1, flex: 1 }}>
									<LinearGradient
										colors={['#00000099', '#00000000', '#00000000', '#00000099']}
										start={[0, 0]}
										end={[0, 1]}
										locations={[0, 0.2, 0.8, 1]}
										style={{
											flex: 1,
											flexDirection: 'column',
											padding: 5,
											justifyContent: 'flex-end'
										}}>
										<View style={{ flex: 1 }}>
											<Button transparent onPress={() => this.props.navigation.goBack()}>
												<Icon name="arrow-back" />
											</Button>
										</View>
										<Text
											style={{
												fontSize: 22,
												fontWeight: 'bold',
												color: '#fff',
												marginBottom: 5
											}}>
											{this.state.info.title}
										</Text>
										<Text style={{ color: '#fff', marginBottom: 5 }}>
											{this.state.info.subTitle}
										</Text>
									</LinearGradient>
								</ImageBackground>
								<Text style={{ margin: 5 }}>{this.state.info.descr}</Text>
							</View>
						}
						getItemLayout={(_, index) => ({ length: 33, offset: 33 * index, index })}
						renderItem={({ item, index }) => (
							<View style={{ width: '25%' }}>
								<Text
									onPress={_ => {
										if (item.url.startsWith('javascript')) {
											return false;
										}

										this.props.navigation.navigate('View', {
											chapters: this.state.info.chapters,
											index: index
										});
									}}
									numberOfLines={1}
									style={{
										margin: 3,
										fontSize: 14,
										color: item.url.startsWith('javascript') ? '#999' : '#000',
										backgroundColor: '#F1F1F1',
										borderRadius: 3,
										paddingHorizontal: 3,
										paddingVertical: 5,
										textAlign: 'center'
									}}>
									{item.title}
								</Text>
							</View>
						)}
					/>
				</Content>
			</Container>
		);
	}
}
