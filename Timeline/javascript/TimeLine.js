/*
	based : jquery
	author : hongchun.li
	email : bee0873@gmail.com
*/

(function(){
	/*node dataType */
	function NodeData( data ){
		this.time = data.time || "";
		this.title = data.title || "";
		this.content = data.content || "";
		this.href = data.href || "";
	}

	function TimeLine(options){
		this.renderTo = options.renderTo;
		this.spacing = options.spacing || 0;
		this._init();
		this.render();
	} 

	TimeLine.prototype = {
		render : function( element ){
			if(element){
				$(this.element).appendTo(element);
			}
			else if(this.renderTo){
				$(this.element).appendTo(this.renderTo);
			}else{
				throw new Error("You have to defined the option [renderTo] !"); 
			}
		},

		addData : function(data){
			var _this = this ;
			if($.type(data) == "array"){
				$.each( data , function(i , data){
					var node = _this._createNode( new NodeData(data) )
					_this._addNode( node );
				});
			}
			this.flush();
		},

		flush : function(){

			var _this = this;
			var lastNode = $(this.body).find(".timeline-item:last-child").get(0);


			$(this.fragment.childNodes).each(function(i, data){
				$(_this.body).append(this);
				if(lastNode){
					var position = {
						top : parseInt( $(lastNode).css("top") ),
						left : parseInt( $(lastNode).css("left") )
					};
					var lastNodeHeight = $(lastNode).height() ;
					
					if( !$(lastNode).hasClass("timeline-item-inverse") ){
						$(this).addClass("timeline-item-inverse");	
					}
					$(this).css( "top" ,   position.top + lastNodeHeight+ _this.spacing + "px");
				}else{
					$(this).css( "top" ,  "0px");
				}
				lastNode = this;

				//adjust body height
				$(_this.body).height(   parseInt( $(lastNode).css("top") ) +  $(lastNode).height() );

			});
			this.fragment = null;
		},

		_addNode : function( node ){
			if( !this.fragment ){
				this.fragment = document.createDocumentFragment();
			}
			$(this.fragment).append( node );
		},

		_createNode : function( nodeData ){
			var node =  [
							'<div class="timeline-item">',
			                  '<div class="timeline-item-index">' ,
			                      '<div class="title">' + nodeData.title + '</div>',
			                  '</div>' ,
			                  '<div class="timeline-item-box">' + nodeData.content + '</div>' ,
			                  '<div class="timeline-item-node"></div>' ,
		           		 	'</div>'
		           		 ].join("");
			return $(node).get(0);
		},


		_getTimeLineBody : function(){
			return this.body;
		},

		_init : function(){
			this.element = 	this._buildElement();
			this.body = $(this.element).find(".timeline-body").get(0);
			
			this.bodyHeight = 0; //according to body content dynamic adjust

			this.render();
		},

		_buildElement : function() {
			var element = $(	
					[
						'<div class="timeline">' ,
							'<div class="timeline-end"></div>' ,
							'<div class="timeline-body"></div>' ,
							'<div class="timeline-start"></div>' ,
						'</div>'
					].join("")
				);
			return element;
		}
	}

	window.TimeLine = TimeLine;
})();