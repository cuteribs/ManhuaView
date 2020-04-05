export default class Comic {
	id = 0;
	title = '';
	cover = '';
	tip = '';
	author = '';
	constructor(comic) {
		if (comic) {
			this.id = comic.id;
			this.title = comic.title;
			this.cover = comic.cover;
			this.tip = comic.tip;
			this.author = comic.author;
		}

		if (this.cover && this.cover.startsWith('//')) {
			this.cover = 'https:' + this.cover;
		}
	}
}
