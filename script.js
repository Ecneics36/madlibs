// MADLIB word replace
// var finalVerbs = ['mow', 'chop', 'eat'];
// var finalStory = storyOne;

// for(var i = 0; i < finalVerbs.length; i++) {
// 	finalStory = finalStory.replace('{{verb}}',finalVerbs[i]);
// }

var verbInput = document.getElementById('verb-input');
var nounInput = document.getElementById('noun-input');
var adjectiveInput = document.getElementById('adjective-input');
var adverbInput = document.getElementById('adverb-input');
var submit = document.getElementById('submit');

//	RANDOM ELEMENT FUNCTION
function randElem(arr){
	var randomNum = Math.floor(Math.random() * arr.length);
	return arr[randomNum];
}

//	RANDOM ELEMENT FILTERED FUNCTION
function randFilteredElem(arr,filter) {
	var element = randElem(arr);
	while (element === filter) {
		element = randElem(arr);
	}
return element;
}

// COMPILE SUBMITTED WORDS INTO OBJECT
function userWords() {
	return {
		verb: verbInput.value.split(','),
		noun: nounInput.value.split(','),
		adjective: adjectiveInput.value.split(','),
		adverb: adverbInput.value.split(','),
	}
}

// REPLACE ALL SPANS OF ONE TYPE IN STORY WITH INPUT WORDS
// arrTo is the querySelectorAll list of .verb spans
// arrFrom is the user verbs
function populateWordType (arrTo, arrFrom, wordType) {
	for(var i = 0; i < arrTo.length; i++) {
		if(arrFrom.length === 1) {
			arrTo[i].innerText = randElem(wordType);
		} else {
		if(i < arrFrom.length) {
			arrTo[i].innerText = arrFrom[i];
		} else {
			arrTo[i].innerText = randElem(wordType);
		}
		// console.log('arrFrom: ' + arrFrom);
		}
	}
}

// LOOP OVER ALL WORD TYPES FOR REPLACEMENT
function populateStory (storyId) {
	var speechTypes = ['verb', 'noun', 'adjective', 'adverb'];
	var fillIn = [];
	var userInput = userWords();
	for(i = 0; i < speechTypes.length; i++) {
		fillIn = document.querySelectorAll('#' + storyId + ' .' + speechTypes[i]);
		populateWordType(fillIn, userInput[speechTypes[i]], speechParts[speechTypes[i]]);
		// console.log('speechTypes: ' + speechTypes[i]);
		// console.log('fillIn: ' + fillIn.entries);
		// console.log('userInput: ' + userInput[speechTypes[i]]);
		// console.log(fillIn);
	}
}

// SUBMIT BUTTON CLICK EVENT
submit.addEventListener('click', function(event) {
	var selectedStory = document.getElementById('story-one');
	var stories = document.querySelectorAll('#stories > div');
	if(document.getElementById('story-one-button').checked === true) {
		selectedStory = document.getElementById('story-one');
	} else if(document.getElementById('story-two-button').checked === true) {
		selectedStory = document.getElementById('story-two');
	} else if(document.getElementById('story-three-button').checked === true) {
		selectedStory = document.getElementById('story-three');
	} else {
		document.getElementById('stories').innerHTML = '<h1>Please select a story to Madlib</h1>';
	}
	populateStory(selectedStory.id);
	for(i = 0; i < stories.length; i++) {
		stories[i].style.display = 'none';
	}
	selectedStory.style.display = 'flex';
});
