YUI.add("inputex-radio",function(e,t){var n=e.Lang,r=e.inputEx;r.RadioField=function(t){r.RadioField.superclass.constructor.call(this,t);if(e.UA.ie&&!n.isUndefined(this.options.value)){var i=this;setTimeout(function(){i.setValue(i.options.value,!1)},0)}},e.extend(r.RadioField,r.Field,{setOptions:function(e){var t,i;r.RadioField.superclass.setOptions.call(this,e),this.options.display=e.display==="vertically"?"vertically":"inline",this.options.className=e.className?e.className:"inputEx-Field inputEx-RadioField",this.options.display==="vertically"&&(this.options.className+=" inputEx-RadioField-Vertically");if(n.isArray(e.values)){this.options.choices=[];for(t=0,i=e.values.length;t<i;t+=1)this.options.choices.push({value:e.values[t],label:e.choices[t]})}else this.options.choices=e.choices;n.isUndefined(e.allowAny)||e.allowAny===!1?this.options.allowAny=!1:(this.options.allowAny={},n.isArray(e.allowAny.separators)&&(this.options.allowAny.separators=e.allowAny.separators),this.options.allowAny.validator=n.isFunction(e.allowAny.validator)?e.allowAny.validator:function(e){return!0},this.options.allowAny.value=n.isUndefined(e.allowAny.value)?"":e.allowAny.value,this.options.allowAny.field=n.isUndefined(e.allowAny.field)?{type:"string",value:this.options.allowAny.value}:e.allowAny.field)},renderComponent:function(){var t,n,i,s;this.choicesList=[],t=this.options.choices;if(!t)throw new Error("Missing 'choices' property in options");for(i=0,n=t.length;i<n;i+=1)this.addChoice(t[i]);this.options.allowAny&&(this.allowAnyChoice=this.addChoice({value:this.options.allowAny.value,label:""}),this.radioAny=this.allowAnyChoice.node.firstChild,this.anyField=new r(this.options.allowAny.field),this.anyField.disable(),e.one(this.radioAny).setStyle("float","left"),e.one(this.anyField.getEl()).setStyle("float","left"),e.UA.gecko>=1.91&&e.one(this.radioAny).setStyle("marginTop","0.2em"),this.options.allowAny.separators&&(s=r.cn("div",null,{marginRight:"3px"},this.options.allowAny.separators[0]||""),e.one(s).setStyle("float","left"),this.allowAnyChoice.node.appendChild(s)),this.allowAnyChoice.node.appendChild(this.anyField.getEl()),this.options.allowAny.separators&&(s=r.cn("div",null,{marginLeft:"3px"},this.options.allowAny.separators[1]||""),e.one(s).setStyle("float","left"),this.allowAnyChoice.node.appendChild(s)))},initEvents:function(){var t=e.one(this.fieldContainer),n=this;t.delegate(e.UA.ie?"click":"change",function(e,t,r){n.onChange(e)},".inputEx-RadioField-radio","input"),t.delegate("focusin",function(e,t,r){n.onFocus(e)},".inputEx-RadioField-radio","input"),t.delegate("focusout",function(e,t,r){n.onBlur(e)},".inputEx-RadioField-radio","input"),this.allowAnyChoice&&(this.anyField.on("updated",function(e,t){var n=t[0];this.radioAny.value=n,this.setClassFromState(),r.RadioField.superclass.onChange.call(this,e)},this,!0),this.anyField.el&&e.one(this.anyField.el).on("blur",this.onBlur,this,!0))},setSelectedClass:function(){var t,n;for(t=0,n=this.choicesList.length;t<n;t+=1)this.choicesList[t].node.firstChild.checked?e.one(this.choicesList[t].node).addClass("inputEx-selected"):e.one(this.choicesList[t].node).removeClass("inputEx-selected")},setClassFromState:function(){r.RadioField.superclass.setClassFromState.call(this),this.setSelectedClass()},onChange:function(e){var t=e.target._node;if(this.allowAnyChoice){var i=r.indexOf(t,this.choicesList,function(e,t){return e===t.node.firstChild})!==-1&&this.radioAny===t;i?(this.anyField.enable(),n.later(50,this.anyField,"focus")):this.anyField.disable()}this.setSelectedClass(),r.RadioField.superclass.onChange.call(this,e)},getValue:function(){var e,t;for(e=0,t=this.choicesList.length;e<t;e+=1)if(this.choicesList[e].node.firstChild.checked)return this.radioAny&&this.radioAny==this.choicesList[e].node.firstChild?this.anyField.getValue():this.choicesList[e].value;return""},setValue:function(e,t){var n=!0,i=!1,s,o;for(s=0,o=this.choicesList.length;s<o;s+=1)e===this.choicesList[s].value&&!i?(this.choicesList[s].node.firstChild.checked=!0,n=this.radioAny&&s===o-1?!0:!1,i=!0):this.choicesList[s].node.firstChild.checked=!1;this.radioAny&&(n?(this.radioAny.checked=!0,this.radioAny.value=e,this.anyField.enable(),this.anyField.setValue(e,!1)):this.anyField.disable()),r.RadioField.superclass.setValue.call(this,e,t)},clear:function(e){this.radioAny&&this.anyField.setValue(this.options.allowAny.value,!1),r.RadioField.superclass.clear.call(this,e)},isEmpty:function(){var e,t,n;for(e=0,t=this.choicesList.length;e<t;e+=1){n=this.choicesList[e].node.firstChild;if(n.checked)return this.radioAny&&this.radioAny==n?this.anyField.getValue()==="":!1}return!0},validate:function(){var e,t,n,r;if(this.options.allowAny)for(e=0,t=this.choicesList.length;e<t;e+=1){n=this.choicesList[e].node.firstChild;if(n.checked&&this.radioAny&&this.radioAny==n)return r=this.anyField.getValue(),this.anyField.validate()&&this.options.allowAny.validator(r)}return!0},disable:function(){var e,t;for(e=0,t=this.choicesList.length;e<t;e+=1)this.disableChoice(this.choicesList[e],!1)},enable:function(){var e,t;for(e=0,t=this.choicesList.length;e<t;e+=1)this.enableChoice(this.choicesList[e])},createChoiceNode:function(e){var t,n,i,s;return t=r.cn("div",{className:"inputEx-RadioField-choice"}),r.RadioField._idCounter||(r.RadioField._idCounter=0),n="_inputex_radioId"+r.RadioField._idCounter,r.RadioField._idCounter++,i=r.cn("input",{id:n,type:"radio",name:this.options.name,value:e.value,className:"inputEx-RadioField-radio"}),t.appendChild(i),e.label.length>0&&(s=r.cn("label",{"for":n,className:"inputEx-RadioField-rightLabel"},null,""+e.label),t.appendChild(s)),t},removeChoiceNode:function(e){this.fieldContainer.removeChild(e)},disableChoiceNode:function(e){e.firstChild.disabled=!0},enableChoiceNode:function(e){e.firstChild.disabled=!1},appendChoiceNode:function(t,n){var r,i;r=0;for(i=0;i<n;i+=1)this.choicesList[i].visible&&(r+=1);r<this.fieldContainer.childNodes.length?e.one(this.fieldContainer).insertBefore(t,this.fieldContainer.childNodes[r]):this.fieldContainer.appendChild(t)}}),e.mix(r.RadioField.prototype,r.mixin.choice),r.registerType("radio",r.RadioField,[{type:"list",name:"choices",label:"Choices",elementType:{type:"group",fields:[{label:"Value",name:"value",value:""},{label:"Label",name:"label"}]},value:[],required:!0},{type:"boolean",label:"Allow custom value",name:"allowAny",value:!1}])},"@VERSION@",{requires:["selector","event-delegate","inputex-field","inputex-choice","inputex-string"],ix_provides:"radio"});
