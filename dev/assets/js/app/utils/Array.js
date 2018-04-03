

class Array_ {
	
	
	constructor() {
		
	}
	
	
	/**
	 * Insert value(s) in a array
	 * @params {array} array: array where the value(s) will be inserted
	 * @params {int} index: index of the array
	 * @params {string, number, int or array} item: value or array of values
	 * @return {array} array: new array
	 */
	insert( array, index, item ) {
		if ( typeof item != 'object' )
			array.splice( index, 0, item );
		
		else
			item.map( ( value, i ) => {
				return array.splice( index + i, 0, value );
			} );
		
		
		return array;
	}
	
	
}


module.exports = new Array_();

