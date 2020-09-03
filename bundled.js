/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const A="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,g=(A,g,I=null)=>{for(;g!==I;){const I=g.nextSibling;A.removeChild(g),g=I}},I=`{{lit-${String(Math.random()).slice(2)}}}`,C=`\x3c!--${I}--\x3e`,k=new RegExp(`${I}|${C}`);class S{constructor(A,g){this.parts=[],this.element=g;const C=[],S=[],Q=document.createTreeWalker(g.content,133,null,!1);let j=0,a=-1,J=0;const{strings:i,values:{length:t}}=A;for(;J<t;){const A=Q.nextNode();if(null!==A){if(a++,1===A.nodeType){if(A.hasAttributes()){const g=A.attributes,{length:I}=g;let C=0;for(let A=0;A<I;A++)B(g[A].name,"$lit$")&&C++;for(;C-- >0;){const g=i[J],I=R.exec(g)[2],C=I.toLowerCase()+"$lit$",S=A.getAttribute(C);A.removeAttribute(C);const B=S.split(k);this.parts.push({type:"attribute",index:a,name:I,strings:B}),J+=B.length-1}}"TEMPLATE"===A.tagName&&(S.push(A),Q.currentNode=A.content)}else if(3===A.nodeType){const g=A.data;if(g.indexOf(I)>=0){const I=A.parentNode,S=g.split(k),Q=S.length-1;for(let g=0;g<Q;g++){let C,k=S[g];if(""===k)C=E();else{const A=R.exec(k);null!==A&&B(A[2],"$lit$")&&(k=k.slice(0,A.index)+A[1]+A[2].slice(0,-"$lit$".length)+A[3]),C=document.createTextNode(k)}I.insertBefore(C,A),this.parts.push({type:"node",index:++a})}""===S[Q]?(I.insertBefore(E(),A),C.push(A)):A.data=S[Q],J+=Q}}else if(8===A.nodeType)if(A.data===I){const g=A.parentNode;null!==A.previousSibling&&a!==j||(a++,g.insertBefore(E(),A)),j=a,this.parts.push({type:"node",index:a}),null===A.nextSibling?A.data="":(C.push(A),a--),J++}else{let g=-1;for(;-1!==(g=A.data.indexOf(I,g+1));)this.parts.push({type:"node",index:-1}),J++}}else Q.currentNode=S.pop()}for(const A of C)A.parentNode.removeChild(A)}}const B=(A,g)=>{const I=A.length-g.length;return I>=0&&A.slice(I)===g},Q=A=>-1!==A.index,E=()=>document.createComment(""),R=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function j(A,g){const{element:{content:I},parts:C}=A,k=document.createTreeWalker(I,133,null,!1);let S=J(C),B=C[S],Q=-1,E=0;const R=[];let j=null;for(;k.nextNode();){Q++;const A=k.currentNode;for(A.previousSibling===j&&(j=null),g.has(A)&&(R.push(A),null===j&&(j=A)),null!==j&&E++;void 0!==B&&B.index===Q;)B.index=null!==j?-1:B.index-E,S=J(C,S),B=C[S]}R.forEach(A=>A.parentNode.removeChild(A))}const a=A=>{let g=11===A.nodeType?0:1;const I=document.createTreeWalker(A,133,null,!1);for(;I.nextNode();)g++;return g},J=(A,g=-1)=>{for(let I=g+1;I<A.length;I++){const g=A[I];if(Q(g))return I}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const i=new WeakMap,t=A=>"function"==typeof A&&i.has(A),G={},D={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class H{constructor(A,g,I){this.A=[],this.template=A,this.processor=g,this.options=I}update(A){let g=0;for(const I of this.A)void 0!==I&&I.setValue(A[g]),g++;for(const A of this.A)void 0!==A&&A.commit()}_clone(){const g=A?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),I=[],C=this.template.parts,k=document.createTreeWalker(g,133,null,!1);let S,B=0,E=0,R=k.nextNode();for(;B<C.length;)if(S=C[B],Q(S)){for(;E<S.index;)E++,"TEMPLATE"===R.nodeName&&(I.push(R),k.currentNode=R.content),null===(R=k.nextNode())&&(k.currentNode=I.pop(),R=k.nextNode());if("node"===S.type){const A=this.processor.handleTextExpression(this.options);A.insertAfterNode(R.previousSibling),this.A.push(A)}else this.A.push(...this.processor.handleAttributeExpressions(R,S.name,S.strings,this.options));B++}else this.A.push(void 0),B++;return A&&(document.adoptNode(g),customElements.upgrade(g)),g}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const U=` ${I} `;class w{constructor(A,g,I,C){this.strings=A,this.values=g,this.type=I,this.processor=C}getHTML(){const A=this.strings.length-1;let g="",k=!1;for(let S=0;S<A;S++){const A=this.strings[S],B=A.lastIndexOf("\x3c!--");k=(B>-1||k)&&-1===A.indexOf("--\x3e",B+1);const Q=R.exec(A);g+=null===Q?A+(k?U:C):A.substr(0,Q.index)+Q[1]+Q[2]+"$lit$"+Q[3]+I}return g+=this.strings[A],g}getTemplateElement(){const A=document.createElement("template");return A.innerHTML=this.getHTML(),A}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const c=A=>null===A||!("object"==typeof A||"function"==typeof A),o=A=>Array.isArray(A)||!(!A||!A[Symbol.iterator]);class M{constructor(A,g,I){this.dirty=!0,this.element=A,this.name=g,this.strings=I,this.parts=[];for(let A=0;A<I.length-1;A++)this.parts[A]=this._createPart()}_createPart(){return new p(this)}_getValue(){const A=this.strings,g=A.length-1;let I="";for(let C=0;C<g;C++){I+=A[C];const g=this.parts[C];if(void 0!==g){const A=g.value;if(c(A)||!o(A))I+="string"==typeof A?A:String(A);else for(const g of A)I+="string"==typeof g?g:String(g)}}return I+=A[g],I}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class p{constructor(A){this.value=void 0,this.committer=A}setValue(A){A===G||c(A)&&A===this.value||(this.value=A,t(A)||(this.committer.dirty=!0))}commit(){for(;t(this.value);){const A=this.value;this.value=G,A(this)}this.value!==G&&this.committer.commit()}}class W{constructor(A){this.value=void 0,this.g=void 0,this.options=A}appendInto(A){this.startNode=A.appendChild(E()),this.endNode=A.appendChild(E())}insertAfterNode(A){this.startNode=A,this.endNode=A.nextSibling}appendIntoPart(A){A.I(this.startNode=E()),A.I(this.endNode=E())}insertAfterPart(A){A.I(this.startNode=E()),this.endNode=A.endNode,A.endNode=this.startNode}setValue(A){this.g=A}commit(){if(null===this.startNode.parentNode)return;for(;t(this.g);){const A=this.g;this.g=G,A(this)}const A=this.g;A!==G&&(c(A)?A!==this.value&&this.C(A):A instanceof w?this.k(A):A instanceof Node?this.S(A):o(A)?this.B(A):A===D?(this.value=D,this.clear()):this.C(A))}I(A){this.endNode.parentNode.insertBefore(A,this.endNode)}S(A){this.value!==A&&(this.clear(),this.I(A),this.value=A)}C(A){const g=this.startNode.nextSibling,I="string"==typeof(A=null==A?"":A)?A:String(A);g===this.endNode.previousSibling&&3===g.nodeType?g.data=I:this.S(document.createTextNode(I)),this.value=A}k(A){const g=this.options.templateFactory(A);if(this.value instanceof H&&this.value.template===g)this.value.update(A.values);else{const I=new H(g,A.processor,this.options),C=I._clone();I.update(A.values),this.S(C),this.value=I}}B(A){Array.isArray(this.value)||(this.value=[],this.clear());const g=this.value;let I,C=0;for(const k of A)I=g[C],void 0===I&&(I=new W(this.options),g.push(I),0===C?I.appendIntoPart(this):I.insertAfterPart(g[C-1])),I.setValue(k),I.commit(),C++;C<g.length&&(g.length=C,this.clear(I&&I.endNode))}clear(A=this.startNode){g(this.startNode.parentNode,A.nextSibling,this.endNode)}}class F{constructor(A,g,I){if(this.value=void 0,this.g=void 0,2!==I.length||""!==I[0]||""!==I[1])throw new Error("Boolean attributes can only contain a single expression");this.element=A,this.name=g,this.strings=I}setValue(A){this.g=A}commit(){for(;t(this.g);){const A=this.g;this.g=G,A(this)}if(this.g===G)return;const A=!!this.g;this.value!==A&&(A?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=A),this.g=G}}class N extends M{constructor(A,g,I){super(A,g,I),this.single=2===I.length&&""===I[0]&&""===I[1]}_createPart(){return new x(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class x extends p{}let b=!1;(()=>{try{const A={get capture(){return b=!0,!1}};window.addEventListener("test",A,A),window.removeEventListener("test",A,A)}catch(A){}})();class Y{constructor(A,g,I){this.value=void 0,this.g=void 0,this.element=A,this.eventName=g,this.eventContext=I,this.R=A=>this.handleEvent(A)}setValue(A){this.g=A}commit(){for(;t(this.g);){const A=this.g;this.g=G,A(this)}if(this.g===G)return;const A=this.g,g=this.value,I=null==A||null!=g&&(A.capture!==g.capture||A.once!==g.once||A.passive!==g.passive),C=null!=A&&(null==g||I);I&&this.element.removeEventListener(this.eventName,this.R,this.j),C&&(this.j=V(A),this.element.addEventListener(this.eventName,this.R,this.j)),this.value=A,this.g=G}handleEvent(A){"function"==typeof this.value?this.value.call(this.eventContext||this.element,A):this.value.handleEvent(A)}}const V=A=>A&&(b?{capture:A.capture,passive:A.passive,once:A.once}:A.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function P(A){let g=K.get(A.type);void 0===g&&(g={stringsArray:new WeakMap,keyString:new Map},K.set(A.type,g));let C=g.stringsArray.get(A.strings);if(void 0!==C)return C;const k=A.strings.join(I);return C=g.keyString.get(k),void 0===C&&(C=new S(A,A.getTemplateElement()),g.keyString.set(k,C)),g.stringsArray.set(A.strings,C),C}const K=new Map,l=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const T=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(A,g,I,C){const k=g[0];if("."===k){return new N(A,g.slice(1),I).parts}if("@"===k)return[new Y(A,g.slice(1),C.eventContext)];if("?"===k)return[new F(A,g.slice(1),I)];return new M(A,g,I).parts}handleTextExpression(A){return new W(A)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const h=(A,...g)=>new w(A,g,"html",T)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,O=(A,g)=>`${A}--${g}`;let d=!0;void 0===window.ShadyCSS?d=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),d=!1);const y=A=>g=>{const C=O(g.type,A);let k=K.get(C);void 0===k&&(k={stringsArray:new WeakMap,keyString:new Map},K.set(C,k));let B=k.stringsArray.get(g.strings);if(void 0!==B)return B;const Q=g.strings.join(I);if(B=k.keyString.get(Q),void 0===B){const I=g.getTemplateElement();d&&window.ShadyCSS.prepareTemplateDom(I,A),B=new S(g,I),k.keyString.set(Q,B)}return k.stringsArray.set(g.strings,B),B},e=["html","svg"],Z=new Set,m=(A,g,I)=>{Z.add(A);const C=I?I.element:document.createElement("template"),k=g.querySelectorAll("style"),{length:S}=k;if(0===S)return void window.ShadyCSS.prepareTemplateStyles(C,A);const B=document.createElement("style");for(let A=0;A<S;A++){const g=k[A];g.parentNode.removeChild(g),B.textContent+=g.textContent}(A=>{e.forEach(g=>{const I=K.get(O(g,A));void 0!==I&&I.keyString.forEach(A=>{const{element:{content:g}}=A,I=new Set;Array.from(g.querySelectorAll("style")).forEach(A=>{I.add(A)}),j(A,I)})})})(A);const Q=C.content;I?function(A,g,I=null){const{element:{content:C},parts:k}=A;if(null==I)return void C.appendChild(g);const S=document.createTreeWalker(C,133,null,!1);let B=J(k),Q=0,E=-1;for(;S.nextNode();)for(E++,S.currentNode===I&&(Q=a(g),I.parentNode.insertBefore(g,I));-1!==B&&k[B].index===E;){if(Q>0){for(;-1!==B;)k[B].index+=Q,B=J(k,B);return}B=J(k,B)}}(I,B,Q.firstChild):Q.insertBefore(B,Q.firstChild),window.ShadyCSS.prepareTemplateStyles(C,A);const E=Q.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==E)g.insertBefore(E.cloneNode(!0),g.firstChild);else if(I){Q.insertBefore(B,Q.firstChild);const A=new Set;A.add(B),j(I,A)}};window.JSCompiler_renameProperty=(A,g)=>A;const r={toAttribute(A,g){switch(g){case Boolean:return A?"":null;case Object:case Array:return null==A?A:JSON.stringify(A)}return A},fromAttribute(A,g){switch(g){case Boolean:return null!==A;case Number:return null===A?null:Number(A);case Object:case Array:return JSON.parse(A)}return A}},L=(A,g)=>g!==A&&(g==g||A==A),q={attribute:!0,type:String,converter:r,reflect:!1,hasChanged:L};class n extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=new Promise(A=>this._enableUpdatingResolver=A),this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const A=[];return this._classProperties.forEach((g,I)=>{const C=this._attributeNameForProperty(I,g);void 0!==C&&(this._attributeToPropertyMap.set(C,I),A.push(C))}),A}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const A=Object.getPrototypeOf(this)._classProperties;void 0!==A&&A.forEach((A,g)=>this._classProperties.set(g,A))}}static createProperty(A,g=q){if(this._ensureClassProperties(),this._classProperties.set(A,g),g.noAccessor||this.prototype.hasOwnProperty(A))return;const I="symbol"==typeof A?Symbol():"__"+A,C=this.getPropertyDescriptor(A,I,g);void 0!==C&&Object.defineProperty(this.prototype,A,C)}static getPropertyDescriptor(A,g,I){return{get(){return this[g]},set(I){const C=this[A];this[g]=I,this._requestUpdate(A,C)},configurable:!0,enumerable:!0}}static getPropertyOptions(A){return this._classProperties&&this._classProperties.get(A)||q}static finalize(){const A=Object.getPrototypeOf(this);if(A.hasOwnProperty("finalized")||A.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const A=this.properties,g=[...Object.getOwnPropertyNames(A),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(A):[]];for(const I of g)this.createProperty(I,A[I])}}static _attributeNameForProperty(A,g){const I=g.attribute;return!1===I?void 0:"string"==typeof I?I:"string"==typeof A?A.toLowerCase():void 0}static _valueHasChanged(A,g,I=L){return I(A,g)}static _propertyValueFromAttribute(A,g){const I=g.type,C=g.converter||r,k="function"==typeof C?C:C.fromAttribute;return k?k(A,I):A}static _propertyValueToAttribute(A,g){if(void 0===g.reflect)return;const I=g.type,C=g.converter;return(C&&C.toAttribute||r.toAttribute)(A,I)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((A,g)=>{if(this.hasOwnProperty(g)){const A=this[g];delete this[g],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(g,A)}})}_applyInstanceProperties(){this._instanceProperties.forEach((A,g)=>this[g]=A),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(A,g,I){g!==I&&this._attributeToProperty(A,I)}_propertyToAttribute(A,g,I=q){const C=this.constructor,k=C._attributeNameForProperty(A,I);if(void 0!==k){const A=C._propertyValueToAttribute(g,I);if(void 0===A)return;this._updateState=8|this._updateState,null==A?this.removeAttribute(k):this.setAttribute(k,A),this._updateState=-9&this._updateState}}_attributeToProperty(A,g){if(8&this._updateState)return;const I=this.constructor,C=I._attributeToPropertyMap.get(A);if(void 0!==C){const A=I.getPropertyOptions(C);this._updateState=16|this._updateState,this[C]=I._propertyValueFromAttribute(g,A),this._updateState=-17&this._updateState}}_requestUpdate(A,g){let I=!0;if(void 0!==A){const C=this.constructor,k=C.getPropertyOptions(A);C._valueHasChanged(this[A],g,k.hasChanged)?(this._changedProperties.has(A)||this._changedProperties.set(A,g),!0!==k.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(A,k))):I=!1}!this._hasRequestedUpdate&&I&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(A,g){return this._requestUpdate(A,g),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(A){}const A=this.performUpdate();return null!=A&&await A,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let A=!1;const g=this._changedProperties;try{A=this.shouldUpdate(g),A?this.update(g):this._markUpdated()}catch(g){throw A=!1,this._markUpdated(),g}A&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(g)),this.updated(g))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(A){return!0}update(A){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((A,g)=>this._propertyToAttribute(g,this[g],A)),this._reflectingProperties=void 0),this._markUpdated()}updated(A){}firstUpdated(A){}}n.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const u=(A,g)=>"method"===g.kind&&g.descriptor&&!("value"in g.descriptor)?Object.assign(Object.assign({},g),{finisher(I){I.createProperty(g.key,A)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof g.initializer&&(this[g.key]=g.initializer.call(this))},finisher(I){I.createProperty(g.key,A)}};function X(A){return(g,I)=>void 0!==I?((A,g,I)=>{g.constructor.createProperty(I,A)})(A,g,I):u(A,g)}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const s="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,z=Symbol();class v{constructor(A,g){if(g!==z)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=A}get styleSheet(){return void 0===this._styleSheet&&(s?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const f=(A,...g)=>{const I=g.reduce((g,I,C)=>g+(A=>{if(A instanceof v)return A.cssText;if("number"==typeof A)return A;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${A}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(I)+A[C+1],A[0]);return new v(I,z)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
            progress-container {
                display: grid;
                border: solid black 8px;
                height: 40vh;
                width: 30vw;
            }

            progress-bar {
            }

        `}determineColor(){return"weak"==this.label?f`${kA}`:"medium"==this.label?f`${SA}`:"strong"==this.label?f`${CA}`:(console.error("expected a proper label"),null)}render(){return h`
            ${this.label}
            <progress-container style="background-color: ${this.determineColor()};">
                <progress-bar style="height: ${100-this.count/this.total_count*100}%;background-color: white;">
                ${this.count}/${this.total_count}
                </progress-bar>
            </progress-container>
        `}}xA([X({attribute:"count"})],bA.prototype,"count",void 0),xA([X({attribute:"total_count"})],bA.prototype,"total_count",void 0),xA([X({attribute:"label"})],bA.prototype,"label",void 0),customElements.define("comfort-status-box",bA);customElements.define("comfort-counts",class extends _{constructor(){super(...arguments),this.counts=NA.getCounts()}static get styles(){return f`
            status-header {
                width: 100%
            }
            container {
                display: grid;
                grid-template-columns: auto auto auto;
                grid-gap: 4rem;
            }
            h1 {
                text-align: center;
            }
        `}render(){return h`

        total cards in deck: ${this.counts.total}
        <status-header>
            <h1>great job!</h1>
        </status-header>
        <container>

            <comfort-status-box 
                count="${this.counts.bad}" 
                total_count="${this.counts.total}"
                label="weak">
            </comfort-status-box>
            <comfort-status-box 
                count="${this.counts.medium}" 
                total_count="${this.counts.total}"
                label="medium">
            </comfort-status-box>
            <comfort-status-box
                count="${this.counts.good}"
                total_count="${this.counts.total}"
                label="strong">
            </comfort-status-box>
        </container>
        `}});var YA=function(A,g,I,C){for(var k,S=arguments.length,B=S<3?g:null===C?C=Object.getOwnPropertyDescriptor(g,I):C,Q=A.length-1;Q>=0;Q--)(k=A[Q])&&(B=(S<3?k(B):S>3?k(g,I,B):k(g,I))||B);return S>3&&B&&Object.defineProperty(g,I,B),B};class VA extends _{constructor(){super(...arguments),this.character=""}static get styles(){return f`
        :lang(ja-jp) {
            font-family: Arial, sans-serif;
            line-height: 1.5rem;
        }

        character-card {
            width: 100%;
        }

        container {
            width: 100%;
            box-shadow: 2px 2px 39px -23px;
            background-color: aliceblue;
            display: inline-block;
            align-content: end;
        }

        h1 {
            text-align: center;
            font-size: 6rem;
        }

        .noselect {
            -webkit-touch-callout: none; /* iOS Safari */
              -webkit-user-select: none; /* Safari */
               -khtml-user-select: none; /* Konqueror HTML */
                 -moz-user-select: none; /* Old versions of Firefox */
                  -ms-user-select: none; /* Internet Explorer/Edge */
                      user-select: none; /* Non-prefixed version, currently
                                            supported by Chrome, Edge, Opera and Firefox */
          }

          controls-container * {
              display: grid;
              line-height: 3rem;
              text-align: center;
          }

          controls-container *:hover {
                cursor: pointer;
                color: white;
                background-color: black;
          }

          reveal {
              background-color: ${SA};
          }

          reveal-mnemonic {
              background-color: ${QA};
          }


          SRS-btn-container {
              grid-template-columns: auto auto;
          }

          SRS-btn-container good {
              background-color: ${CA};
          }

          SRS-btn-container bad {
              background-color: ${kA};
          }

          SRS-btn-container h3 {
              grid-column-start: 1;
              grid-column-end: 3;
          }

          next-card {
              background-color: ${BA};
          }

          comfort-counts {
              display: flex;
              width: 100%;
              flex-wrap: wrap;
              justify-content: center;
          }

          btn-container {
            width: 100%;
            display: grid;
            height: 7vh;
          }
    `}clickEvent(A){const g=new CustomEvent("card-event",{detail:A});this.dispatchEvent(g)}handleCardClick(){const A=document.createElement("romaji-reveal");A.setAttribute("romaji",this.character.story),this.shadowRoot&&this.shadowRoot.appendChild(A)}handleSRSGoodClick(){NA.incrementComfortLevel(this.character.story),this.clickEvent("good-click")}handleSRSBadClick(){NA.decrementComfortLevel(this.character.story),this.clickEvent("bad-click")}handleMnemonicClick(){if(!this.character.mnemonic)return;const A=document.createElement("romaji-reveal");A.setAttribute("img",""+this.character.mnemonic),this.shadowRoot&&this.shadowRoot.appendChild(A)}handleNewQueueRequest(){NA.buildQueue(),this.clickEvent("get-new-queue")}renderSRSControls(){return 1!=IA.get().appMode?null:h`
            <SRS-btn-container>
                <bad @click="${this.handleSRSBadClick}">I'm not sure</bad>
                <good @click="${this.handleSRSGoodClick}">I know this</good>
            </SRS-btn-container>
        `}renderInputs(){return h`
            <controls-container>
                <reveal @click="${this.handleCardClick}">hint</reveal>
                ${this.character.mnemonic&&h`<reveal-mnemonic @click="${this.handleMnemonicClick}">mnemonic</reveal-mnemonic>`}
                ${this.renderSRSControls()}
            </controls-container>
        `}renderComfortCounts(){return h`
        <btn-container>
            <button @click="${this.handleNewQueueRequest}">try some more</button>
        </btn-container>
        <comfort-counts></comfort-counts>
        `}render(){return this.character||2!=IA.state.appMode?this.character?h`
        <container @keydown="${A=>{console.log("KEY UP",A)}}" class="noselect">
            <h1 lang="ja-jp">${this.character.keyword}</h1>
            ${this.renderInputs()}
        </container>
      `:this.renderComfortCounts():null}}YA([X({attribute:"character"})],VA.prototype,"character",void 0),customElements.define("character-card",VA);var PA=function(A,g,I,C){for(var k,S=arguments.length,B=S<3?g:null===C?C=Object.getOwnPropertyDescriptor(g,I):C,Q=A.length-1;Q>=0;Q--)(k=A[Q])&&(B=(S<3?k(B):S>3?k(g,I,B):k(g,I))||B);return S>3&&B&&Object.defineProperty(g,I,B),B};class KA extends _{constructor(){super(),this.romaji="",this.img="",this.opacity=95}static get styles(){return f`
        .noselect {
            -webkit-touch-callout: none; /* iOS Safari */
              -webkit-user-select: none; /* Safari */
               -khtml-user-select: none; /* Konqueror HTML */
                 -moz-user-select: none; /* Old versions of Firefox */
                  -ms-user-select: none; /* Internet Explorer/Edge */
                      user-select: none; /* Non-prefixed version, currently
                                            supported by Chrome, Edge, Opera and Firefox */
          }

        container {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            background-color: black;
            color: white;
            text-align: center;
            font-size: 7rem;
            display: grid;
            align-content: center;
            justify-content: center;
        }
    `}fadeAway(){this.randomCardCallback&&this.randomCardCallback(),this.remove()}renderImg(){return this.img?h`
            <img src="data:image/jpg;base64, ${this.img}" />
        `:null}renderRomaji(){return this.romaji?h`
            <h1>${this.romaji}</h1>
        `:null}render(){return h`
        <style>
        container {
            opacity: ${this.opacity}%;
        }
        </style>
        <container @click="${this.fadeAway}" class="noselect">
            ${this.renderRomaji()}
            ${this.renderImg()}
        </container>
      `}}PA([X({attribute:"romaji"})],KA.prototype,"romaji",void 0),PA([X({attribute:"img"})],KA.prototype,"img",void 0),customElements.define("romaji-reveal",KA);customElements.define("kana-controls",class extends _{static get styles(){return f`
        controls-container {
          display: grid;
          margin: 3rem;
          grid-template-columns: auto auto auto;
        }

        toggle-container {
          display: grid;
          height: 5vh;
        }

        .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
          }
          
          .switch input { 
            opacity: 0;
            width: 0;
            height: 0;
          }
          
          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: .4s;
            transition: .4s;
          }
          
          .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
          }
          
          input:checked + .slider {
            background-color: #2196F3;
          }
          
          input:focus + .slider {
            box-shadow: 0 0 1px #2196F3;
          }
          
          input:checked + .slider:before {
            -webkit-transform: translateX(26px);
            -ms-transform: translateX(26px);
            transform: translateX(26px);
          }
          
          /* Rounded sliders */
          .slider.round {
            border-radius: 34px;
          }
          
          .slider.round:before {
            border-radius: 50%;
          }
    `}handleBackToDeckSelection(){0!=IA.get().appMode&&IA.update({appMode:0});const A=new CustomEvent("control-changed",{detail:IA.get()});this.dispatchEvent(A)}resetLocalStorage(){localStorage.removeItem("kanaBoard"),alert("local storage reset"),location.reload()}renderBackToDeckSelection(){return h`
    <toggle-container>
      <button @click="${this.handleBackToDeckSelection}">back</button>
    </toggle-container>
  `}render(){return h`
        <controls-container>
          ${this.renderBackToDeckSelection()}
          <empty-space></empty-space>
          <button @click="${this.resetLocalStorage}"> reset </button>
        </controls-container>
      `}});customElements.define("deck-selection",class extends _{constructor(){super(...arguments),this.decks=NA.getDecks()}static get styles(){return f`
        group-container {
            display: grid;
            grid-template-columns: auto auto;
            grid-gap: 4vw;
        }

        character-card {
            width: 100%;
        }

        deck-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        container {
            width: 100%;
            box-shadow: 2px 2px 39px -23px;
            background-color: aliceblue;
            display: inline-block;
            align-content: end;
            margin-bottom: 4vh;
            width: 80%;
        }

        container:hover {
            background-color: black;
            opacity: .8;
            color: white;
            cursor: pointer;
        }

        h1 {
            text-align: center;
            font-size: 3rem;
        }

        .noselect {
            -webkit-touch-callout: none; /* iOS Safari */
              -webkit-user-select: none; /* Safari */
               -khtml-user-select: none; /* Konqueror HTML */
                 -moz-user-select: none; /* Old versions of Firefox */
                  -ms-user-select: none; /* Internet Explorer/Edge */
                      user-select: none; /* Non-prefixed version, currently
                                            supported by Chrome, Edge, Opera and Firefox */
          }
    `}firstUpdated(){this.decks=NA.getDecks()}handleDeckClick(A,g){const I=new CustomEvent("deck-select",{detail:"Single"});IA.update({appMode:g}),this.dispatchEvent(I)}renderDecks(){return h`
            ${this.decks.map(A=>h`
                <container @click="${A=>this.handleDeckClick(A,1)}" class="noselect">
                    <h1>${A}</h1>
                </container>
                `)}
        `}render(){return h`
        <deck-container>
            ${this.renderDecks()}

            <container @click="${A=>this.handleDeckClick(A,2)}" class="noselect">
                <h1>Hiragana Board</h1>
            </container>
    
            <container @click="${A=>this.handleDeckClick(A,-1)}" class="noselect">
                <h1>Katakana Board</h1>
            </container>
            <container @click="${A=>this.handleDeckClick(A,-1)}" class="noselect">
                <h1>Make a custom deck</h1>
            </container>
        </deck-container>
        `}});customElements.define("hiragana-board",class extends _{static get styles(){return f`
        cards-grid-container {
            display: grid;
            grid-auto-flow: column;
            grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
        }


        top-label {
            display: grid;
            align-items: center;
            text-align: center;
            width: 100%;
        }
        side-label {
            display: grid;
            align-items: center;
            text-align: center;
            width: 100%;
        }

        character-card {
            width: 100%;
        }


        .empty {
            border: 0;
        }
    `}kanaToDeckElement(A){return{keyword:A.kana,story:A.romaji,mnemonic:A.mnemonic,comfort_level:0,last_reviewed:Date.now()}}render(){return h`
        <style>
        character-card {border: solid 2px;}
        </style>
        <cards-grid-container>

            <top-label> * </top-label>
            <character-card .character=${this.kanaToDeckElement(EA.n)}></character-card>
            <character-card class="empty"></character-card>
            <character-card class="empty"></character-card>
            <character-card class="empty"></character-card>
            <character-card class="empty"></character-card>

            <top-label> w </top-label>
            <character-card .character=${this.kanaToDeckElement(EA.wa)}></character-card>
            <character-card class="empty"></character-card>
            <character-card class="empty"></character-card>
            <character-card class="empty"></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.wo)}></character-card>

            <top-label> r </top-label>
            <character-card .character=${this.kanaToDeckElement(EA.ra)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.ri)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.ru)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.re)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.ro)}></character-card>

            <top-label> y </top-label>
            <character-card .character=${this.kanaToDeckElement(EA.ya)}></character-card>
            <character-card class="empty"></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.yu)}></character-card>
            <character-card class="empty"></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.yo)}></character-card>

            <top-label> m </top-label>
            <character-card .character=${this.kanaToDeckElement(EA.ma)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.mi)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.mu)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.me)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.mo)}></character-card>

            <top-label> h </top-label>
            <character-card .character=${this.kanaToDeckElement(EA.ha)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.hi)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.hu)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.he)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.ho)}></character-card>

            <top-label> n </top-label>
            <character-card .character=${this.kanaToDeckElement(EA.na)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.ni)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.nu)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.ne)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.no)}></character-card>

            <top-label> t </top-label>
            <character-card .character=${this.kanaToDeckElement(EA.ta)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.chi)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.tsu)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.te)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.to)}></character-card>

            <top-label> s </top-label>
            <character-card .character=${this.kanaToDeckElement(EA.sa)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.shi)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.su)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.se)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.so)}></character-card>


            <top-label> k </top-label>
            <character-card .character=${this.kanaToDeckElement(EA.ka)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.ki)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.ku)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.ke)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.ko)}></character-card>

            <top-label style="visibility: hidden;"> k </top-label>
            <character-card .character=${this.kanaToDeckElement(EA.a)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.i)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.u)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.e)}></character-card>
            <character-card .character=${this.kanaToDeckElement(EA.o)}></character-card>

            <side-label style="visibility: hidden;">a</side-label>
            <side-label>a</side-label>
            <side-label>i</side-label>
            <side-label>u</side-label>
            <side-label>e</side-label>
            <side-label>o</side-label>
        </cards-grid-container>
    `}});const lA=document.getElementById("hiragana");customElements.define("kana-app",class extends _{updateFromChild(){this.requestUpdate()}renderInputs(){return h`
        <kana-controls 
            @control-changed="${this.updateFromChild}" >
        </kana-controls>
        `}renderSingleCard(){return h`
        <character-card 
            @card-event="${this.updateFromChild}"
            id="singlCard" 
            .character="${NA.getNext()}">
        </character-card>
        `}renderDeckSelection(){return h`
        <deck-selection
            @deck-select="${this.updateFromChild}"
            >
        </deck-selection>
        `}render(){var A=this.renderInputs();switch(IA.get().appMode){case 0:A=h`
                    ${A}
                    ${this.renderDeckSelection()}`;break;case 1:A=h`
                    ${A}
                    ${this.renderSingleCard()}`;break;case 2:A=h`
                    ${A}
                    <hiragana-board></hiragana-board>`;break;default:A=h`${A} not implemented yet`}return A}}),lA&&lA.appendChild(document.createElement("kana-app"));