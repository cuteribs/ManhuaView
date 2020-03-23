export default class Parser {
	static fetchHtml = async url => {
		let response = await fetch(url);

		if (response.status == 200) {
			let html = await response.text();
			return html;
		}

		throw new Error(response.statusText);
	};

	static getComicItemBrief = $li => {
		let item = {
			url: $li.find('> a.cover').attr('href'),
			title: $li.find('> a.cover').attr('title'),
			cover: $li.find('> a.cover img').attr('src'),
			subTitle: $li.find('> a.cover span.tt').text()
		};
		return item;
	};

	static getMainTags = async () => {
		// let html = await fetchHtml(host);
		// let $ = cheerio.load(html);
		// let tagTitles = $('#cmt-tab > ul > li')
		// 	.toArray()
		// 	.map(li =>
		// 		$(li)
		// 			.text()
		// 			.trim()
		// 	);
		// let tagItems = $('#cmt-cont > ul')
		// 	.toArray()
		// 	.map(ul => {
		// 		return $(ul)
		// 			.find('li')
		// 			.toArray()
		// 			.map(li => getComicItemBrief($(li)));
		// 	});
		// let tags = tagTitles.map((t, i) => {
		// 	return { title: t, items: tagItems[i] };
		// });

		// return { success: true, tags };
	};

	static getInfo = async url => {
		// let html = await fetchHtml(url);
		// let $ = cheerio.load(html);
		// let comic = {
		// 	cover: $('div.book-cover img.pic').attr('src'),
		// 	title: $('div.book-title h1')
		// 		.text()
		// 		.trim(),
		// 	subTitle: $('div.book-cover span.text')
		// 		.text()
		// 		.trim(),
		// 	descr: $('div.book-intro #intro-all')
		// 		.text()
		// 		.trim(),
		// 	relatives: $('ul.similar-list li')
		// 		.toArray()
		// 		.map((li, i) => getComicItemBrief($(li))),
		// 	chapters: $('div.chapter-body > ul > li')
		// 		.toArray()
		// 		.map(li => {
		// 			let $li = $(li);
		// 			return {
		// 				title: $li.text().trim(),
		// 				url: $li.find('a').attr('href')
		// 			};
		// 		})
		// };

		// return { success: true, comic };
	};

	static getChapter = async url => {
		// let html = await fetchHtml(host + url);
		// let $ = cheerio.load(html);
		// let title = `${$('div.title h1').text()} - ${$('div.title h2').text()}`;
		// let script = $('body > script')
		// 	.eq(0)
		// 	.html();
		// // var chapterImages = ["1521843205dimeTOvJSh5xPXLP.jpg","1521843206R9YlFJAplZ1gpLUI.jpg","1521843206XVENUOqpwp_96k1e.jpg","1521843206PNrzaHjDl9dcz3w3.jpg","1521843206UpuCH9yqdSJfSpvE.jpg","1521843207jnw7cwVJ-lD2RhOE.jpg","15218432078t7IdlDgP6_WTbD3.jpg","1521843207SqwMvWbGDGIvytHi.jpg","1521843208CAvUBObrCvvMmzhh.jpg","1521843208eT7rFRcq_SYq-Sk-.jpg","1521843208Z4PPB55RTPjKJZz5.jpg","1521843209YC18MDgAr0x3rl9A.jpg","1521843209xHhfieuhR78H9zEj.jpg","1521843209c93dqS7xAu7X2VOr.jpg","1521843209OJ-EI_yWvvn3LWfD.jpg","1521843210Bzu7SHUjYxgFQukp.jpg","1521843210u8Ypz4Id3bCJLq2H.jpg","1521843210v4oDLNi3xZwRRxBd.jpg","1521843211ZLsP6WHcVDyXYGIe.jpg","1521843211OLwjDLuL6P7cfORb.jpg","1521843211ABTOwiudzNQ81I4-.jpg","152184321227FL1DpMbweWA2U0.jpg"];var chapterPath = "images/comic/2/2594/";var pageTitle =
		// const marks = ['var chapterImages = ', ';var chapterPath = "', '";var pageTitle ='];
		// let chapterPath = script.substring(script.indexOf(marks[1]) + marks[1].length, script.indexOf(marks[2]));
		// let imagesArray = script.substring(script.indexOf(marks[0]) + marks[0].length, script.indexOf(marks[1]));
		// let chapterImages = JSON.parse(imagesArray);
		// let imageUrls = chapterImages.map(url => {
		// 	return `${resHost}/${chapterPath}${url}`;
		// });
		// let links = $('div.main-btn');
		// let chapter = {
		// 	title: title,
		// 	imageUrls: imageUrls
		// };
		// return { success: true, chapter };
	};

	static search = async keywords => {
		// let url = 'http://www.gufengmh.com/search/?keywords=超人';
		// let url = `${host}/search/?keywords=${encodeURI(keywords)}`;
		// let html = await fetchHtml(url);
		// let $ = cheerio.load(html);
		// let result = $('#contList li')
		// 	.toArray()
		// 	.map(li => getComicItemBrief($(li)));
		// return { success: true, result };
	};

	static getList = async path => {
		// // let url = 'http://www.gufengmh.com/list/';
		// path = path || '/list';
		// let url = host + path;
		// let html = await fetchHtml(url);
		// let $ = cheerio.load(html);
		// let filters = $('div.page-main div.filter-nav div.filter-item')
		// 	.toArray()
		// 	.map(filter => {
		// 		let $filter = $(filter);
		// 		let label = $filter.find('label').text();
		// 		let items = $filter
		// 			.find('ul > li > a')
		// 			.toArray()
		// 			.map(a => {
		// 				let $a = $(a);
		// 				return {
		// 					text: $a.text(),
		// 					path: $a.attr('href'),
		// 					selected: $a.hasClass('active')
		// 				};
		// 			});
		// 		return { label, items };
		// 	});
		// let orderby = $('ul.orderby > li > a')
		// 	.toArray()
		// 	.map(a => {
		// 		let $a = $(a);
		// 		return {
		// 			text: $a.text(),
		// 			path: $a.attr('href'),
		// 			selected: $a.hasClass('asc') || $a.hasClass('desc')
		// 		};
		// 	});
		// filters.push({ label: '排序', items: orderby });
		// let comics = $('#contList li')
		// 	.toArray()
		// 	.map(li => getComicItemBrief($(li)));
		// let result = { filters, comics };
		// return { success: true, result };
	};
}