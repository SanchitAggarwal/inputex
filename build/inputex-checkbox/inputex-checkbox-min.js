YUI.add("inputex-checkbox",function(e,t){var n=e.Lang,r=e.inputEx;r.CheckBox=function(e){r.CheckBox.superclass.constructor.call(this,e)},e.extend(r.CheckBox,r.Field,{setOptions:function(e){r.CheckBox.superclass.setOptions.call(this,e),this.options.className=e.className?e.className:"inputEx-Field inputEx-CheckBox",this.options.rightLabel=e.rightLabel||"",this.sentValues=e.sentValues||[!0,!1],this.options.sentValues=this.sentValues,this.checkedValue=this.sentValues[0],this.uncheckedValue=this.sentValues[1]},renderComponent:function(){var t=this.divEl.id?this.divEl.id+"-field":e.guid();this.el=r.cn("input",{id:t,type:"checkbox"}),this.fieldContainer.appendChild(this.el),this.rightLabelEl=r.cn("label",{"for":t,className:"inputEx-CheckBox-rightLabel"},null,this.options.rightLabel),this.fieldContainer.appendChild(this.rightLabelEl),this.hiddenEl=r.cn("input",{type:"hidden",name:this.options.name||"",value:this.uncheckedValue}),this.fieldContainer.appendChild(this.hiddenEl)},initEvents:function(){e.UA.ie?e.one(this.el).on("click",function(t){e.later(10,this,function(){this.onChange(t)})},this):e.one(this.el).on("change",this.onChange,this,!0),e.one(this.el).on("focus",this.onFocus,this,!0),e.one(this.el).on("blur",this.onBlur,this,!0)},onChange:function(e){this.hiddenEl.value=this.el.checked?this.checkedValue:this.uncheckedValue,r.CheckBox.superclass.onChange.call(this,e)},getValue:function(){return this.el.checked?this.checkedValue:this.uncheckedValue},setValue:function(t,n){t===this.checkedValue||typeof t=="string"&&typeof this.checkedValue=="boolean"&&t===String(this.checkedValue)?(this.hiddenEl.value=this.checkedValue,this.el.checked=!0,e.UA.ie===6&&this.el.setAttribute("defaultChecked","checked")):(this.hiddenEl.value=this.uncheckedValue,this.el.checked=!1,e.UA.ie===6&&this.el.removeAttribute("defaultChecked")),r.CheckBox.superclass.setValue.call(this,t,n)},disable:function(){this.el.disabled=!0},enable:function(){this.el.disabled=!1}}),r.registerType("boolean",r.CheckBox,[{type:"string",label:"Right Label",name:"rightLabel"}])},"@VERSION@",{requires:["inputex-field"],ix_provides:"boolean",skinnable:!0});
