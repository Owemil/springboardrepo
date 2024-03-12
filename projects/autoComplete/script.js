const input = document.querySelector('#fruit');
const sugVal = document.querySelectorAll('.suggestions ul li')
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	// let results = [];
	console.log(str)
	let results = fruit.filter((v) => v.toLowerCase().includes(str))
	// TODO
	console.log(results)
	return showSuggestions(results);
}

function searchHandler(e) {
	const inputVal = e.target.value
	e.preventDefault();
	console.log(inputVal)
	search(inputVal)
}

function showSuggestions(results, inputVal) {
	suggestions.innerHTML = ''
	results.forEach((v) => {
		let newLi = document.createElement('li')
		newLi.innerText = v
		suggestions.append(newLi)
	})
	if (input.value === '') suggestions.innerHTML = ''
	// TODO
}

function useSuggestion(e) {
	let target = e.target
	input.value = target.innerText
	console.log(target.innerText)
	suggestions.innerHTML = ''
	// TODO
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);