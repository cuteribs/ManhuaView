import Expo from 'expo';
import LZString from 'lz-string';
import * as cheerio from 'cheerio-without-node-native';
import { Platform } from 'react-native';

const host = 'https://m.manhuagui.com';
const resHost = 'https://i.hamreus.com';

const fetchHtml = async url => {
	let userAgent = await Expo.Constants.getWebViewUserAgentAsync();
	let response = await fetch(url, { headers: { 'user-agent': userAgent } });

	if (response.status == 200) {
		let html = await response.text();
		return html;
	}

	throw new Error(response.statusText);
};

const getComicItemBrief = $li => {
	let item = {
		url: host + $li.find('> a').attr('href'),
		title: $li.find('h3').text(),
		cover: $li.find('img').data('src'),
		subTitle: $li.find('> a > p ').text()
	};
	return item;
};

export const getMainTags = async () => {
	let html = await fetchHtml(host);
	let $ = cheerio.load(html);
	let tagTitles = $('div.bar h2')
		.toArray()
		.map(h2 =>
			$(h2)
				.text()
				.trim()
		);
	let tagItems = $('div.main-list')
		.toArray()
		.map(div =>
			$(div)
				.find('li')
				.toArray()
				.map(li => getComicItemBrief($(li)))
		);
	let tags = tagTitles.map((t, i) => {
		return { title: t, items: tagItems[i] };
	});

	return { success: true, tags };
};

export const getInfo = async url => {
	let html = await fetchHtml(url);
	let $ = cheerio.load(html);
	let comic = {
		cover: $('.book-detail .thumb img').attr('src'),
		title: $('.main-bar h1')
			.text()
			.trim(),
		subTitle: $('.book-detail dl')
			.eq(0)
			.text()
			.trim(),
		descr: $('#bookIntro')
			.text()
			.trim(),
		chapters: $('#chapterList > ul > li')
			.toArray()
			.map(li => {
				let $li = $(li);
				return {
					title: $li.text().trim(),
					path: $li.find('a').attr('href')
				};
			})
	};

	return { success: true, comic };
};

export const getChapter = async path => {
	let html = await fetchHtml(host + path);
	let $ = cheerio.load(html);
	let title = $('#mangaTitle')
		.text()
		.trim();
	let script = $('#action')
		.next('script')
		.next('script')
		.html();
	const marks = ["p;}('", "'['\\x73\\x70\\x6c\\x69\\x63']", 'SMH.reader(', ').preInit();'];
	let params = script.substring(script.indexOf(marks[0]) + marks[0].length, script.indexOf(marks[1]));
	let index0 = params.indexOf("',");
	let index1 = params.indexOf(',', index0 + 2);
	let index2 = params.indexOf(",'");
	let param0 = params.substring(0, index0);
	let param1 = parseInt(params.substring(index0 + 2, index1));
	let param2 = parseInt(params.substring(index1 + 1, index2));
	let param3 = params.substring(index2 + 2);
	let unpacked = unPacker(param0, param1, param2, LZString.decompressFromBase64(param3).split('|'), 0, {});
	let result = JSON.parse(
		unpacked.substring(unpacked.indexOf(marks[2]) + marks[2].length, unpacked.indexOf(marks[3]))
	);
	let imageUrls = result.images.map(path => {
		if (Platform.OS === 'ios' && path.endsWith('.webp')) {
			path = path.replace('.webp', '');
		}
		return `${resHost}${path}?cid=${result.chapterId}&md5=${result.sl.md5}`;
	});
	let chapter = {
		title: title,
		imageUrls: imageUrls
	};
	return { success: true, chapter };
};

const unPacker = function(p, a, c, k, e, d) {
	e = function(c) {
		return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36));
	};
	if (!''.replace(/^/, String)) {
		while (c--) d[e(c)] = k[c] || e(c);
		k = [
			function(e) {
				return d[e];
			}
		];
		e = function() {
			return '\\w+';
		};
		c = 1;
	}
	while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
	return p;
};

export const search = async keywords => {
	// let url = 'https://m.manhuagui.com/s/%E5%93%A5%E5%B8%83%E6%9E%97.html';
	let url = `${host}/s/${encodeURI(keywords)}.html`;
	let html = await fetchHtml(url);
	let $ = cheerio.load(html);
	let result = $('.cont-list li')
		.toArray()
		.map(li => getComicItemBrief($(li)));
	return { success: true, result };
};

export const getList = async path => {
	// let url = 'http://www.manhuagui.com/list/';
	path = path || '/list';
	let url = host + path;
	let html = await fetchHtml(url);
	let $ = cheerio.load(html);
	let filters = $('div.page-main div.filter-nav div.filter-item')
		.toArray()
		.map(filter => {
			let $filter = $(filter);
			let label = $filter.find('label').text();
			let items = $filter
				.find('ul > li > a')
				.toArray()
				.map(a => {
					let $a = $(a);
					return {
						text: $a.text(),
						path: $a.attr('href'),
						selected: $a.hasClass('active')
					};
				});
			return { label, items };
		});
	let orderby = $('ul.orderby > li > a')
		.toArray()
		.map(a => {
			let $a = $(a);
			return {
				text: $a.text(),
				path: $a.attr('href'),
				selected: $a.hasClass('asc') || $a.hasClass('desc')
			};
		});
	filters.push({ label: '排序', items: orderby });
	let comics = $('#contList li')
		.toArray()
		.map(li => getComicItemBrief($(li)));
	let result = { filters, comics };
	return { success: true, result };
};
