/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var proxyquire = require( 'proxyquire' );
var Float64Array = require( '@stdlib/array-float64' );
var Uint8Array = require( '@stdlib/array-uint8' );
var Complex64Array = require( '@stdlib/array-complex64' );
var Complex128Array = require( '@stdlib/array-complex128' );
var BooleanArray = require( '@stdlib/array-bool' );
var Complex64 = require( '@stdlib/complex-float32-ctor' );
var Complex128 = require( '@stdlib/complex-float64-ctor' );
var hasOwnProp = require( '@stdlib/assert-has-own-property' );
var hasProp = require( '@stdlib/assert-has-property' );
var instanceOf = require( '@stdlib/assert-instance-of' );
var isFunction = require( '@stdlib/assert-is-function' );
var isPositiveInteger = require( '@stdlib/assert-is-positive-integer' ).isPrimitive;
var isNonNegativeInteger = require( '@stdlib/assert-is-nonnegative-integer' ).isPrimitive;
var isPlainObject = require( '@stdlib/assert-is-plain-object' );
var isDataView = require( '@stdlib/assert-is-dataview' );
var IS_LITTLE_ENDIAN = require( '@stdlib/assert-is-little-endian' );
var real = require( '@stdlib/complex-float64-real' );
var imag = require( '@stdlib/complex-float64-imag' );
var dtypes = require( '@stdlib/ndarray-dtypes' ).enum;
var modes = require( '@stdlib/ndarray-index-modes' ).enum;
var orders = require( '@stdlib/ndarray-orders' ).enum;
var ndarray = require( './../lib' );


// VARIABLES //

var DTYPES = dtypes();
var MODES = modes();
var ORDERS = orders();


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof ndarray, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function is an ndarray constructor', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = new ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( instanceOf( arr, ndarray ), true, 'returns an instance' );
	t.end();
});

tape( 'the constructor does not require the `new` keyword', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( instanceOf( arr, ndarray ), true, 'returns an instance' );
	t.end();
});

tape( 'the function supports creating zero-dimensional ndarrays', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0 ];
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 0;

	arr = new ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( instanceOf( arr, ndarray ), true, 'returns an instance' );
	t.end();
});

tape( 'an ndarray has a `byteLength` property specifying the size (in bytes) of the array (typed)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'byteLength' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'byteLength' ), true, 'has property' );
	t.strictEqual( isNonNegativeInteger( arr.byteLength ), true, 'is a nonnegative integer' );
	t.strictEqual( arr.byteLength, 8*buffer.length, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `byteLength` property specifying the size (in bytes) of the array (complex typed)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'byteLength' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'byteLength' ), true, 'has property' );
	t.strictEqual( isNonNegativeInteger( arr.byteLength ), true, 'is a nonnegative integer' );
	t.strictEqual( arr.byteLength, 8*buffer.length, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `byteLength` property specifying the size (in bytes) of the array (typed; 0d)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0 ] );
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'byteLength' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'byteLength' ), true, 'has property' );
	t.strictEqual( isNonNegativeInteger( arr.byteLength ), true, 'is a nonnegative integer' );
	t.strictEqual( arr.byteLength, 8*buffer.length, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `byteLength` property specifying the size (in bytes) of the array (complex typed; 0d)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0 ] );
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'byteLength' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'byteLength' ), true, 'has property' );
	t.strictEqual( isNonNegativeInteger( arr.byteLength ), true, 'is a nonnegative integer' );
	t.strictEqual( arr.byteLength, 8*buffer.length, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `byteLength` property specifying the size (in bytes) of an array (generic)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'byteLength' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'byteLength' ), true, 'has property' );
	t.strictEqual( arr.byteLength, null, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `byteLength` property specifying the size (in bytes) of an array (generic; 0d)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0 ];
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'byteLength' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'byteLength' ), true, 'has property' );
	t.strictEqual( arr.byteLength, null, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `BYTES_PER_ELEMENT` property specifying the size (in bytes) of each array element (typed)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'BYTES_PER_ELEMENT' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'BYTES_PER_ELEMENT' ), true, 'has property' );
	t.strictEqual( isPositiveInteger( arr.BYTES_PER_ELEMENT ), true, 'is a positive integer' );
	t.strictEqual( arr.BYTES_PER_ELEMENT, 8, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `BYTES_PER_ELEMENT` property specifying the size (in bytes) of each array element (complex typed)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'BYTES_PER_ELEMENT' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'BYTES_PER_ELEMENT' ), true, 'has property' );
	t.strictEqual( isPositiveInteger( arr.BYTES_PER_ELEMENT ), true, 'is a positive integer' );
	t.strictEqual( arr.BYTES_PER_ELEMENT, 8, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `BYTES_PER_ELEMENT` property specifying the size (in bytes) of each array element (typed; 0d)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0 ] );
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'BYTES_PER_ELEMENT' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'BYTES_PER_ELEMENT' ), true, 'has property' );
	t.strictEqual( isPositiveInteger( arr.BYTES_PER_ELEMENT ), true, 'is a positive integer' );
	t.strictEqual( arr.BYTES_PER_ELEMENT, 8, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `BYTES_PER_ELEMENT` property specifying the size (in bytes) of each array element (complex typed; 0d)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0 ] );
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'BYTES_PER_ELEMENT' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'BYTES_PER_ELEMENT' ), true, 'has property' );
	t.strictEqual( isPositiveInteger( arr.BYTES_PER_ELEMENT ), true, 'is a positive integer' );
	t.strictEqual( arr.BYTES_PER_ELEMENT, 8, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `BYTES_PER_ELEMENT` property specifying the size (in bytes) of each array element (generic)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'BYTES_PER_ELEMENT' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'BYTES_PER_ELEMENT' ), true, 'has property' );
	t.strictEqual( arr.BYTES_PER_ELEMENT, null, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `BYTES_PER_ELEMENT` property specifying the size (in bytes) of each array element (generic; 0d)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0 ];
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'BYTES_PER_ELEMENT' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'BYTES_PER_ELEMENT' ), true, 'has property' );
	t.strictEqual( arr.BYTES_PER_ELEMENT, null, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `data` property pointing to the underlying data buffer', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'data' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'data' ), true, 'has property' );
	t.strictEqual( arr.data, buffer, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `data` property pointing to the underlying data buffer (complex typed)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'data' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'data' ), true, 'has property' );
	t.strictEqual( arr.data, buffer, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `data` property pointing to the underlying data buffer (0d)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0 ] );
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'data' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'data' ), true, 'has property' );
	t.strictEqual( arr.data, buffer, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `dtype` property specifying the underlying data type', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'dtype' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'dtype' ), true, 'has property' );
	t.strictEqual( arr.dtype, dtype, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `dtype` property specifying the underlying data type (complex typed)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'dtype' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'dtype' ), true, 'has property' );
	t.strictEqual( arr.dtype, dtype, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `dtype` property specifying the underlying data type (0d)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0 ] );
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'dtype' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'dtype' ), true, 'has property' );
	t.strictEqual( arr.dtype, dtype, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `flags` property providing meta information, such as information concerning the memory layout of the array (row-major contiguous)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'flags' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'flags' ), true, 'has property' );
	t.strictEqual( isPlainObject( arr.flags ), true, 'is an object' );

	t.strictEqual( hasOwnProp( arr.flags, 'ROW_MAJOR_CONTIGUOUS' ), true, 'has own property' );
	t.strictEqual( arr.flags.ROW_MAJOR_CONTIGUOUS, true, 'has expected value' );

	t.strictEqual( hasOwnProp( arr.flags, 'COLUMN_MAJOR_CONTIGUOUS' ), true, 'has own property' );
	t.strictEqual( arr.flags.COLUMN_MAJOR_CONTIGUOUS, false, 'has expected value' );

	t.end();
});

tape( 'an ndarray has a `flags` property providing meta information, such as information concerning the memory layout of the array (column-major contiguous)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ 1, 2 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'flags' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'flags' ), true, 'has property' );
	t.strictEqual( isPlainObject( arr.flags ), true, 'is an object' );

	t.strictEqual( hasOwnProp( arr.flags, 'ROW_MAJOR_CONTIGUOUS' ), true, 'has own property' );
	t.strictEqual( arr.flags.ROW_MAJOR_CONTIGUOUS, false, 'has expected value' );

	t.strictEqual( hasOwnProp( arr.flags, 'COLUMN_MAJOR_CONTIGUOUS' ), true, 'has own property' );
	t.strictEqual( arr.flags.COLUMN_MAJOR_CONTIGUOUS, true, 'has expected value' );

	t.end();
});

tape( 'an ndarray has a `flags` property providing meta information, such as information concerning the memory layout of the array (row-major and column-major contiguous)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 4 ];
	order = 'row-major';
	strides = [ 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'flags' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'flags' ), true, 'has property' );
	t.strictEqual( isPlainObject( arr.flags ), true, 'is an object' );

	t.strictEqual( hasOwnProp( arr.flags, 'ROW_MAJOR_CONTIGUOUS' ), true, 'has own property' );
	t.strictEqual( arr.flags.ROW_MAJOR_CONTIGUOUS, true, 'has expected value' );

	t.strictEqual( hasOwnProp( arr.flags, 'COLUMN_MAJOR_CONTIGUOUS' ), true, 'has own property' );
	t.strictEqual( arr.flags.COLUMN_MAJOR_CONTIGUOUS, true, 'has expected value' );

	t.end();
});

tape( 'an ndarray has a `flags` property providing meta information, such as information concerning the memory layout of the array (row-major and column-major contiguous; 0d)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0 ] );
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'flags' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'flags' ), true, 'has property' );
	t.strictEqual( isPlainObject( arr.flags ), true, 'is an object' );

	t.strictEqual( hasOwnProp( arr.flags, 'ROW_MAJOR_CONTIGUOUS' ), true, 'has own property' );
	t.strictEqual( arr.flags.ROW_MAJOR_CONTIGUOUS, true, 'has expected value' );

	t.strictEqual( hasOwnProp( arr.flags, 'COLUMN_MAJOR_CONTIGUOUS' ), true, 'has own property' );
	t.strictEqual( arr.flags.COLUMN_MAJOR_CONTIGUOUS, true, 'has expected value' );

	t.end();
});

tape( 'an ndarray has a `flags` property providing meta information, such as information concerning the memory layout the array (neither row-major nor column-major contiguous)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1, 2, 3, 4, 5, 6, 7, 8 ] );
	shape = [ 2, 2, 2 ];
	order = 'column-major';
	strides = [ 4, 1, 2 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'flags' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'flags' ), true, 'has property' );
	t.strictEqual( isPlainObject( arr.flags ), true, 'is an object' );

	t.strictEqual( hasOwnProp( arr.flags, 'ROW_MAJOR_CONTIGUOUS' ), true, 'has own property' );
	t.strictEqual( arr.flags.ROW_MAJOR_CONTIGUOUS, false, 'has expected value' );

	t.strictEqual( hasOwnProp( arr.flags, 'COLUMN_MAJOR_CONTIGUOUS' ), true, 'has own property' );
	t.strictEqual( arr.flags.COLUMN_MAJOR_CONTIGUOUS, false, 'has expected value' );

	t.end();
});

tape( 'an ndarray has a `length` property specifying the number of array elements', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'length' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'length' ), true, 'has property' );
	t.strictEqual( isNonNegativeInteger( arr.length ), true, 'is a nonnegative integer' );
	t.strictEqual( arr.length, buffer.length, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `length` property specifying the number of array elements (complex typed)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'length' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'length' ), true, 'has property' );
	t.strictEqual( isNonNegativeInteger( arr.length ), true, 'is a nonnegative integer' );
	t.strictEqual( arr.length, buffer.length, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `length` property specifying the number of array elements (0d)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0 ] );
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'length' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'length' ), true, 'has property' );
	t.strictEqual( isNonNegativeInteger( arr.length ), true, 'is a nonnegative integer' );
	t.strictEqual( arr.length, buffer.length, 'has expected value' );
	t.end();
});

tape( 'an ndarray has an `ndims` property specifying the number of array dimensions', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'ndims' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'ndims' ), true, 'has property' );
	t.strictEqual( isPositiveInteger( arr.ndims ), true, 'is a positive integer' );
	t.strictEqual( arr.ndims, shape.length, 'has expected value' );
	t.end();
});

tape( 'an ndarray has an `ndims` property specifying the number of array dimensions (0d)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0 ] );
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'ndims' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'ndims' ), true, 'has property' );
	t.strictEqual( arr.ndims, shape.length, 'has expected value' );
	t.end();
});

tape( 'an ndarray has an `offset` property specifying the location of the first indexed element', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'offset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'offset' ), true, 'has property' );
	t.strictEqual( isNonNegativeInteger( arr.offset ), true, 'is a nonnegative integer' );
	t.strictEqual( arr.offset, offset, 'has expected value' );
	t.end();
});

tape( 'an ndarray has an `offset` property specifying the location of the first indexed element (complex typed)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0 ] ); // eslint-disable-line max-len
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'offset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'offset' ), true, 'has property' );
	t.strictEqual( isNonNegativeInteger( arr.offset ), true, 'is a nonnegative integer' );
	t.strictEqual( arr.offset, offset, 'has expected value' );
	t.end();
});

tape( 'an ndarray has an `offset` property specifying the location of the first indexed element (0d)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0 ] );
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'offset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'offset' ), true, 'has property' );
	t.strictEqual( isNonNegativeInteger( arr.offset ), true, 'is a nonnegative integer' );
	t.strictEqual( arr.offset, offset, 'has expected value' );
	t.end();
});

tape( 'an ndarray has an `order` property specifying the array order (row-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'order' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'order' ), true, 'has property' );
	t.strictEqual( arr.order, order, 'has expected value' );
	t.end();
});

tape( 'an ndarray has an `order` property specifying the array order (row-major; 0d)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0 ] );
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'order' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'order' ), true, 'has property' );
	t.strictEqual( arr.order, order, 'has expected value' );
	t.end();
});

tape( 'an ndarray has an `order` property specifying the array order (column-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ 1, 2 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'order' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'order' ), true, 'has property' );
	t.strictEqual( arr.order, order, 'has expected value' );
	t.end();
});

tape( 'an ndarray has an `order` property specifying the array order (column-major; 0d)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0 ] );
	shape = [];
	order = 'column-major';
	strides = [ 0 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'order' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'order' ), true, 'has property' );
	t.strictEqual( arr.order, order, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `shape` property specifying the array shape (dimensions)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ 1, 2 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'shape' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'shape' ), true, 'has property' );
	t.notEqual( arr.shape, shape, 'returns a copy' );
	t.deepEqual( arr.shape, shape, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `shape` property specifying the array shape (0d)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0 ] );
	shape = [];
	order = 'column-major';
	strides = [ 0 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'shape' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'shape' ), true, 'has property' );
	t.notEqual( arr.shape, shape, 'returns a copy' );
	t.deepEqual( arr.shape, shape, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `strides` property specifying how to access array elements along corresponding dimensions', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ 1, 2 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'strides' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'strides' ), true, 'has property' );
	t.notEqual( arr.strides, strides, 'returns a copy' );
	t.deepEqual( arr.strides, strides, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `strides` property specifying how to access array elements along corresponding dimensions (0d)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0 ] );
	shape = [];
	order = 'column-major';
	strides = [ 0 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'strides' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'strides' ), true, 'has property' );
	t.notEqual( arr.strides, strides, 'returns a copy' );
	t.deepEqual( arr.strides, strides, 'has expected value' );
	t.end();
});

tape( 'an ndarray has a `get` method for retrieving an array element using subscripts (row-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'get' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'get' ), true, 'has property' );
	t.strictEqual( isFunction( arr.get ), true, 'has method' );

	t.strictEqual( arr.get( 0, 0 ), 1.0, 'returns expected value' );
	t.strictEqual( arr.get( 0, 1 ), 2.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 0 ), 3.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 1 ), 4.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a `get` method for retrieving an array element using subscripts (row-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, -1 ];
	offset = 1;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'get' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'get' ), true, 'has property' );
	t.strictEqual( isFunction( arr.get ), true, 'has method' );

	t.strictEqual( arr.get( 0, 0 ), 2.0, 'returns expected value' );
	t.strictEqual( arr.get( 0, 1 ), 1.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 0 ), 4.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 1 ), 3.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a `get` method for retrieving an array element using subscripts (row-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ -2, 1 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'get' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'get' ), true, 'has property' );
	t.strictEqual( isFunction( arr.get ), true, 'has method' );

	t.strictEqual( arr.get( 0, 0 ), 3.0, 'returns expected value' );
	t.strictEqual( arr.get( 0, 1 ), 4.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 0 ), 1.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 1 ), 2.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a `get` method for retrieving an array element using subscripts (row-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ -2, -1 ];
	offset = 3;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'get' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'get' ), true, 'has property' );
	t.strictEqual( isFunction( arr.get ), true, 'has method' );

	t.strictEqual( arr.get( 0, 0 ), 4.0, 'returns expected value' );
	t.strictEqual( arr.get( 0, 1 ), 3.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 0 ), 2.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 1 ), 1.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a `get` method for retrieving an array element using subscripts (row-major; complex dtype)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var v;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'get' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'get' ), true, 'has property' );
	t.strictEqual( isFunction( arr.get ), true, 'has method' );

	v = arr.get( 0, 0 );
	t.strictEqual( real( v ), 1.0, 'returns expected value' );
	t.strictEqual( imag( v ), 2.0, 'returns expected value' );
	v = arr.get( 0, 1 );
	t.strictEqual( real( v ), 3.0, 'returns expected value' );
	t.strictEqual( imag( v ), 4.0, 'returns expected value' );
	v = arr.get( 1, 0 );
	t.strictEqual( real( v ), 5.0, 'returns expected value' );
	t.strictEqual( imag( v ), 6.0, 'returns expected value' );
	v = arr.get( 1, 1 );
	t.strictEqual( real( v ), 7.0, 'returns expected value' );
	t.strictEqual( imag( v ), 8.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a `get` method for retrieving an array element using subscripts (column-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ 1, 2 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'get' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'get' ), true, 'has property' );
	t.strictEqual( isFunction( arr.get ), true, 'has method' );

	t.strictEqual( arr.get( 0, 0 ), 1.0, 'returns expected value' );
	t.strictEqual( arr.get( 0, 1 ), 3.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 0 ), 2.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 1 ), 4.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a `get` method for retrieving an array element using subscripts (column-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ -1, 2 ];
	offset = 1;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'get' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'get' ), true, 'has property' );
	t.strictEqual( isFunction( arr.get ), true, 'has method' );

	t.strictEqual( arr.get( 0, 0 ), 2.0, 'returns expected value' );
	t.strictEqual( arr.get( 0, 1 ), 4.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 0 ), 1.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 1 ), 3.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a `get` method for retrieving an array element using subscripts (column-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ 1, -2 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'get' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'get' ), true, 'has property' );
	t.strictEqual( isFunction( arr.get ), true, 'has method' );

	t.strictEqual( arr.get( 0, 0 ), 3.0, 'returns expected value' );
	t.strictEqual( arr.get( 0, 1 ), 1.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 0 ), 4.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 1 ), 2.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a `get` method for retrieving an array element using subscripts (column-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ -1, -2 ];
	offset = 3;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'get' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'get' ), true, 'has property' );
	t.strictEqual( isFunction( arr.get ), true, 'has method' );

	t.strictEqual( arr.get( 0, 0 ), 4.0, 'returns expected value' );
	t.strictEqual( arr.get( 0, 1 ), 2.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 0 ), 3.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 1 ), 1.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a `get` method for retrieving an array element using subscripts (column-major; complex dtype)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var v;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ 1, 2 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'get' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'get' ), true, 'has property' );
	t.strictEqual( isFunction( arr.get ), true, 'has method' );

	v = arr.get( 0, 0 );
	t.strictEqual( real( v ), 1.0, 'returns expected value' );
	t.strictEqual( imag( v ), 2.0, 'returns expected value' );
	v = arr.get( 0, 1 );
	t.strictEqual( real( v ), 5.0, 'returns expected value' );
	t.strictEqual( imag( v ), 6.0, 'returns expected value' );
	v = arr.get( 1, 0 );
	t.strictEqual( real( v ), 3.0, 'returns expected value' );
	t.strictEqual( imag( v ), 4.0, 'returns expected value' );
	v = arr.get( 1, 1 );
	t.strictEqual( real( v ), 7.0, 'returns expected value' );
	t.strictEqual( imag( v ), 8.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a `get` method for retrieving an array element using subscripts (0d)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0 ] );
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 3;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'get' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'get' ), true, 'has property' );
	t.strictEqual( isFunction( arr.get ), true, 'has method' );

	t.strictEqual( arr.get(), 4.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has an `iget` method for retrieving an array element using a linear index (row-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iget' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iget' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iget ), true, 'has method' );

	t.strictEqual( arr.iget( 0 ), 1.0, 'returns expected value' );
	t.strictEqual( arr.iget( 1 ), 2.0, 'returns expected value' );
	t.strictEqual( arr.iget( 2 ), 3.0, 'returns expected value' );
	t.strictEqual( arr.iget( 3 ), 4.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has an `iget` method for retrieving an array element using a linear index (row-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, -1 ];
	offset = 1;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iget' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iget' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iget ), true, 'has method' );

	t.strictEqual( arr.iget( 0 ), 2.0, 'returns expected value' );
	t.strictEqual( arr.iget( 1 ), 1.0, 'returns expected value' );
	t.strictEqual( arr.iget( 2 ), 4.0, 'returns expected value' );
	t.strictEqual( arr.iget( 3 ), 3.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has an `iget` method for retrieving an array element using a linear index (row-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ -2, 1 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iget' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iget' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iget ), true, 'has method' );

	t.strictEqual( arr.iget( 0 ), 3.0, 'returns expected value' );
	t.strictEqual( arr.iget( 1 ), 4.0, 'returns expected value' );
	t.strictEqual( arr.iget( 2 ), 1.0, 'returns expected value' );
	t.strictEqual( arr.iget( 3 ), 2.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has an `iget` method for retrieving an array element using a linear index (row-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ -2, -1 ];
	offset = 3;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iget' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iget' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iget ), true, 'has method' );

	t.strictEqual( arr.iget( 0 ), 4.0, 'returns expected value' );
	t.strictEqual( arr.iget( 1 ), 3.0, 'returns expected value' );
	t.strictEqual( arr.iget( 2 ), 2.0, 'returns expected value' );
	t.strictEqual( arr.iget( 3 ), 1.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has an `iget` method for retrieving an array element using a linear index (row-major; noncontiguous)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2, 1 ];
	order = 'row-major';
	strides = [ 4, 1, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iget' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iget' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iget ), true, 'has method' );

	t.strictEqual( arr.iget( 0 ), 1.0, 'returns expected value' );
	t.strictEqual( arr.iget( 1 ), 2.0, 'returns expected value' );
	t.strictEqual( arr.iget( 2 ), 5.0, 'returns expected value' );
	t.strictEqual( arr.iget( 3 ), 6.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has an `iget` method for retrieving an array element using a linear index (row-major; complex type)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var v;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iget' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iget' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iget ), true, 'has method' );

	v = arr.iget( 0 );
	t.strictEqual( real( v ), 1.0, 'returns expected value' );
	t.strictEqual( imag( v ), 2.0, 'returns expected value' );
	v = arr.iget( 1 );
	t.strictEqual( real( v ), 3.0, 'returns expected value' );
	t.strictEqual( imag( v ), 4.0, 'returns expected value' );
	v = arr.iget( 2 );
	t.strictEqual( real( v ), 5.0, 'returns expected value' );
	t.strictEqual( imag( v ), 6.0, 'returns expected value' );
	v = arr.iget( 3 );
	t.strictEqual( real( v ), 7.0, 'returns expected value' );
	t.strictEqual( imag( v ), 8.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has an `iget` method for retrieving an array element using a linear index (row-major; complex type)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var v;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ -2, 1 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iget' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iget' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iget ), true, 'has method' );

	v = arr.iget( 0 );
	t.strictEqual( real( v ), 5.0, 'returns expected value' );
	t.strictEqual( imag( v ), 6.0, 'returns expected value' );
	v = arr.iget( 1 );
	t.strictEqual( real( v ), 7.0, 'returns expected value' );
	t.strictEqual( imag( v ), 8.0, 'returns expected value' );
	v = arr.iget( 2 );
	t.strictEqual( real( v ), 1.0, 'returns expected value' );
	t.strictEqual( imag( v ), 2.0, 'returns expected value' );
	v = arr.iget( 3 );
	t.strictEqual( real( v ), 3.0, 'returns expected value' );
	t.strictEqual( imag( v ), 4.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has an `iget` method for retrieving an array element using a linear index (row-major; complex type)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var v;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ -2, -1 ];
	offset = 3;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iget' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iget' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iget ), true, 'has method' );

	v = arr.iget( 0 );
	t.strictEqual( real( v ), 7.0, 'returns expected value' );
	t.strictEqual( imag( v ), 8.0, 'returns expected value' );
	v = arr.iget( 1 );
	t.strictEqual( real( v ), 5.0, 'returns expected value' );
	t.strictEqual( imag( v ), 6.0, 'returns expected value' );
	v = arr.iget( 2 );
	t.strictEqual( real( v ), 3.0, 'returns expected value' );
	t.strictEqual( imag( v ), 4.0, 'returns expected value' );
	v = arr.iget( 3 );
	t.strictEqual( real( v ), 1.0, 'returns expected value' );
	t.strictEqual( imag( v ), 2.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has an `iget` method for retrieving an array element using a linear index (row-major; noncontiguous; complex type)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var v;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0 ] ); // eslint-disable-line max-len
	shape = [ 2, 2, 1 ];
	order = 'row-major';
	strides = [ 4, 1, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iget' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iget' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iget ), true, 'has method' );

	v = arr.iget( 0 );
	t.strictEqual( real( v ), 1.0, 'returns expected value' );
	t.strictEqual( imag( v ), 2.0, 'returns expected value' );
	v = arr.iget( 1 );
	t.strictEqual( real( v ), 3.0, 'returns expected value' );
	t.strictEqual( imag( v ), 4.0, 'returns expected value' );
	v = arr.iget( 2 );
	t.strictEqual( real( v ), 9.0, 'returns expected value' );
	t.strictEqual( imag( v ), 10.0, 'returns expected value' );
	v = arr.iget( 3 );
	t.strictEqual( real( v ), 11.0, 'returns expected value' );
	t.strictEqual( imag( v ), 12.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has an `iget` method for retrieving an array element using a linear index (column-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ 1, 2 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iget' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iget' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iget ), true, 'has method' );

	t.strictEqual( arr.iget( 0 ), 1.0, 'returns expected value' );
	t.strictEqual( arr.iget( 1 ), 2.0, 'returns expected value' );
	t.strictEqual( arr.iget( 2 ), 3.0, 'returns expected value' );
	t.strictEqual( arr.iget( 3 ), 4.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has an `iget` method for retrieving an array element using a linear index (column-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ -1, 2 ];
	offset = 1;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iget' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iget' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iget ), true, 'has method' );

	t.strictEqual( arr.iget( 0 ), 2.0, 'returns expected value' );
	t.strictEqual( arr.iget( 1 ), 1.0, 'returns expected value' );
	t.strictEqual( arr.iget( 2 ), 4.0, 'returns expected value' );
	t.strictEqual( arr.iget( 3 ), 3.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has an `iget` method for retrieving an array element using a linear index (column-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ 1, -2 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iget' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iget' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iget ), true, 'has method' );

	t.strictEqual( arr.iget( 0 ), 3.0, 'returns expected value' );
	t.strictEqual( arr.iget( 1 ), 4.0, 'returns expected value' );
	t.strictEqual( arr.iget( 2 ), 1.0, 'returns expected value' );
	t.strictEqual( arr.iget( 3 ), 2.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has an `iget` method for retrieving an array element using a linear index (column-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ -1, -2 ];
	offset = 3;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iget' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iget' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iget ), true, 'has method' );

	t.strictEqual( arr.iget( 0 ), 4.0, 'returns expected value' );
	t.strictEqual( arr.iget( 1 ), 3.0, 'returns expected value' );
	t.strictEqual( arr.iget( 2 ), 2.0, 'returns expected value' );
	t.strictEqual( arr.iget( 3 ), 1.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has an `iget` method for retrieving an array element using a linear index (column-major; noncontiguous)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2, 1 ];
	order = 'column-major';
	strides = [ 1, 4, 8 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iget' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iget' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iget ), true, 'has method' );

	t.strictEqual( arr.iget( 0 ), 1.0, 'returns expected value' );
	t.strictEqual( arr.iget( 1 ), 2.0, 'returns expected value' );
	t.strictEqual( arr.iget( 2 ), 5.0, 'returns expected value' );
	t.strictEqual( arr.iget( 3 ), 6.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has an `iget` method for retrieving an array element using a linear index (column-major; complex type)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var v;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ 1, 2 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iget' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iget' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iget ), true, 'has method' );

	v = arr.iget( 0 );
	t.strictEqual( real( v ), 1.0, 'returns expected value' );
	t.strictEqual( imag( v ), 2.0, 'returns expected value' );
	v = arr.iget( 1 );
	t.strictEqual( real( v ), 3.0, 'returns expected value' );
	t.strictEqual( imag( v ), 4.0, 'returns expected value' );
	v = arr.iget( 2 );
	t.strictEqual( real( v ), 5.0, 'returns expected value' );
	t.strictEqual( imag( v ), 6.0, 'returns expected value' );
	v = arr.iget( 3 );
	t.strictEqual( real( v ), 7.0, 'returns expected value' );
	t.strictEqual( imag( v ), 8.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has an `iget` method for retrieving an array element using a linear index (column-major; complex type)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var v;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ 1, -2 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iget' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iget' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iget ), true, 'has method' );

	v = arr.iget( 0 );
	t.strictEqual( real( v ), 5.0, 'returns expected value' );
	t.strictEqual( imag( v ), 6.0, 'returns expected value' );
	v = arr.iget( 1 );
	t.strictEqual( real( v ), 7.0, 'returns expected value' );
	t.strictEqual( imag( v ), 8.0, 'returns expected value' );
	v = arr.iget( 2 );
	t.strictEqual( real( v ), 1.0, 'returns expected value' );
	t.strictEqual( imag( v ), 2.0, 'returns expected value' );
	v = arr.iget( 3 );
	t.strictEqual( real( v ), 3.0, 'returns expected value' );
	t.strictEqual( imag( v ), 4.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has an `iget` method for retrieving an array element using a linear index (column-major; complex type)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var v;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ -1, -2 ];
	offset = 3;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iget' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iget' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iget ), true, 'has method' );

	v = arr.iget( 0 );
	t.strictEqual( real( v ), 7.0, 'returns expected value' );
	t.strictEqual( imag( v ), 8.0, 'returns expected value' );
	v = arr.iget( 1 );
	t.strictEqual( real( v ), 5.0, 'returns expected value' );
	t.strictEqual( imag( v ), 6.0, 'returns expected value' );
	v = arr.iget( 2 );
	t.strictEqual( real( v ), 3.0, 'returns expected value' );
	t.strictEqual( imag( v ), 4.0, 'returns expected value' );
	v = arr.iget( 3 );
	t.strictEqual( real( v ), 1.0, 'returns expected value' );
	t.strictEqual( imag( v ), 2.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has an `iget` method for retrieving an array element using a linear index (column-major; noncontiguous; complex type)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var v;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0 ] ); // eslint-disable-line max-len
	shape = [ 2, 2, 1 ];
	order = 'column-major';
	strides = [ 1, 4, 8 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iget' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iget' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iget ), true, 'has method' );

	v = arr.iget( 0 );
	t.strictEqual( real( v ), 1.0, 'returns expected value' );
	t.strictEqual( imag( v ), 2.0, 'returns expected value' );
	v = arr.iget( 1 );
	t.strictEqual( real( v ), 3.0, 'returns expected value' );
	t.strictEqual( imag( v ), 4.0, 'returns expected value' );
	v = arr.iget( 2 );
	t.strictEqual( real( v ), 9.0, 'returns expected value' );
	t.strictEqual( imag( v ), 10.0, 'returns expected value' );
	v = arr.iget( 3 );
	t.strictEqual( real( v ), 11.0, 'returns expected value' );
	t.strictEqual( imag( v ), 12.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has an `iget` method for retrieving an array element using a linear index (0d)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0 ] );
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iget' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iget' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iget ), true, 'has method' );

	t.strictEqual( arr.iget(), 3.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has an `iget` method for retrieving an array element using a linear index (0d; complex type)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var v;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iget' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iget' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iget ), true, 'has method' );

	v = arr.iget();
	t.strictEqual( real( v ), 5.0, 'returns expected value' );
	t.strictEqual( imag( v ), 6.0, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a `set` method for setting an array element using subscripts (row-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'set' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'set' ), true, 'has property' );
	t.strictEqual( isFunction( arr.set ), true, 'has method' );

	arr.set( 0, 0, 5.0 );
	arr.set( 0, 1, 6.0 );
	arr.set( 1, 0, 7.0 );
	arr.set( 1, 1, 8.0 );

	t.strictEqual( arr.get( 0, 0 ), 5.0, 'returns expected value' );
	t.strictEqual( arr.get( 0, 1 ), 6.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 0 ), 7.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 1 ), 8.0, 'returns expected value' );

	t.deepEqual( buffer, [ 5.0, 6.0, 7.0, 8.0 ], 'has expected values' );

	t.end();
});

tape( 'an ndarray has a `set` method for setting an array element using subscripts (row-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, -1 ];
	offset = 1;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'set' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'set' ), true, 'has property' );
	t.strictEqual( isFunction( arr.set ), true, 'has method' );

	arr.set( 0, 0, 5.0 );
	arr.set( 0, 1, 6.0 );
	arr.set( 1, 0, 7.0 );
	arr.set( 1, 1, 8.0 );

	t.strictEqual( arr.get( 0, 0 ), 5.0, 'returns expected value' );
	t.strictEqual( arr.get( 0, 1 ), 6.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 0 ), 7.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 1 ), 8.0, 'returns expected value' );

	t.deepEqual( buffer, [ 6.0, 5.0, 8.0, 7.0 ], 'has expected values' );

	t.end();
});

tape( 'an ndarray has a `set` method for setting an array element using subscripts (row-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ -2, 1 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'set' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'set' ), true, 'has property' );
	t.strictEqual( isFunction( arr.set ), true, 'has method' );

	arr.set( 0, 0, 5.0 );
	arr.set( 0, 1, 6.0 );
	arr.set( 1, 0, 7.0 );
	arr.set( 1, 1, 8.0 );

	t.strictEqual( arr.get( 0, 0 ), 5.0, 'returns expected value' );
	t.strictEqual( arr.get( 0, 1 ), 6.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 0 ), 7.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 1 ), 8.0, 'returns expected value' );

	t.deepEqual( buffer, [ 7.0, 8.0, 5.0, 6.0 ], 'has expected values' );

	t.end();
});

tape( 'an ndarray has a `set` method for setting an array element using subscripts (row-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ -2, -1 ];
	offset = 3;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'set' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'set' ), true, 'has property' );
	t.strictEqual( isFunction( arr.set ), true, 'has method' );

	arr.set( 0, 0, 5.0 );
	arr.set( 0, 1, 6.0 );
	arr.set( 1, 0, 7.0 );
	arr.set( 1, 1, 8.0 );

	t.strictEqual( arr.get( 0, 0 ), 5.0, 'returns expected value' );
	t.strictEqual( arr.get( 0, 1 ), 6.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 0 ), 7.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 1 ), 8.0, 'returns expected value' );

	t.deepEqual( buffer, [ 8.0, 7.0, 6.0, 5.0 ], 'has expected values' );

	t.end();
});

tape( 'an ndarray has a `set` method for setting an array element using subscripts (row-major; complex type)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var v;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'set' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'set' ), true, 'has property' );
	t.strictEqual( isFunction( arr.set ), true, 'has method' );

	arr.set( 0, 0, new Complex64( 9.0, 10.0 ) );
	arr.set( 0, 1, new Complex64( 11.0, 12.0 ) );
	arr.set( 1, 0, new Complex64( 13.0, 14.0 ) );
	arr.set( 1, 1, new Complex64( 15.0, 16.0 ) );

	v = arr.get( 0, 0 );
	t.strictEqual( real( v ), 9.0, 'returns expected value' );
	t.strictEqual( imag( v ), 10.0, 'returns expected value' );
	v = arr.get( 0, 1 );
	t.strictEqual( real( v ), 11.0, 'returns expected value' );
	t.strictEqual( imag( v ), 12.0, 'returns expected value' );
	v = arr.get( 1, 0 );
	t.strictEqual( real( v ), 13.0, 'returns expected value' );
	t.strictEqual( imag( v ), 14.0, 'returns expected value' );
	v = arr.get( 1, 1 );
	t.strictEqual( real( v ), 15.0, 'returns expected value' );
	t.strictEqual( imag( v ), 16.0, 'returns expected value' );

	t.deepEqual( buffer, new Complex64Array( [ 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0 ] ), 'has expected values' );

	t.end();
});

tape( 'an ndarray has a `set` method for setting an array element using subscripts (column-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ 1, 2 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'set' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'set' ), true, 'has property' );
	t.strictEqual( isFunction( arr.set ), true, 'has method' );

	arr.set( 0, 0, 5.0 );
	arr.set( 0, 1, 6.0 );
	arr.set( 1, 0, 7.0 );
	arr.set( 1, 1, 8.0 );

	t.strictEqual( arr.get( 0, 0 ), 5.0, 'returns expected value' );
	t.strictEqual( arr.get( 0, 1 ), 6.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 0 ), 7.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 1 ), 8.0, 'returns expected value' );

	t.deepEqual( buffer, [ 5.0, 7.0, 6.0, 8.0 ], 'has expected values' );

	t.end();
});

tape( 'an ndarray has a `set` method for setting an array element using subscripts (column-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ -1, 2 ];
	offset = 1;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'set' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'set' ), true, 'has property' );
	t.strictEqual( isFunction( arr.set ), true, 'has method' );

	arr.set( 0, 0, 5.0 );
	arr.set( 0, 1, 6.0 );
	arr.set( 1, 0, 7.0 );
	arr.set( 1, 1, 8.0 );

	t.strictEqual( arr.get( 0, 0 ), 5.0, 'returns expected value' );
	t.strictEqual( arr.get( 0, 1 ), 6.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 0 ), 7.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 1 ), 8.0, 'returns expected value' );

	t.deepEqual( buffer, [ 7.0, 5.0, 8.0, 6.0 ], 'has expected values' );

	t.end();
});

tape( 'an ndarray has a `set` method for setting an array element using subscripts (column-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ 1, -2 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'set' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'set' ), true, 'has property' );
	t.strictEqual( isFunction( arr.set ), true, 'has method' );

	arr.set( 0, 0, 5.0 );
	arr.set( 0, 1, 6.0 );
	arr.set( 1, 0, 7.0 );
	arr.set( 1, 1, 8.0 );

	t.strictEqual( arr.get( 0, 0 ), 5.0, 'returns expected value' );
	t.strictEqual( arr.get( 0, 1 ), 6.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 0 ), 7.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 1 ), 8.0, 'returns expected value' );

	t.deepEqual( buffer, [ 6.0, 8.0, 5.0, 7.0 ], 'has expected values' );

	t.end();
});

tape( 'an ndarray has a `set` method for setting an array element using subscripts (column-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ -1, -2 ];
	offset = 3;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'set' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'set' ), true, 'has property' );
	t.strictEqual( isFunction( arr.set ), true, 'has method' );

	arr.set( 0, 0, 5.0 );
	arr.set( 0, 1, 6.0 );
	arr.set( 1, 0, 7.0 );
	arr.set( 1, 1, 8.0 );

	t.strictEqual( arr.get( 0, 0 ), 5.0, 'returns expected value' );
	t.strictEqual( arr.get( 0, 1 ), 6.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 0 ), 7.0, 'returns expected value' );
	t.strictEqual( arr.get( 1, 1 ), 8.0, 'returns expected value' );

	t.deepEqual( buffer, [ 8.0, 6.0, 7.0, 5.0 ], 'has expected values' );

	t.end();
});

tape( 'an ndarray has a `set` method for setting an array element using subscripts (column-major; complex type)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var v;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 1, 2 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'set' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'set' ), true, 'has property' );
	t.strictEqual( isFunction( arr.set ), true, 'has method' );

	arr.set( 0, 0, new Complex64( 9.0, 10.0 ) );
	arr.set( 0, 1, new Complex64( 11.0, 12.0 ) );
	arr.set( 1, 0, new Complex64( 13.0, 14.0 ) );
	arr.set( 1, 1, new Complex64( 15.0, 16.0 ) );

	v = arr.get( 0, 0 );
	t.strictEqual( real( v ), 9.0, 'returns expected value' );
	t.strictEqual( imag( v ), 10.0, 'returns expected value' );
	v = arr.get( 0, 1 );
	t.strictEqual( real( v ), 11.0, 'returns expected value' );
	t.strictEqual( imag( v ), 12.0, 'returns expected value' );
	v = arr.get( 1, 0 );
	t.strictEqual( real( v ), 13.0, 'returns expected value' );
	t.strictEqual( imag( v ), 14.0, 'returns expected value' );
	v = arr.get( 1, 1 );
	t.strictEqual( real( v ), 15.0, 'returns expected value' );
	t.strictEqual( imag( v ), 16.0, 'returns expected value' );

	t.deepEqual( buffer, new Complex64Array( [ 9.0, 10.0, 13.0, 14.0, 11.0, 12.0, 15.0, 16.0 ] ), 'has expected values' );

	t.end();
});

tape( 'an ndarray has a `set` method for setting an array element using subscripts (0d)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'set' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'set' ), true, 'has property' );
	t.strictEqual( isFunction( arr.set ), true, 'has method' );

	arr.set( 5.0 );

	t.strictEqual( arr.get(), 5.0, 'returns expected value' );

	t.deepEqual( buffer, [ 1.0, 2.0, 5.0, 4.0 ], 'has expected values' );

	t.end();
});

tape( 'an ndarray has an `iset` method for setting an array element using a linear index (row-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iset' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iset ), true, 'has method' );

	arr.iset( 0, 5.0 );
	arr.iset( 1, 6.0 );
	arr.iset( 2, 7.0 );
	arr.iset( 3, 8.0 );

	t.strictEqual( arr.iget( 0 ), 5.0, 'returns expected value' );
	t.strictEqual( arr.iget( 1 ), 6.0, 'returns expected value' );
	t.strictEqual( arr.iget( 2 ), 7.0, 'returns expected value' );
	t.strictEqual( arr.iget( 3 ), 8.0, 'returns expected value' );

	t.deepEqual( buffer, [ 5.0, 6.0, 7.0, 8.0 ], 'has expected values' );

	t.end();
});

tape( 'an ndarray has an `iset` method for setting an array element using a linear index (row-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, -1 ];
	offset = 1;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iset' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iset ), true, 'has method' );

	arr.iset( 0, 5.0 );
	arr.iset( 1, 6.0 );
	arr.iset( 2, 7.0 );
	arr.iset( 3, 8.0 );

	t.strictEqual( arr.iget( 0 ), 5.0, 'returns expected value' );
	t.strictEqual( arr.iget( 1 ), 6.0, 'returns expected value' );
	t.strictEqual( arr.iget( 2 ), 7.0, 'returns expected value' );
	t.strictEqual( arr.iget( 3 ), 8.0, 'returns expected value' );

	t.deepEqual( buffer, [ 6.0, 5.0, 8.0, 7.0 ], 'has expected values' );

	t.end();
});

tape( 'an ndarray has an `iset` method for setting an array element using a linear index (row-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ -2, 1 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iset' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iset ), true, 'has method' );

	arr.iset( 0, 5.0 );
	arr.iset( 1, 6.0 );
	arr.iset( 2, 7.0 );
	arr.iset( 3, 8.0 );

	t.strictEqual( arr.iget( 0 ), 5.0, 'returns expected value' );
	t.strictEqual( arr.iget( 1 ), 6.0, 'returns expected value' );
	t.strictEqual( arr.iget( 2 ), 7.0, 'returns expected value' );
	t.strictEqual( arr.iget( 3 ), 8.0, 'returns expected value' );

	t.deepEqual( buffer, [ 7.0, 8.0, 5.0, 6.0 ], 'has expected values' );

	t.end();
});

tape( 'an ndarray has an `iset` method for setting an array element using a linear index (row-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ -2, -1 ];
	offset = 3;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iset' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iset ), true, 'has method' );

	arr.iset( 0, 5.0 );
	arr.iset( 1, 6.0 );
	arr.iset( 2, 7.0 );
	arr.iset( 3, 8.0 );

	t.strictEqual( arr.iget( 0 ), 5.0, 'returns expected value' );
	t.strictEqual( arr.iget( 1 ), 6.0, 'returns expected value' );
	t.strictEqual( arr.iget( 2 ), 7.0, 'returns expected value' );
	t.strictEqual( arr.iget( 3 ), 8.0, 'returns expected value' );

	t.deepEqual( buffer, [ 8.0, 7.0, 6.0, 5.0 ], 'has expected values' );

	t.end();
});

tape( 'an ndarray has an `iset` method for setting an array element using a linear index (row-major; noncontiguous)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ];
	shape = [ 2, 2, 1 ];
	order = 'row-major';
	strides = [ 4, 1, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iset' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iset ), true, 'has method' );

	arr.iset( 0, -5.0 );
	arr.iset( 1, -6.0 );
	arr.iset( 2, -7.0 );
	arr.iset( 3, -8.0 );

	t.strictEqual( arr.iget( 0 ), -5.0, 'returns expected value' );
	t.strictEqual( arr.iget( 1 ), -6.0, 'returns expected value' );
	t.strictEqual( arr.iget( 2 ), -7.0, 'returns expected value' );
	t.strictEqual( arr.iget( 3 ), -8.0, 'returns expected value' );

	t.deepEqual( buffer, [ -5.0, -6.0, 3.0, 4.0, -7.0, -8.0, 7.0, 8.0 ], 'has expected values' );

	t.end();
});

tape( 'an ndarray has an `iset` method for setting an array element using a linear index (row-major; complex type)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var v;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iset' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iset ), true, 'has method' );

	arr.iset( 0, new Complex64( 9.0, 10.0 ) );
	arr.iset( 1, new Complex64( 11.0, 12.0 ) );
	arr.iset( 2, new Complex64( 13.0, 14.0 ) );
	arr.iset( 3, new Complex64( 15.0, 16.0 ) );

	v = arr.iget( 0 );
	t.strictEqual( real( v ), 9.0, 'returns expected value' );
	t.strictEqual( imag( v ), 10.0, 'returns expected value' );
	v = arr.iget( 1 );
	t.strictEqual( real( v ), 11.0, 'returns expected value' );
	t.strictEqual( imag( v ), 12.0, 'returns expected value' );
	v = arr.iget( 2 );
	t.strictEqual( real( v ), 13.0, 'returns expected value' );
	t.strictEqual( imag( v ), 14.0, 'returns expected value' );
	v = arr.iget( 3 );
	t.strictEqual( real( v ), 15.0, 'returns expected value' );
	t.strictEqual( imag( v ), 16.0, 'returns expected value' );

	t.deepEqual( buffer, new Complex64Array( [ 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0 ] ), 'has expected values' );

	t.end();
});

tape( 'an ndarray has an `iset` method for setting an array element using a linear index (row-major; complex type)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var v;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ -2, 1 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iset' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iset ), true, 'has method' );

	arr.iset( 0, new Complex64( 9.0, 10.0 ) );
	arr.iset( 1, new Complex64( 11.0, 12.0 ) );
	arr.iset( 2, new Complex64( 13.0, 14.0 ) );
	arr.iset( 3, new Complex64( 15.0, 16.0 ) );

	v = arr.iget( 0 );
	t.strictEqual( real( v ), 9.0, 'returns expected value' );
	t.strictEqual( imag( v ), 10.0, 'returns expected value' );
	v = arr.iget( 1 );
	t.strictEqual( real( v ), 11.0, 'returns expected value' );
	t.strictEqual( imag( v ), 12.0, 'returns expected value' );
	v = arr.iget( 2 );
	t.strictEqual( real( v ), 13.0, 'returns expected value' );
	t.strictEqual( imag( v ), 14.0, 'returns expected value' );
	v = arr.iget( 3 );
	t.strictEqual( real( v ), 15.0, 'returns expected value' );
	t.strictEqual( imag( v ), 16.0, 'returns expected value' );

	t.deepEqual( buffer, new Complex64Array( [ 13.0, 14.0, 15.0, 16.0, 9.0, 10.0, 11.0, 12.0 ] ), 'has expected values' );

	t.end();
});

tape( 'an ndarray has an `iset` method for setting an array element using a linear index (row-major; complex type)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var v;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ -2, -1 ];
	offset = 3;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iset' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iset ), true, 'has method' );

	arr.iset( 0, new Complex64( 9.0, 10.0 ) );
	arr.iset( 1, new Complex64( 11.0, 12.0 ) );
	arr.iset( 2, new Complex64( 13.0, 14.0 ) );
	arr.iset( 3, new Complex64( 15.0, 16.0 ) );

	v = arr.iget( 0 );
	t.strictEqual( real( v ), 9.0, 'returns expected value' );
	t.strictEqual( imag( v ), 10.0, 'returns expected value' );
	v = arr.iget( 1 );
	t.strictEqual( real( v ), 11.0, 'returns expected value' );
	t.strictEqual( imag( v ), 12.0, 'returns expected value' );
	v = arr.iget( 2 );
	t.strictEqual( real( v ), 13.0, 'returns expected value' );
	t.strictEqual( imag( v ), 14.0, 'returns expected value' );
	v = arr.iget( 3 );
	t.strictEqual( real( v ), 15.0, 'returns expected value' );
	t.strictEqual( imag( v ), 16.0, 'returns expected value' );

	t.deepEqual( buffer, new Complex64Array( [ 15.0, 16.0, 13.0, 14.0, 11.0, 12.0, 9.0, 10.0 ] ), 'has expected values' );

	t.end();
});

tape( 'an ndarray has an `iset` method for setting an array element using a linear index (row-major; noncontiguous; complex type)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var v;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0 ] ); // eslint-disable-line max-len
	shape = [ 2, 2, 1 ];
	order = 'row-major';
	strides = [ 4, 1, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iset' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iset ), true, 'has method' );

	arr.iset( 0, new Complex64( -9.0, -10.0 ) );
	arr.iset( 1, new Complex64( -11.0, -12.0 ) );
	arr.iset( 2, new Complex64( -13.0, -14.0 ) );
	arr.iset( 3, new Complex64( -15.0, -16.0 ) );

	v = arr.iget( 0 );
	t.strictEqual( real( v ), -9.0, 'returns expected value' );
	t.strictEqual( imag( v ), -10.0, 'returns expected value' );
	v = arr.iget( 1 );
	t.strictEqual( real( v ), -11.0, 'returns expected value' );
	t.strictEqual( imag( v ), -12.0, 'returns expected value' );
	v = arr.iget( 2 );
	t.strictEqual( real( v ), -13.0, 'returns expected value' );
	t.strictEqual( imag( v ), -14.0, 'returns expected value' );
	v = arr.iget( 3 );
	t.strictEqual( real( v ), -15.0, 'returns expected value' );
	t.strictEqual( imag( v ), -16.0, 'returns expected value' );

	t.deepEqual( buffer, new Complex64Array( [ -9.0, -10.0, 3.0, 4.0, -11.0, -12.0, 7.0, 8.0, -13.0, -14.0, 11.0, 12.0, -15.0, -16.0, 15.0, 16.0 ] ), 'has expected values' );

	t.end();
});

tape( 'an ndarray has an `iset` method for setting an array element using a linear index (column-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ 1, 2 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iset' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iset ), true, 'has method' );

	arr.iset( 0, 5.0 );
	arr.iset( 1, 6.0 );
	arr.iset( 2, 7.0 );
	arr.iset( 3, 8.0 );

	t.strictEqual( arr.iget( 0 ), 5.0, 'returns expected value' );
	t.strictEqual( arr.iget( 1 ), 6.0, 'returns expected value' );
	t.strictEqual( arr.iget( 2 ), 7.0, 'returns expected value' );
	t.strictEqual( arr.iget( 3 ), 8.0, 'returns expected value' );

	t.deepEqual( buffer, [ 5.0, 6.0, 7.0, 8.0 ], 'has expected values' );

	t.end();
});

tape( 'an ndarray has an `iset` method for setting an array element using a linear index (column-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ -1, 2 ];
	offset = 1;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iset' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iset ), true, 'has method' );

	arr.iset( 0, 5.0 );
	arr.iset( 1, 6.0 );
	arr.iset( 2, 7.0 );
	arr.iset( 3, 8.0 );

	t.strictEqual( arr.iget( 0 ), 5.0, 'returns expected value' );
	t.strictEqual( arr.iget( 1 ), 6.0, 'returns expected value' );
	t.strictEqual( arr.iget( 2 ), 7.0, 'returns expected value' );
	t.strictEqual( arr.iget( 3 ), 8.0, 'returns expected value' );

	t.deepEqual( buffer, [ 6.0, 5.0, 8.0, 7.0 ], 'has expected values' );

	t.end();
});

tape( 'an ndarray has an `iset` method for setting an array element using a linear index (column-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ 1, -2 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iset' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iset ), true, 'has method' );

	arr.iset( 0, 5.0 );
	arr.iset( 1, 6.0 );
	arr.iset( 2, 7.0 );
	arr.iset( 3, 8.0 );

	t.strictEqual( arr.iget( 0 ), 5.0, 'returns expected value' );
	t.strictEqual( arr.iget( 1 ), 6.0, 'returns expected value' );
	t.strictEqual( arr.iget( 2 ), 7.0, 'returns expected value' );
	t.strictEqual( arr.iget( 3 ), 8.0, 'returns expected value' );

	t.deepEqual( buffer, [ 7, 8, 5, 6 ], 'has expected values' );

	t.end();
});

tape( 'an ndarray has an `iset` method for setting an array element using a linear index (column-major)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ -1, -2 ];
	offset = 3;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iset' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iset ), true, 'has method' );

	arr.iset( 0, 5.0 );
	arr.iset( 1, 6.0 );
	arr.iset( 2, 7.0 );
	arr.iset( 3, 8.0 );

	t.strictEqual( arr.iget( 0 ), 5.0, 'returns expected value' );
	t.strictEqual( arr.iget( 1 ), 6.0, 'returns expected value' );
	t.strictEqual( arr.iget( 2 ), 7.0, 'returns expected value' );
	t.strictEqual( arr.iget( 3 ), 8.0, 'returns expected value' );

	t.deepEqual( buffer, [ 8.0, 7.0, 6.0, 5.0 ], 'has expected values' );

	t.end();
});

tape( 'an ndarray has an `iset` method for setting an array element using a linear index (column-major; noncontiguous)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ];
	shape = [ 2, 2, 1 ];
	order = 'column-major';
	strides = [ 1, 4, 8 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iset' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iset ), true, 'has method' );

	arr.iset( 0, -5.0 );
	arr.iset( 1, -6.0 );
	arr.iset( 2, -7.0 );
	arr.iset( 3, -8.0 );

	t.strictEqual( arr.iget( 0 ), -5.0, 'returns expected value' );
	t.strictEqual( arr.iget( 1 ), -6.0, 'returns expected value' );
	t.strictEqual( arr.iget( 2 ), -7.0, 'returns expected value' );
	t.strictEqual( arr.iget( 3 ), -8.0, 'returns expected value' );

	t.deepEqual( buffer, [ -5.0, -6.0, 3.0, 4.0, -7.0, -8.0, 7.0, 8.0 ], 'has expected values' );

	t.end();
});

tape( 'an ndarray has an `iset` method for setting an array element using a linear index (column-major; complex type)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var v;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ 1, 2 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iset' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iset ), true, 'has method' );

	arr.iset( 0, new Complex64( 9.0, 10.0 ) );
	arr.iset( 1, new Complex64( 11.0, 12.0 ) );
	arr.iset( 2, new Complex64( 13.0, 14.0 ) );
	arr.iset( 3, new Complex64( 15.0, 16.0 ) );

	v = arr.iget( 0 );
	t.strictEqual( real( v ), 9.0, 'returns expected value' );
	t.strictEqual( imag( v ), 10.0, 'returns expected value' );
	v = arr.iget( 1 );
	t.strictEqual( real( v ), 11.0, 'returns expected value' );
	t.strictEqual( imag( v ), 12.0, 'returns expected value' );
	v = arr.iget( 2 );
	t.strictEqual( real( v ), 13.0, 'returns expected value' );
	t.strictEqual( imag( v ), 14.0, 'returns expected value' );
	v = arr.iget( 3 );
	t.strictEqual( real( v ), 15.0, 'returns expected value' );
	t.strictEqual( imag( v ), 16.0, 'returns expected value' );

	t.deepEqual( buffer, new Complex64Array( [ 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0 ] ), 'has expected values' );

	t.end();
});

tape( 'an ndarray has an `iset` method for setting an array element using a linear index (column-major; complex type)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var v;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ 1, -2 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iset' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iset ), true, 'has method' );

	arr.iset( 0, new Complex64( 9.0, 10.0 ) );
	arr.iset( 1, new Complex64( 11.0, 12.0 ) );
	arr.iset( 2, new Complex64( 13.0, 14.0 ) );
	arr.iset( 3, new Complex64( 15.0, 16.0 ) );

	v = arr.iget( 0 );
	t.strictEqual( real( v ), 9.0, 'returns expected value' );
	t.strictEqual( imag( v ), 10.0, 'returns expected value' );
	v = arr.iget( 1 );
	t.strictEqual( real( v ), 11.0, 'returns expected value' );
	t.strictEqual( imag( v ), 12.0, 'returns expected value' );
	v = arr.iget( 2 );
	t.strictEqual( real( v ), 13.0, 'returns expected value' );
	t.strictEqual( imag( v ), 14.0, 'returns expected value' );
	v = arr.iget( 3 );
	t.strictEqual( real( v ), 15.0, 'returns expected value' );
	t.strictEqual( imag( v ), 16.0, 'returns expected value' );

	t.deepEqual( buffer, new Complex64Array( [ 13.0, 14.0, 15.0, 16.0, 9.0, 10.0, 11.0, 12.0 ] ), 'has expected values' );

	t.end();
});

tape( 'an ndarray has an `iset` method for setting an array element using a linear index (column-major; complex type)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var v;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ -1, -2 ];
	offset = 3;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iset' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iset ), true, 'has method' );

	arr.iset( 0, new Complex64( 9.0, 10.0 ) );
	arr.iset( 1, new Complex64( 11.0, 12.0 ) );
	arr.iset( 2, new Complex64( 13.0, 14.0 ) );
	arr.iset( 3, new Complex64( 15.0, 16.0 ) );

	v = arr.iget( 0 );
	t.strictEqual( real( v ), 9.0, 'returns expected value' );
	t.strictEqual( imag( v ), 10.0, 'returns expected value' );
	v = arr.iget( 1 );
	t.strictEqual( real( v ), 11.0, 'returns expected value' );
	t.strictEqual( imag( v ), 12.0, 'returns expected value' );
	v = arr.iget( 2 );
	t.strictEqual( real( v ), 13.0, 'returns expected value' );
	t.strictEqual( imag( v ), 14.0, 'returns expected value' );
	v = arr.iget( 3 );
	t.strictEqual( real( v ), 15.0, 'returns expected value' );
	t.strictEqual( imag( v ), 16.0, 'returns expected value' );

	t.deepEqual( buffer, new Complex64Array( [ 15.0, 16.0, 13.0, 14.0, 11.0, 12.0, 9.0, 10.0 ] ), 'has expected values' );

	t.end();
});

tape( 'an ndarray has an `iset` method for setting an array element using a linear index (column-major; noncontiguous; complex type)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var v;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0 ] ); // eslint-disable-line max-len
	shape = [ 2, 2, 1 ];
	order = 'column-major';
	strides = [ 4, 1, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iset' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iset ), true, 'has method' );

	arr.iset( 0, new Complex64( -9.0, -10.0 ) );
	arr.iset( 1, new Complex64( -11.0, -12.0 ) );
	arr.iset( 2, new Complex64( -13.0, -14.0 ) );
	arr.iset( 3, new Complex64( -15.0, -16.0 ) );

	v = arr.iget( 0 );
	t.strictEqual( real( v ), -9.0, 'returns expected value' );
	t.strictEqual( imag( v ), -10.0, 'returns expected value' );
	v = arr.iget( 1 );
	t.strictEqual( real( v ), -11.0, 'returns expected value' );
	t.strictEqual( imag( v ), -12.0, 'returns expected value' );
	v = arr.iget( 2 );
	t.strictEqual( real( v ), -13.0, 'returns expected value' );
	t.strictEqual( imag( v ), -14.0, 'returns expected value' );
	v = arr.iget( 3 );
	t.strictEqual( real( v ), -15.0, 'returns expected value' );
	t.strictEqual( imag( v ), -16.0, 'returns expected value' );

	t.deepEqual( buffer, new Complex64Array( [ -9.0, -10.0, 3.0, 4.0, -11.0, -12.0, 7.0, 8.0, -13.0, -14.0, 11.0, 12.0, -15.0, -16.0, 15.0, 16.0 ] ), 'has expected values' );

	t.end();
});

tape( 'an ndarray has an `iset` method for setting an array element using a linear index (0d)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iset' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iset ), true, 'has method' );

	arr.iset( -5.0 );

	t.strictEqual( arr.iget(), -5.0, 'returns expected value' );

	t.deepEqual( buffer, [ 1.0, 2.0, -5.0, 4.0 ], 'has expected values' );

	t.end();
});

tape( 'an ndarray has an `iset` method for setting an array element using a linear index (0d; complex type)', function test( t ) {
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var v;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'iset' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'iset' ), true, 'has property' );
	t.strictEqual( isFunction( arr.iset ), true, 'has method' );

	arr.iset( new Complex64( -5.0, -6.0 ) );

	v = arr.iget();
	t.strictEqual( real( v ), -5.0, 'returns expected value' );
	t.strictEqual( imag( v ), -6.0, 'returns expected value' );

	t.deepEqual( buffer, new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, -5.0, -6.0, 7.0, 8.0 ] ), 'has expected values' );

	t.end();
});

tape( 'an ndarray has a custom `toString()` method (row-major)', function test( t ) {
	var expected;
	var strides;
	var actual;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ];
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'toString' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'toString' ), true, 'has property' );
	t.strictEqual( isFunction( arr.toString ), true, 'has method' );

	expected = 'ndarray( \'generic\', [ 3, 4, 5, 6 ], [ 2, 2 ], [ 2, 1 ], 0, \'row-major\' )';
	actual = arr.toString();
	t.strictEqual( actual, expected, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a custom `toString()` method (column-major)', function test( t ) {
	var expected;
	var strides;
	var actual;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ -1, -2 ];
	offset = 3;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'toString' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'toString' ), true, 'has property' );
	t.strictEqual( isFunction( arr.toString ), true, 'has method' );

	expected = 'ndarray( \'generic\', [ 4, 3, 2, 1 ], [ 2, 2 ], [ 1, 2 ], 0, \'column-major\' )';
	actual = arr.toString();
	t.strictEqual( actual, expected, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a custom `toString()` method (complex type)', function test( t ) {
	var expected;
	var strides;
	var actual;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'toString' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'toString' ), true, 'has property' );
	t.strictEqual( isFunction( arr.toString ), true, 'has method' );

	expected = 'ndarray( \'complex64\', new Complex64Array( [ 1, 2, 3, 4, 5, 6, 7, 8 ] ), [ 2, 2 ], [ 2, 1 ], 0, \'row-major\' )';
	actual = arr.toString();
	t.strictEqual( actual, expected, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a custom `toString()` method (boolean type)', function test( t ) {
	var expected;
	var strides;
	var actual;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'bool';
	buffer = new BooleanArray( [ true, false, true, false ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'toString' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'toString' ), true, 'has property' );
	t.strictEqual( isFunction( arr.toString ), true, 'has method' );

	expected = 'ndarray( \'bool\', new BooleanArray( [ true, false, true, false ] ), [ 2, 2 ], [ 2, 1 ], 0, \'row-major\' )';
	actual = arr.toString();
	t.strictEqual( actual, expected, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a custom `toString()` method (complex type)', function test( t ) {
	var expected;
	var strides;
	var actual;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'complex128';
	buffer = new Complex128Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'toString' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'toString' ), true, 'has property' );
	t.strictEqual( isFunction( arr.toString ), true, 'has method' );

	expected = 'ndarray( \'complex128\', new Complex128Array( [ 1, 2, 3, 4, 5, 6, 7, 8 ] ), [ 2, 2 ], [ 2, 1 ], 0, \'row-major\' )';
	actual = arr.toString();
	t.strictEqual( actual, expected, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a custom `toString()` method (0d)', function test( t ) {
	var expected;
	var strides;
	var actual;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 3;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'toString' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'toString' ), true, 'has property' );
	t.strictEqual( isFunction( arr.toString ), true, 'has method' );

	expected = 'ndarray( \'generic\', [ 4 ], [], [ 0 ], 0, \'row-major\' )';
	actual = arr.toString();
	t.strictEqual( actual, expected, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a custom `toString()` method (large array)', function test( t ) {
	var expected;
	var strides;
	var actual;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';

	// Intentionally create a sparse array:
	buffer = new Array( 1e4 ); // eslint-disable-line stdlib/no-new-array
	shape = [ buffer.length ];
	order = 'row-major';
	strides = [ 1 ];
	offset = 0;

	buffer[ 0 ] = 1.0;
	buffer[ 1 ] = 2.0;
	buffer[ 2 ] = 3.0;
	buffer[ buffer.length-3 ] = 4.0;
	buffer[ buffer.length-2 ] = 5.0;
	buffer[ buffer.length-1 ] = 6.0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'toString' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'toString' ), true, 'has property' );
	t.strictEqual( isFunction( arr.toString ), true, 'has method' );

	expected = 'ndarray( \'generic\', [ 1, 2, 3, ..., 4, 5, 6 ], [ 10000 ], [ 1 ], 0, \'row-major\' )';
	actual = arr.toString();
	t.strictEqual( actual, expected, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a custom `toString()` method (large array; complex type)', function test( t ) {
	var expected;
	var strides;
	var actual;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'complex64';
	buffer = new Complex64Array( 1e4 );
	shape = [ buffer.length ];
	order = 'row-major';
	strides = [ 1 ];
	offset = 0;

	buffer.set( new Complex64( 1.0, 1.0 ), 0 );
	buffer.set( new Complex64( 2.0, 2.0 ), 1 );
	buffer.set( new Complex64( 3.0, 3.0 ), 2 );
	buffer.set( new Complex64( 4.0, 4.0 ), buffer.length-3 );
	buffer.set( new Complex64( 5.0, 5.0 ), buffer.length-2 );
	buffer.set( new Complex64( 6.0, 6.0 ), buffer.length-1 );

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'toString' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'toString' ), true, 'has property' );
	t.strictEqual( isFunction( arr.toString ), true, 'has method' );

	expected = 'ndarray( \'complex64\', new Complex64Array( [ 1, 1, 2, 2, 3, 3, ..., 4, 4, 5, 5, 6, 6 ] ), [ 10000 ], [ 1 ], 0, \'row-major\' )';
	actual = arr.toString();
	t.strictEqual( actual, expected, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a custom `toString()` method (large array; complex type)', function test( t ) {
	var expected;
	var strides;
	var actual;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'complex128';
	buffer = new Complex128Array( 1e4 );
	shape = [ buffer.length ];
	order = 'row-major';
	strides = [ 1 ];
	offset = 0;

	buffer.set( new Complex128( 1.0, 1.0 ), 0 );
	buffer.set( new Complex128( 2.0, 2.0 ), 1 );
	buffer.set( new Complex128( 3.0, 3.0 ), 2 );
	buffer.set( new Complex128( 4.0, 4.0 ), buffer.length-3 );
	buffer.set( new Complex128( 5.0, 5.0 ), buffer.length-2 );
	buffer.set( new Complex128( 6.0, 6.0 ), buffer.length-1 );

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'toString' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'toString' ), true, 'has property' );
	t.strictEqual( isFunction( arr.toString ), true, 'has method' );

	expected = 'ndarray( \'complex128\', new Complex128Array( [ 1, 1, 2, 2, 3, 3, ..., 4, 4, 5, 5, 6, 6 ] ), [ 10000 ], [ 1 ], 0, \'row-major\' )';
	actual = arr.toString();
	t.strictEqual( actual, expected, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a custom `toJSON()` method (row-major)', function test( t ) {
	var expected;
	var strides;
	var actual;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'toJSON' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'toJSON' ), true, 'has property' );
	t.strictEqual( isFunction( arr.toJSON ), true, 'has method' );

	expected = {
		'type': 'ndarray',
		'dtype': 'float64',
		'data': [ 3.0, 4.0, 5.0, 6.0 ],
		'shape': [ 2, 2 ],
		'strides': [ 2, 1 ],
		'order': 'row-major',
		'flags': {
			'READONLY': false
		}
	};
	actual = arr.toJSON();
	t.deepEqual( actual, expected, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a custom `toJSON()` method (column-major)', function test( t ) {
	var expected;
	var strides;
	var actual;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [ 2, 2 ];
	order = 'column-major';
	strides = [ -1, -2 ];
	offset = 3;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'toJSON' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'toJSON' ), true, 'has property' );
	t.strictEqual( isFunction( arr.toJSON ), true, 'has method' );

	expected = {
		'type': 'ndarray',
		'dtype': 'generic',
		'data': [ 4.0, 3.0, 2.0, 1.0 ],
		'shape': [ 2, 2 ],
		'strides': [ 1, 2 ],
		'order': 'column-major',
		'flags': {
			'READONLY': false
		}
	};
	actual = arr.toJSON();
	t.deepEqual( actual, expected, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a custom `toJSON()` method (complex type)', function test( t ) {
	var expected;
	var strides;
	var actual;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'complex64';
	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'toJSON' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'toJSON' ), true, 'has property' );
	t.strictEqual( isFunction( arr.toJSON ), true, 'has method' );

	expected = {
		'type': 'ndarray',
		'dtype': 'complex64',
		'data': [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ],
		'shape': [ 2, 2 ],
		'strides': [ 2, 1 ],
		'order': 'row-major',
		'flags': {
			'READONLY': false
		}
	};
	actual = arr.toJSON();
	t.deepEqual( actual, expected, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a custom `toJSON()` method (0d)', function test( t ) {
	var expected;
	var strides;
	var actual;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0, 3.0, 4.0 ];
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'toJSON' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'toJSON' ), true, 'has property' );
	t.strictEqual( isFunction( arr.toJSON ), true, 'has method' );

	expected = {
		'type': 'ndarray',
		'dtype': 'generic',
		'data': [ 3.0 ],
		'shape': [],
		'strides': [ 0 ],
		'order': 'row-major',
		'flags': {
			'READONLY': false
		}
	};
	actual = arr.toJSON();
	t.deepEqual( actual, expected, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a custom `valueOf()` method (0d)', function test( t ) {
	var expected;
	var strides;
	var actual;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 3.14 ];
	shape = [];
	order = 'row-major';
	strides = [ 0 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'valueOf' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'valueOf' ), true, 'has property' );
	t.strictEqual( isFunction( arr.valueOf ), true, 'has method' );

	expected = 3.14;
	actual = arr.valueOf();
	t.strictEqual( actual, expected, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a custom `valueOf()` method (>=1d)', function test( t ) {
	var expected;
	var strides;
	var actual;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;

	dtype = 'generic';
	buffer = [ 1.0, 2.0 ];
	shape = [ 2 ];
	order = 'row-major';
	strides = [ 0 ];
	offset = 0;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, 'valueOf' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, 'valueOf' ), true, 'has property' );
	t.strictEqual( isFunction( arr.valueOf ), true, 'has method' );

	expected = arr;
	actual = arr.valueOf();
	t.strictEqual( actual, expected, 'returns expected value' );

	t.end();
});

tape( 'an ndarray has a protocol method for serializing meta data to a DataView', function test( t ) {
	/* eslint-disable no-underscore-dangle */
	var expected;
	var strides;
	var actual;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var bytes;
	var arr;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, '__array_meta_dataview__' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, '__array_meta_dataview__' ), true, 'has property' );
	t.strictEqual( isFunction( arr.__array_meta_dataview__ ), true, 'has method' );

	expected = {
		'dtype': DTYPES[ 'float64' ],
		'ndims': shape.length,
		'shape': shape,
		'strides': strides,
		'offset': offset,
		'order': ORDERS[ 'row-major' ],
		'mode': MODES[ 'throw' ],
		'nsubmodes': 1,
		'submodes': [ MODES[ 'throw' ] ],
		'flags': 0
	};

	arr.__meta_dataview__ = null;
	actual = arr.__array_meta_dataview__();
	arr.__meta_dataview__ = null;

	t.strictEqual( isDataView( actual ), true, 'returns a DataView' );
	t.strictEqual( actual.byteLength, 1+2+8+(2*8)+(2*8)+8+1+1+8+(1*1)+4, 'returns expected byte length' );

	bytes = new Uint8Array( actual.buffer );
	if ( IS_LITTLE_ENDIAN ) {
		t.strictEqual( bytes[ 0 ], 1, 'returns expected endianness' );
		t.strictEqual( bytes[ 1 ], expected.dtype, 'returns expected dtype' );
		t.strictEqual( bytes[ 3 ], expected.ndims, 'returns expected ndims' );
		t.strictEqual( bytes[ 11 ], expected.shape[ 0 ], 'returns expected first dimension' );
		t.strictEqual( bytes[ 19 ], expected.shape[ 1 ], 'returns expected second dimension' );
		t.strictEqual( bytes[ 27 ], expected.strides[ 0 ]*arr.BYTES_PER_ELEMENT, 'returns expected first stride' );
		t.strictEqual( bytes[ 35 ], expected.strides[ 1 ]*arr.BYTES_PER_ELEMENT, 'returns expected second stride' );
		t.strictEqual( bytes[ 43 ], expected.offset*arr.BYTES_PER_ELEMENT, 'returns expected offset' );
		t.strictEqual( bytes[ 51 ], expected.order, 'returns expected order' );
		t.strictEqual( bytes[ 52 ], expected.mode, 'returns expected index mode' );
		t.strictEqual( bytes[ 53 ], expected.nsubmodes, 'returns expected number of subscript modes' );
		t.strictEqual( bytes[ 61 ], expected.submodes[ 0 ], 'returns expected submode' );
		t.strictEqual( bytes[ 62 ], expected.flags, 'returns expected flags' );
	} else {
		t.strictEqual( bytes[ 0 ], 0, 'returns expected endianness' );
		t.strictEqual( bytes[ 2 ], expected.dtype, 'returns expected dtype' );
		t.strictEqual( bytes[ 10 ], expected.ndims, 'returns expected ndims' );
		t.strictEqual( bytes[ 18 ], expected.shape[ 0 ], 'returns expected first dimension' );
		t.strictEqual( bytes[ 26 ], expected.shape[ 1 ], 'returns expected second dimension' );
		t.strictEqual( bytes[ 34 ], expected.strides[ 0 ]*arr.BYTES_PER_ELEMENT, 'returns expected first stride' );
		t.strictEqual( bytes[ 42 ], expected.strides[ 1 ]*arr.BYTES_PER_ELEMENT, 'returns expected second stride' );
		t.strictEqual( bytes[ 50 ], expected.offset*arr.BYTES_PER_ELEMENT, 'returns expected offset' );
		t.strictEqual( bytes[ 51 ], expected.order, 'returns expected order' );
		t.strictEqual( bytes[ 52 ], expected.mode, 'returns expected index mode' );
		t.strictEqual( bytes[ 60 ], expected.nsubmodes, 'returns expected number of subscript modes' );
		t.strictEqual( bytes[ 61 ], expected.submodes[ 0 ], 'returns expected submode' );
		t.strictEqual( bytes[ 65 ], expected.flags, 'returns expected flags' );
	}
	t.end();

	/* eslint-enable no-underscore-dangle */
});

tape( 'an ndarray has a protocol method for serializing meta data to a DataView (no BigInt support)', function test( t ) {
	/* eslint-disable no-underscore-dangle */
	var expected;
	var strides;
	var ndarray;
	var actual;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var bytes;
	var arr;

	ndarray = proxyquire( './../lib/main.js', {
		'@stdlib/assert-has-bigint-support': hasSupport
	});

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	t.strictEqual( hasOwnProp( arr, '__array_meta_dataview__' ), false, 'does not have own property' );
	t.strictEqual( hasProp( arr, '__array_meta_dataview__' ), true, 'has property' );
	t.strictEqual( isFunction( arr.__array_meta_dataview__ ), true, 'has method' );

	expected = {
		'dtype': DTYPES[ 'float64' ],
		'ndims': shape.length,
		'shape': shape,
		'strides': strides,
		'offset': offset,
		'order': ORDERS[ 'row-major' ],
		'mode': MODES[ 'throw' ],
		'nsubmodes': 1,
		'submodes': [ MODES[ 'throw' ] ],
		'flags': 0
	};

	arr.__meta_dataview__ = null;
	actual = arr.__array_meta_dataview__();
	arr.__meta_dataview__ = null;

	t.strictEqual( isDataView( actual ), true, 'returns a DataView' );
	t.strictEqual( actual.byteLength, 1+2+8+(2*8)+(2*8)+8+1+1+8+(1*1)+4, 'returns expected byte length' );

	bytes = new Uint8Array( actual.buffer );
	if ( IS_LITTLE_ENDIAN ) {
		t.strictEqual( bytes[ 0 ], 1, 'returns expected endianness' );
		t.strictEqual( bytes[ 1 ], expected.dtype, 'returns expected dtype' );
		t.strictEqual( bytes[ 3 ], expected.ndims, 'returns expected ndims' );
		t.strictEqual( bytes[ 11 ], expected.shape[ 0 ], 'returns expected first dimension' );
		t.strictEqual( bytes[ 19 ], expected.shape[ 1 ], 'returns expected second dimension' );
		t.strictEqual( bytes[ 27 ], expected.strides[ 0 ]*arr.BYTES_PER_ELEMENT, 'returns expected first stride' );
		t.strictEqual( bytes[ 35 ], expected.strides[ 1 ]*arr.BYTES_PER_ELEMENT, 'returns expected second stride' );
		t.strictEqual( bytes[ 43 ], expected.offset*arr.BYTES_PER_ELEMENT, 'returns expected offset' );
		t.strictEqual( bytes[ 51 ], expected.order, 'returns expected order' );
		t.strictEqual( bytes[ 52 ], expected.mode, 'returns expected index mode' );
		t.strictEqual( bytes[ 53 ], expected.nsubmodes, 'returns expected number of subscript modes' );
		t.strictEqual( bytes[ 61 ], expected.submodes[ 0 ], 'returns expected submode' );
		t.strictEqual( bytes[ 62 ], expected.flags, 'returns expected flags' );
	} else {
		t.strictEqual( bytes[ 0 ], 0, 'returns expected endianness' );
		t.strictEqual( bytes[ 2 ], expected.dtype, 'returns expected dtype' );
		t.strictEqual( bytes[ 10 ], expected.ndims, 'returns expected ndims' );
		t.strictEqual( bytes[ 18 ], expected.shape[ 0 ], 'returns expected first dimension' );
		t.strictEqual( bytes[ 26 ], expected.shape[ 1 ], 'returns expected second dimension' );
		t.strictEqual( bytes[ 34 ], expected.strides[ 0 ]*arr.BYTES_PER_ELEMENT, 'returns expected first stride' );
		t.strictEqual( bytes[ 42 ], expected.strides[ 1 ]*arr.BYTES_PER_ELEMENT, 'returns expected second stride' );
		t.strictEqual( bytes[ 50 ], expected.offset*arr.BYTES_PER_ELEMENT, 'returns expected offset' );
		t.strictEqual( bytes[ 51 ], expected.order, 'returns expected order' );
		t.strictEqual( bytes[ 52 ], expected.mode, 'returns expected index mode' );
		t.strictEqual( bytes[ 60 ], expected.nsubmodes, 'returns expected number of subscript modes' );
		t.strictEqual( bytes[ 61 ], expected.submodes[ 0 ], 'returns expected submode' );
		t.strictEqual( bytes[ 65 ], expected.flags, 'returns expected flags' );
	}
	t.end();

	function hasSupport() {
		return false;
	}

	/* eslint-enable no-underscore-dangle */
});

tape( 'an ndarray has a protocol method for serializing meta data to a DataView (cached)', function test( t ) {
	/* eslint-disable no-underscore-dangle */
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var dv1;
	var dv2;

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	arr.__meta_dataview__ = null;
	dv1 = arr.__array_meta_dataview__();
	dv2 = arr.__array_meta_dataview__();
	arr.__meta_dataview__ = null;

	t.strictEqual( dv1, dv2, 'returns cached meta data' );

	t.end();

	/* eslint-enable no-underscore-dangle */
});

tape( 'an ndarray has a protocol method for serializing meta data to a DataView (cached)', function test( t ) {
	/* eslint-disable no-underscore-dangle */
	var ndarray;
	var strides;
	var buffer;
	var offset;
	var dtype;
	var order;
	var shape;
	var arr;
	var dv1;
	var dv2;

	ndarray = proxyquire( './../lib/main.js', {
		'@stdlib/assert-has-bigint-support': hasSupport
	});

	dtype = 'float64';
	buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
	shape = [ 2, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 2;

	arr = ndarray( dtype, buffer, shape, strides, offset, order );

	arr.__meta_dataview__ = null;
	dv1 = arr.__array_meta_dataview__();
	dv2 = arr.__array_meta_dataview__();
	arr.__meta_dataview__ = null;

	t.strictEqual( dv1, dv2, 'returns cached meta data' );

	t.end();

	function hasSupport() {
		return false;
	}

	/* eslint-enable no-underscore-dangle */
});
