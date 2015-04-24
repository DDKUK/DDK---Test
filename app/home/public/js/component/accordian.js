ko.bindingHandlers.accordian = {
	init : function( element ){
		$( element ).accordian();
	}
}

$.fn.accordian = function( options ){
	options = options || {};
	
	var $el = $( this );
	var $panels = $el.find(".panel");
	//initialise
	$panels.find(".content").slideUp(0);

	var indexOpenPanel = -1;
	function openPanel( index, duration ){
		if( duration == undefined ){
			duration = 500;
		}
	
		if( indexOpenPanel != index ){
			indexOpenPanel = index;
			$panels.find(".content").slideUp( duration );
			$( $panels.get( indexOpenPanel ) ).find(".content").slideDown( duration );
		}
	}

	//listen for presses to open and close the items
	$panels.find("h1").click( function(){
		var index = $panels.index( $(this).parents(".panel").get(0) );
		openPanel( index );
	} );

	//set the initial state
	openPanel( options.defaultIndex || 0 , 0 );
}