



$(document).ready(function () {
    $('.modal').modal();
    $('.datepicker').pickadate({
		selectMonths: true, // Calendario 
		selectYears: 10, //modifica el nuemero de años que aparecen como opcion 
		onStart: () => {
			$('.picker').appendTo('body');
		}
	});

	$('[data-publication]').on('click', function (event) {
		let container = document.getElementById('main');
		let type = $(event.currentTarget).data('publication');
		publish(container, type);
});
});

//EVENTS//
function Events(){
    
    var btnChat = document.getElementById("btnChat")
    var btnImagen = document.getElementById("btnImagen")
    

    btnChat.addEventListener("click", publishText);
    btnImagen.addEventListener('click', publishImage);
}


//CARD//


//ADD TEXT//

function publishText(container) {
	if (container === undefined || container === null) {
		return false;
	}
	let card = new Card('chat');
	card.addTitle();
	card.addField('message', 'P', 'flow-text')
	container.appendChild(card.content);
	cleanModal('modalChat');
	return true;
}


//CHOOSE PUBLICATION

function publish(container, type) {
	switch (type) {
	case 'text':
		{
			publishText(container);
			break;
		}
	case 'image':
		{
			publishImage(container);
			break;
		}
	case 'event':
		{
			publishEvent(container);
			break;
		}
	case 'media':
		{
			publishMedia(container);
			break;
		}
	default:
		break;
	}
}

function Card(type) {
	this.type = type;
	this.content = document.createElement('DIV');
	this.content.classList.add('card-panel', 'hoverable');
	this.content.draggable = true;

	this.addTitle = () => {
		let title = document.getElementById('modal-' + this.type + '-title').value;
		let titleLabel = document.createElement('H3');
		titleLabel.appendChild(document.createTextNode(title));
		this.content.appendChild(titleLabel);
		this.title = title;
	};

	this.addDate = () => {
		let date = document.getElementById('modal-' + this.type + '-date').value;
		let dateLabel = document.createElement('P');
		dateLabel.appendChild(document.createTextNode(date));
		this.content.appendChild(dateLabel);
};
/**
	 * 
	 * @field : info to be deploy. Required
	 * @element : html element, by defaul p
	 * @clases: classes to be added, by defaul none
	 */
	this.addField = (...args) => {
		if (args.length < 1) return null;

		let text = (document.getElementById('modal-' + this.type + '-' + args[0]) && document.getElementById('modal-' + this.type + '-' + args[0]).value) || args[0];

		let element = document.createElement(args[1] || 'P');
		element.appendChild(document.createTextNode(text));
		if (args.length >= 2) {
			for (let i = 2; i < args.length; i++) {
				typeof args[i] === 'string' && element.classList.add(args[i]);
			}
		}
		this.content.appendChild(element);
	};
}
