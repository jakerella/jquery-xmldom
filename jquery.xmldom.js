/*!
 * xmlDOM - jQuery XML DOM Plugin
 *
 * Version: 1.1
 * Released: 2010-07-21
 * Source: http://github.com/appendto/jquery-xmldom
 * Author: Jonathan Sharp (http://jdsharp.com)
 * License: MIT,GPL
 * 
 * Copyright (c) 2010 appendTo LLC.
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 */
(function($) {
	// IE DOMParser wrapper
	if ( window['DOMParser'] == undefined && window.ActiveXObject ) {
		DOMParser = function() { };
		DOMParser.prototype.parseFromString = function( xmlString ) {
			var doc = new ActiveXObject('Microsoft.XMLDOM');
	        doc.async = 'false';
	        doc.loadXML( xmlString );
			return doc;
		};
	}
	
	$.xmlDOM = function(xml, onErrorFn) {
		try {
			var xmlDoc 	= ( new DOMParser() ).parseFromString( xml, 'text/xml' );
			if ( $.isXMLDoc( xmlDoc ) ) {
				var err = $('parsererror', xmlDoc);
				if ( err.length == 1 ) {
					throw('Error: ' + $(xmlDoc).text() );
				}
			} else {
				throw('Unable to parse XML');
			}
		} catch( e ) {
			var msg = ( e.name == undefined ? e : e.name + ': ' + e.message );
			if ( $.isFunction( onErrorFn ) ) {
				onErrorFn( msg );
			} else {
				$(document).trigger('xmlParseError', [ msg ]);
			}
			return $([]);
		}
		return $( xmlDoc );
	};
})(jQuery);
