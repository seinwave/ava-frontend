(this["webpackJsonpava-frontend"]=this["webpackJsonpava-frontend"]||[]).push([[0],{21:function(e,t,n){e.exports=n(46)},26:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(20),c=n.n(o),s=(n(26),n(2)),i=n.n(s),l=n(3),u=n(4),p=n(5),v=n(7),m=n(6),h=n(10),d=function(e){Object(v.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this)).state={props:e},a}return Object(p.a)(n,[{key:"backendRenamer",value:function(){var e=Object(l.a)(i.a.mark((function e(t,n){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=JSON.stringify({file:t,newName:n}),console.log(a),e.next=4,fetch("https://ava-backend.herokuapp.com/conversations",{headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},body:a,method:"PUT"});case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"handleKeyPress",value:function(e){13===e.charCode&&(e.preventDefault(),this.frontendRenamer(e))}},{key:"frontendRenamer",value:function(e){if(""===e.target.value)return console.log("no input");var t=Object(h.a)(this.props.conversations).filter((function(t){return t.id===e.target.placeholder}));return e.target.placeholder=e.target.value,this.backendRenamer(t,e.target.value),t[0].id=e.target.placeholder,e.target.value=""}},{key:"conversationDeleter",value:function(e){var t=Object(h.a)(this.props.conversations),n=t.filter((function(t){return t.id===e})),a=t.indexOf(n[0]);this.props.conversations.splice(a,1),this.setState({conversations:this.props.conversations})}},{key:"starToggler",value:function(e){var t=this.props.conversations.filter((function(t){return t.id===e}));return t[0].star?t[0].star=!t[0].star:t[0].star=!0,this.setState({conversations:this.props.conversations})}},{key:"clickStopper",value:function(e){e.stopPropagation()}},{key:"buttonClick",value:function(){var e=Object(l.a)(i.a.mark((function e(t){var n,a,r,o,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.stopPropagation(),"delete"!==t.target.id){e.next=10;break}return n=t.target.parentElement.parentElement.firstChild.firstChild[0].placeholder,a=JSON.stringify({file:n}),this.conversationDeleter(n),e.next=7,fetch("https://ava-backend.herokuapp.com/conversations",{headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},body:a,method:"DELETE"});case 7:return e.abrupt("return",e.sent);case 10:if("new"!==t.target.id){e.next=20;break}return r="NewConversation"+Date.now(),console.log(r),this.setState({conversations:this.props.conversations.push({id:r})}),o=JSON.stringify({file:r}),e.next=17,fetch("https://ava-backend.herokuapp.com/conversations",{headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},body:o,method:"POST"});case 17:return e.abrupt("return",e.sent);case 20:return c=t.target.parentElement.parentElement.firstChild.firstChild[0].placeholder,e.abrupt("return",this.starToggler(c));case 22:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"rowClick",value:function(e){var t=e.target.firstChild.firstChild.firstChild.placeholder;return this.props.onRouteChange(t)}},{key:"render",value:function(){var e=this,t=this.props.conversations,n="";return r.a.createElement("div",{className:"container conv-list-container"},r.a.createElement("div",{className:"row conv-list-ops-row"},r.a.createElement("div",{className:"column conv-list-ops-column"},r.a.createElement("button",{onClick:function(t){e.buttonClick(t)},id:"new",className:"new-button"},"New+"))),r.a.createElement("div",{className:"column conv-list-column"},t.map((function(t,a){return n=!0===t.star?"star-filled.svg":"star.svg",r.a.createElement("div",{className:"row conv-list-row",key:"".concat(a),onClick:function(t){return e.rowClick(t)}},r.a.createElement("div",{className:"column conv-title-column"},r.a.createElement("form",{onSubmit:e.handleSubmit},r.a.createElement("input",{id:"conversation-titles",maxLength:"30",placeholder:"".concat(t.id),type:"textarea",onClick:function(t){e.clickStopper(t)},onBlur:function(t){e.frontendRenamer(t)},onKeyPress:function(t){return e.handleKeyPress(t)}}))),r.a.createElement("div",{className:"column conv-buttons-column"},r.a.createElement("img",{onClick:function(t){e.buttonClick(t)},alt:"star",src:"./assets/".concat(n),id:"star",className:"star-button"}),r.a.createElement("button",{id:"delete",onClick:function(t){e.buttonClick(t)},className:"delete-button"},"Delete")))}))))}}]),n}(r.a.Component),f=n(8),b=n(9),g=n.n(b),k=function(e){Object(v.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).handleInput=a.handleInput.bind(Object(f.a)(a)),a}return Object(p.a)(n,[{key:"textEntered",value:function(){var e=Object(l.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g.a.get("https://ava-backend.herokuapp.com/info");case 3:return n=e.sent,e.abrupt("return",console.log(n.data.author));case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",console.log(e.t0));case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}()},{key:"starToggler",value:function(e){var t=this.props.conversations.filter((function(t){return t.id===e}));return t[0].star?t[0].star=!t[0].star:t[0].star=!0,this.setState({conversations:this.props.conversations})}},{key:"starClick",value:function(e){var t=e.target.parentElement.textContent;this.starToggler(t)}},{key:"handleInput",value:function(e){this.textEntered(e.target.value)}},{key:"render",value:function(){var e=this,t=this.props,n=t.route,a=t.conversations.filter((function(e){return e.id===n}));if(console.log(a),!0===a[0].star)var o="star-filled.svg";else o="star.svg";return r.a.createElement("div",{className:"container conv-container"},r.a.createElement("div",{className:"row conv-input-ops-row"},r.a.createElement("div",{className:"column conv-input-ops-column"},r.a.createElement("button",{onClick:function(t){e.props.onRouteChange("home")},id:"new",className:"home-button"}," \u2190Home"))),r.a.createElement("div",{className:"column conv-column"},r.a.createElement("div",{className:"row conv-label-row"},r.a.createElement("div",{className:"column conv-label-column"},r.a.createElement("img",{onClick:function(t){e.starClick(t)},alt:"star",src:"./assets/".concat(o),id:"star",className:"star-button"}),r.a.createElement("p",null,"".concat(a[0].id))),r.a.createElement("div",{className:"column conv-last-mutation-column"},r.a.createElement("p",null,"what if the last mutation is a really really really really really really really really long mutation"))),r.a.createElement("div",{className:"conv-border"}),r.a.createElement("div",{className:"row conv-operations-row"},r.a.createElement("button",null,"undo")),r.a.createElement("div",{className:"row conv-row"},r.a.createElement("textarea",{onKeyPress:this.handleInput,className:"conv-input",placeholder:"start typing...",defaultValue:"".concat(a[0].content)}))))}}]),n}(r.a.Component),C=(n(45),function(e){Object(v.a)(n,e);var t=Object(m.a)(n);function n(){var e;return Object(u.a)(this,n),(e=t.call(this)).onRouteChange=function(t){return console.log(e.state.route),e.setState({route:t})},e.state={conversations:[],route:"home"},e}return Object(p.a)(n,[{key:"getConversations",value:function(){var e=Object(l.a)(i.a.mark((function e(){var t=this;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g.a.get("https://ava-backend.herokuapp.com/conversations");case 3:e.sent.data.forEach((function(e){return t.setState({conversations:t.state.conversations.concat(e)})})),e.next=10;break;case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",console.log(e.t0));case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){this.getConversations()}},{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){var e=this.state.route;return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("h1",null,"The Collabatron"),"home"===e?r.a.createElement(d,Object.assign({},this.state,{buttonClick:this.buttonClick,onRouteChange:this.onRouteChange,getConversations:this.getConversations})):r.a.createElement(k,Object.assign({},this.state,{buttonClick:this.buttonClick,onRouteChange:this.onRouteChange}))))}}]),n}(r.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[21,1,2]]]);
//# sourceMappingURL=main.eee7f6b4.chunk.js.map