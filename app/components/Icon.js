import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from 'app/styles';

export class Icon extends React.Component {
	render() {
		let { size, color } = this.props;
		const style = this.props.style || {};

		if (!size) {
			size = style.fontSize || 20;
		}

		if (!color) {
			color = style.color || colors.onPrimary;
		}

		return <Ionicons {...this.props} size={size} color={color} />;
	}
}

export class IconButton extends React.Component {
	render() {
		let { size, color, iconStyle, backgroundColor } = this.props;
		const style = this.props.style || {};

		if (!size) {
			size = style.fontSize || 20;
		}

		if (!color) {
			color = style.color || colors.onPrimary;
		}

		if (!iconStyle || !iconStyle.marginRight) {
			iconStyle = Object.assign({ marginRight: 0 }, iconStyle);
		}

		if (!backgroundColor) {
			backgroundColor = style.backgroundColor || 'transparent';
		}

		return (
			<Ionicons.Button
				{...this.props}
				size={size}
				color={color}
				iconStyle={iconStyle}
				backgroundColor={backgroundColor}
			/>
		);
	}
}
