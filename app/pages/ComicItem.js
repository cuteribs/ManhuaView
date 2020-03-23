import { Card, CardItem, Text, Icon, Button } from 'native-base';
import React from 'react';
import { Image, View } from 'react-native';

export class ComicItem extends React.Component {
	render() {
		const { item, removeAction, navigation } = this.props;
		return (
			<View style={{ width: '33.3%' }}>
				<Card key={item.title} style={{ flex: 1, margin: 5 }}>
					<CardItem cardBody button onPress={() => navigation.navigate('Info', { url: item.url })}>
						<Image source={{ uri: item.cover }} style={{ flex: 1, aspectRatio: 3 / 4 }} />
						<View style={{ position: 'absolute', top: 0, right: 0 }}>
							<Button
								transparent
								small
								onPress={() => removeAction(item)}
								style={{ display: removeAction ? 'flex' : 'none' }}>
								<Icon name="close" />
							</Button>
						</View>
					</CardItem>
					<CardItem
						cardBody
						button
						style={{ padding: 3, flexDirection: 'column', alignItems: 'flex-start' }}
						onPress={() => navigation.navigate('Info', { url: item.url })}>
						<Text numberOfLines={1} ellipsizeMode={'tail'}>
							{item.title}
						</Text>
						<Text style={{ color: '#666', fontSize: 14 }}>{item.subTitle}</Text>
					</CardItem>
				</Card>
			</View>
		);
	}
}
