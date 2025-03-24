// Copyright (c) 2025 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import t from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-has-bigint-support@v0.2.2-esm/index.mjs";import s from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-nonenumerable-read-only-property@v0.2.1-esm/index.mjs";import e from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-nonenumerable-read-only-accessor@v0.2.2-esm/index.mjs";import i from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-base-bytes-per-element@v0.2.2-esm/index.mjs";import r from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-base-iteration-order@v0.2.2-esm/index.mjs";import n from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-base-strides2order@v0.2.2-esm/index.mjs";import h from"https://cdn.jsdelivr.net/gh/stdlib-js/boolean-ctor@v0.2.2-esm/index.mjs";import o from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-base-minmax-view-buffer-index@v0.2.2-esm/index.mjs";import f from"https://cdn.jsdelivr.net/gh/stdlib-js/complex-float64-real@v0.1.1-esm/index.mjs";import a from"https://cdn.jsdelivr.net/gh/stdlib-js/complex-float64-imag@v0.1.1-esm/index.mjs";import _ from"https://cdn.jsdelivr.net/gh/stdlib-js/string-replace@v0.2.2-esm/index.mjs";import d from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-little-endian@v0.2.2-esm/index.mjs";import m from"https://cdn.jsdelivr.net/gh/stdlib-js/array-buffer@v0.2.2-esm/index.mjs";import l from"https://cdn.jsdelivr.net/gh/stdlib-js/array-dataview@v0.2.2-esm/index.mjs";import p from"https://cdn.jsdelivr.net/gh/stdlib-js/bigint-ctor@v0.2.2-esm/index.mjs";import{enum as u}from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-dtypes@v0.3.0-esm/index.mjs";import{enum as c}from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-orders@v0.2.2-esm/index.mjs";import{enum as g}from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-index-modes@v0.2.2-esm/index.mjs";import b from"https://cdn.jsdelivr.net/gh/stdlib-js/array-uint8@v0.2.2-esm/index.mjs";import{assign as y}from"https://cdn.jsdelivr.net/gh/stdlib-js/number-float64-base-to-int64-bytes@v0.2.2-esm/index.mjs";function j(t,s){return s&&(2===t||3===t)}function v(t,s){return s&&(1===t||3===t)}var O={int8:"new Int8Array( [ {{data}} ] )",uint8:"new Uint8Array( [ {{data}} ] )",uint8c:"new Uint8ClampedArray( [ {{data}} ] )",int16:"new Int16Array( [ {{data}} ] )",uint16:"new Uint16Array( [ {{data}} ] )",int32:"new Int32Array( [ {{data}} ] )",uint32:"new Uint32Array( [ {{data}} ] )",float32:"new Float32Array( [ {{data}} ] )",float64:"new Float64Array( [ {{data}} ] )",generic:"[ {{data}} ]",binary:"new Buffer( [ {{data}} ] )",complex64:"new Complex64Array( [ {{data}} ] )",complex128:"new Complex128Array( [ {{data}} ] )",bool:"new BooleanArray( [ {{data}} ] )"};var x=u(),I=c(),w=g();var A=u(),U=c(),E=g();function N(t,s,e,f,a,_){var d,m,l,p,u;if(!(this instanceof N))return new N(t,s,e,f,a,_);for(p=1,u=0;u<e.length;u++)p*=e[u];return m=s.BYTES_PER_ELEMENT?s.BYTES_PER_ELEMENT*p:null,this._byteLength=m,this._bytesPerElement=i(t),this._buffer=s,this._dtype=t,this._length=p,this._ndims=e.length,this._offset=a,this._order=_,this._shape=e,this._strides=f,this._accessors=h(s.get&&s.set),this._iterationOrder=r(f),d=function(t,s,e,i,r){var n;return 0!==t&&0!==r&&t===(n=o(s,e,i))[1]-n[0]+1}(p,e,f,a,this._iterationOrder),l=n(f),this._flags={ROW_MAJOR_CONTIGUOUS:v(l,d),COLUMN_MAJOR_CONTIGUOUS:j(l,d),READONLY:!1},this.__meta_dataview__=null,this}s(N,"name","ndarray"),e(N.prototype,"byteLength",(function(){return this._byteLength})),e(N.prototype,"BYTES_PER_ELEMENT",(function(){return this._bytesPerElement})),e(N.prototype,"data",(function(){return this._buffer})),e(N.prototype,"dtype",(function(){return this._dtype})),e(N.prototype,"flags",(function(){return{ROW_MAJOR_CONTIGUOUS:(t=this._flags).ROW_MAJOR_CONTIGUOUS,COLUMN_MAJOR_CONTIGUOUS:t.COLUMN_MAJOR_CONTIGUOUS,READONLY:t.READONLY};var t})),e(N.prototype,"length",(function(){return this._length})),e(N.prototype,"ndims",(function(){return this._ndims})),e(N.prototype,"offset",(function(){return this._offset})),e(N.prototype,"order",(function(){return this._order})),e(N.prototype,"shape",(function(){return this._shape.slice()})),e(N.prototype,"strides",(function(){return this._strides.slice()})),s(N.prototype,"get",(function(){var t,s;for(t=this._offset,s=0;s<arguments.length;s++)t+=this._strides[s]*arguments[s];return this._accessors?this._buffer.get(t):this._buffer[t]})),s(N.prototype,"iget",(function(t){var s,e,i,r,n,h;if(0===(i=this._ndims))return this._accessors?this._buffer.get(this._offset):this._buffer[this._offset];if(this._flags.ROW_MAJOR_CONTIGUOUS||this._flags.COLUMN_MAJOR_CONTIGUOUS){if(1===this._iterationOrder)return this._accessors?this._buffer.get(this._offset+t):this._buffer[this._offset+t];if(-1===this._iterationOrder)return this._accessors?this._buffer.get(this.offset-t):this._buffer[this._offset-t]}if(e=this._shape,s=this._strides,r=this._offset,"column-major"===this._order){for(h=0;h<i;h++)t-=n=t%e[h],t/=e[h],r+=n*s[h];return this._accessors?this._buffer.get(r):this._buffer[r]}for(h=i-1;h>=0;h--)t-=n=t%e[h],t/=e[h],r+=n*s[h];return this._accessors?this._buffer.get(r):this._buffer[r]})),s(N.prototype,"set",(function(){var t,s;for(t=this._offset,s=0;s<arguments.length-1;s++)t+=this._strides[s]*arguments[s];return this._accessors?this._buffer.set(arguments[s],t):this._buffer[t]=arguments[s],this})),s(N.prototype,"iset",(function(t,s){var e,i,r,n,h,o;if(0===(r=this._ndims))return this._accessors?this._buffer.set(t,this._offset):this._buffer[this._offset]=t,this;if(this._flags.ROW_MAJOR_CONTIGUOUS||this._flags.COLUMN_MAJOR_CONTIGUOUS){if(1===this._iterationOrder)return this._accessors?this._buffer.set(s,this._offset+t):this._buffer[this._offset+t]=s,this;if(-1===this._iterationOrder)return this._accessors?this._buffer.set(s,this._offset-t):this._buffer[this._offset-t]=s,this}if(i=this._shape,e=this._strides,n=this._offset,"column-major"===this._order){for(o=0;o<r;o++)t-=h=t%i[o],t/=i[o],n+=h*e[o];return this._accessors?this._buffer.set(s,n):this._buffer[n]=s,this}for(o=r-1;o>=0;o--)t-=h=t%i[o],t/=i[o],n+=h*e[o];return this._accessors?this._buffer.set(s,n):this._buffer[n]=s,this})),s(N.prototype,"toString",(function(){var t,s,e,i,r,n,h;if(s=this._shape.length,i="ndarray( '"+(r=this._dtype)+"', ",t="",this._length<=100)if("complex64"===r||"complex128"===r)for(h=0;h<this._length;h++)n=this.iget(h),t+=f(n)+", "+a(n),h<this._length-1&&(t+=", ");else for(h=0;h<this._length;h++)t+=this.iget(h),h<this._length-1&&(t+=", ");else{if("complex64"===r||"complex128"===r)for(h=0;h<3;h++)n=this.iget(h),t+=f(n)+", "+a(n),h<2&&(t+=", ");else for(h=0;h<3;h++)t+=this.iget(h),h<2&&(t+=", ");if(t+=", ..., ","complex64"===r||"complex128"===r)for(h=2;h>=0;h--)n=this.iget(this._length-1-h),t+=f(n)+", "+a(n),h>0&&(t+=", ");else for(h=2;h>=0;h--)t+=this.iget(this._length-1-h),h>0&&(t+=", ")}if(e=O[this.dtype],i+=_(e,"{{data}}",t),i+=", ",i+=0===s?"[]":"[ "+this._shape.join(", ")+" ]",i+=", ",i+="[ ",0===s)i+="0";else for(h=0;h<s;h++)this._strides[h]<0?i+=-this._strides[h]:i+=this._strides[h],h<s-1&&(i+=", ");return i+=" ]",i+=", ",i+="0",i+=", ",i+="'"+this._order+"'",i+=" )"})),s(N.prototype,"toJSON",(function(){var t,s,e,i;for(s=this._length,(t={}).type="ndarray",t.dtype=this.dtype,t.flags={READONLY:this._flags.READONLY},t.order=this._order,t.shape=this._shape.slice(),t.strides=this._strides.slice(),i=0;i<t.strides.length;i++)t.strides[i]<0&&(t.strides[i]*=-1);if(t.data=[],"complex64"===t.dtype||"complex128"===t.dtype)for(i=0;i<s;i++)e=this.iget(i),t.data.push(f(e),a(e));else for(i=0;i<s;i++)t.data.push(this.iget(i));return t})),s(N.prototype,"__array_meta_dataview__",t()?function(){var t,s,e,i,r,n,h,o,f,a,_,u,c,g;if(f=this._mode||"throw",h=this._submode||[f],e=33+16*(u=this._ndims)+(c=h.length),(o=this.__meta_dataview__)&&o.byteLength===e)return o;for(o=new l(new m(e)),r=this._shape,n=this._strides,i=this._dtype,t=this._bytesPerElement,a=0,o.setInt8(a,d?1:0),a+=1,o.setInt16(a,x[i],d),a+=2,o.setBigInt64(a,p(u),d),_=8*u,a+=8,g=0;g<u;g++)o.setBigInt64(a,p(r[g]),d),o.setBigInt64(a+_,p(n[g]*t),d),a+=8;for(a+=_,o.setBigInt64(a,p(this._offset*t),d),a+=8,o.setInt8(a,I[this._order]),a+=1,o.setInt8(a,w[f]),a+=1,o.setBigInt64(a,p(c),d),a+=8,g=0;g<c;g++)o.setInt8(a,w[h[g]]),a+=1;return s=0,s|=this._flags.READONLY?4:0,o.setInt32(a,s,d),this.__meta_dataview__=o,o}:function(){var t,s,e,i,r,n,h,o,f,a,_,p,u,c,g;if(a=this._mode||"throw",o=this._submode||[a],i=33+16*(u=this._ndims)+(c=o.length),(f=this.__meta_dataview__)&&f.byteLength===i)return f;for(f=new l(new m(i)),s=new b(f.buffer),n=this._shape,h=this._strides,r=this._dtype,t=this._bytesPerElement,_=0,f.setInt8(_,d?1:0),_+=1,f.setInt16(_,A[r],d),y(u,s,1,_+=2),p=8*u,_+=8,g=0;g<u;g++)y(n[g],s,1,_),y(h[g]*t,s,1,_+p),_+=8;for(_+=p,y(this._offset*t,s,1,_),_+=8,f.setInt8(_,U[this._order]),_+=1,f.setInt8(_,E[a]),y(c,s,1,_+=1),_+=8,g=0;g<c;g++)f.setInt8(_,E[o[g]]),_+=1;return e=0,e|=this._flags.READONLY?4:0,f.setInt32(_,e,d),this.__meta_dataview__=f,f});export{N as default};
//# sourceMappingURL=index.mjs.map
