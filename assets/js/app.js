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
function Events() {

    var btnChat = document.getElementById("btnChat")
    var btnImagen = document.getElementById("btnImagen")


    btnChat.addEventListener("click", publishText);
    btnImagen.addEventListener('click', publishImage);
}





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


//ADD IMAGE//

function publishImage(container) {
	if (container !== undefined && container !== null) {
		let card = new Card('image');
		card.addTitle();
		let inputFile = document.getElementById('image-file')
		loadFiles(inputFile, card.content);
		container.appendChild(card.content);
		cleanModal('modalImages');
		return true;
	}
	return false;
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

//CARD//

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


//LOAD FILES//
function loadFiles(inputFile, container) {
	if (inputFile.files.length > 0) {
		var archivo = inputFile.files[0];
		var lector = new FileReader();
		switch (archivo.type) {
		case 'image/png':
		case 'image/jpeg':
		case 'image/gif':
			lector.readAsDataURL(archivo);
			lector.onload = readImage;
			break;
		case 'text/plain':
			lector.readAsText(archivo, 'UTF-8');
			lector.onload = readText;
			break;
		case 'audio/*':
			lector.readAsArrayBuffer(archivo);
			lector.onload = readAudio;
			break;
		case 'video/mpeg':
		case 'video/mp4':
		case 'video/quicktime':
			lector.readAsArrayBuffer(archivo);
			lector.onload = readVideo;
			break;
		default:
			break;
		}
        
        
        function readImage(evento) {
		var image = new Image();
		image.src = evento.target.result;
		image.classList.add('image-responsive', 'col', 's12');
		container.appendChild(image);

}
}
};
