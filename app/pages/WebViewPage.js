import React from 'react';
import { View, WebView } from 'react-native';
import { Body, Button, Container, Content, Icon, Spinner, Text, Left, Header, Title, Right, Toast } from 'native-base';
import * as api from '../api';

export class WebViewPage extends React.Component {
	state = {
		isLoading: true,
		windowSize: { width: 0, height: 0 },
		chatper: null,
		html: null
	};
	params = {
		index: -1,
		chapters: []
	};
	async loadChapter() {
		this.setState({ isLoading: true });
		let url = this.params.chapters[this.params.index].url;
		let json = await api.getChapter(url);

		if (json.success && json.chapter.imageUrls) {
			let chapter = json.chapter;
			let html =
				'<div>' +
				chapter.imageUrls.map(url => `<img src="${url}" alt="loading..." style="width: 100%" />`).join('\n') +
				'</div>';
			this.setState({ chapter, html, isLoading: false });
		} else {
			this.setState({ isLoading: false });
		}
	}
	switchChapter(next) {
		if (!next && this.params.index > 0) {
			this.params.index--;
		} else if (next && this.params.index < this.params.chapters.length - 1) {
			this.params.index++;
		} else {
			return;
		}

		this.loadChapter();
	}
	componentDidMount() {
		if (this.params.index === -1) {
			let index = this.props.navigation.getParam('index');
			let chapters = this.props.navigation.getParam('chapters');
			this.params = { index, chapters };
		}

		this.loadChapter();
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
		} else if (!this.state.chapter) {
			return <Text style={{ flex: 1, justifyContent: 'center' }}>加载失败</Text>;
		}

		return (
			<Container style={{ marginTop: Expo.Constants.statusBarHeight }}>
				<Content onLayout={e => this.setState({ windowSize: e.nativeEvent.layout })}>
					<WebView
						source={{ html: this.state.html }}
						baseUrl="http://www.gufengmh.com"
						useWebKit={true}
						style={{ width: this.state.windowSize.width, height: this.state.windowSize.height }}
					/>
				</Content>
				<Button
					transparent
					style={{ position: 'absolute', top: 10, left: 10 }}
					onPress={() => this.props.navigation.goBack()}>
					<Icon name="arrow-back" color="#000" />
				</Button>
				<Body style={{ position: 'absolute', top: 10 }}>
					<Title style={{ color: '#000' }}>{this.state.chapter.title}</Title>
				</Body>
				<Button
					transparent
					style={{ position: 'absolute', bottom: 10, left: 10 }}
					disabled={this.params.index == 0}
					onPress={() => this.switchChapter(false)}>
					<Text>上一话</Text>
				</Button>
				<Button
					transparent
					style={{ position: 'absolute', bottom: 10, right: 10 }}
					disabled={this.params.index == this.params.chapters.length - 1}
					onPress={() => this.switchChapter(true)}>
					<Text>下一话</Text>
				</Button>
			</Container>
		);
	}
}
