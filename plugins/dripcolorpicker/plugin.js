( function() {
  CKEDITOR.plugins.add( 'dripcolorpicker', {
    requires: 'panelbutton,floatpanel',
    icons: 'bgcolor,textcolor',
    hidpi: true,
    init: function( editor ) {
      editor.addCommand( 'showDripColorPicker', {
        exec: function( editor ) {
          editor.fire("dripColorPickerRequested");
        }
      } );

      var style = new CKEDITOR.style( editor.config[ 'colorButton_' + 'fore' + 'Style' ] ),
				colorBoxId = 'color-picker-input';

      function renderPicker (panel) {
        var clickFn = CKEDITOR.tools.addFunction( function( color ) {
          console.log("YOU MADE IT TO THE CLICK EVENT");
          var applyColorStyle = arguments.callee;
          function onColorDialogClose( evt ) {
            this.removeListener( 'ok', onColorDialogClose );
            this.removeListener( 'cancel', onColorDialogClose );
  
            evt.name == 'ok' && applyColorStyle( this.getContentElement( 'picker', 'selectedColor' ).getValue(), 'fore' );
          }
  
          if ( color == '?' ) {
            editor.openDialog( 'colordialog', function() {
              this.on( 'ok', onColorDialogClose );
              this.on( 'cancel', onColorDialogClose );
            } );
  
            return;
          }
  
          editor.focus();
  
          panel.hide();
  
          editor.fire( 'saveSnapshot' );
  
          // Clean up any conflicting style within the range.
          editor.removeStyle( new CKEDITOR.style( editor.config[ 'colorButton_' + 'fore' + 'Style' ], { color: 'inherit' } ) );
  
          if ( color ) {
            var colorStyle = editor.config[ 'colorButton_' + 'fore' + 'Style' ];
  
            colorStyle.childRule = function( element ) {
              // Fore color style must be applied inside links instead of around it. (#4772,#6908)
              return !( element.is( 'a' ) || element.getElementsByTag( 'a' ).count() ) || isUnstylable( element );
            };
  
            editor.applyStyle( new CKEDITOR.style( colorStyle, { color: color } ) );
          }
  
          editor.fire( 'saveSnapshot' );
        } );

        colorName = "green"
        var output = []
        output.push (
          '<div class="sp-container sp-light sp-palette-buttons-disabled sp-initial-disabled" style="position: absolute; top: 829px; left: 60px;">',
          '<div class="sp-palette-container"><div class="sp-palette sp-thumb sp-cf"><span class="sp-label">Defaults</span><span class="sp-details ml-10"><a href="/settings/assets?section=brand" target="_blank">Change</a></span>',
          '<div class="sp-cf sp-palette-row sp-palette-row-0"><tool-tip message="Background" position="s" size="small"><span data-color="rgb(49, 132, 103)" class="sp-thumb-el sp-thumb-dark"><span class="sp-thumb-inner" style="background-color:rgb(49, 132, 103);"></span></span>',
          '</tool-tip><tool-tip message="Headline Text" position="s" size="small"><span data-color="rgb(0, 0, 0)" class="sp-thumb-el sp-thumb-dark"><span class="sp-thumb-inner" style="background-color:rgb(0, 0, 0);"></span></span></tool-tip>',
          '<tool-tip message="Button" position="s" size="small" style="--message-width:54px; --message-height:30px;"><span data-color="rgb(26, 141, 198)" class="sp-thumb-el sp-thumb-dark"><span class="sp-thumb-inner" style="background-color:rgb(26, 141, 198);"></span></span></tool-tip></div>,',
          '<span class="sp-label">Brand Colors</span><div class="sp-cf sp-palette-row sp-palette-row-0"></div><span class="sp-label">Recent</span><div class="sp-cf sp-palette-row sp-palette-row-selection"><span title="#262626" data-color="rgb(38, 38, 38)" class="sp-thumb-el sp-thumb-dark">',
          '<span class="sp-thumb-inner" style="background-color:rgb(38, 38, 38);"></span></span><span title="#cccccc" data-color="rgb(204, 204, 204)" class="sp-thumb-el sp-thumb-light"><span class="sp-thumb-inner" style="background-color:rgb(204, 204, 204);"></span></span>',
          '<span title="#684bd5" data-color="rgb(104, 75, 213)" class="sp-thumb-el sp-thumb-light"><span class="sp-thumb-inner" style="background-color:rgb(104, 75, 213);"></span></span><span title="#2b09ab" data-color="rgb(43, 9, 171)" class="sp-thumb-el sp-thumb-dark"><span class="sp-thumb-inner" style="background-color:rgb(43, 9, 171);"></span></span><span title="#5331d3" data-color="rgb(83, 49, 211)" class="sp-thumb-el sp-thumb-light"><span class="sp-thumb-inner" style="background-color:rgb(83, 49, 211);"></span></span><span title="#ffffff" data-color="rgb(255, 255, 255)" class="sp-thumb-el sp-thumb-light"><span class="sp-thumb-inner" style="background-color:rgb(255, 255, 255);"></span></span><span title="#7b59fb" data-color="rgb(123, 89, 251)" class="sp-thumb-el sp-thumb-light"><span class="sp-thumb-inner" style="background-color:rgb(123, 89, 251);"></span></span><span title="#86a93d" data-color="rgb(134, 169, 61)" class="sp-thumb-el sp-thumb-dark"><span class="sp-thumb-inner" style="background-color:rgb(134, 169, 61);"></span></span><span title="#c1dad9" data-color="rgb(193, 218, 217)" class="sp-thumb-el sp-thumb-light"><span class="sp-thumb-inner" style="background-color:rgb(193, 218, 217);"></span></span><span title="#f9a82f" data-color="rgb(249, 168, 47)" class="sp-thumb-el sp-thumb-light"><span class="sp-thumb-inner" style="background-color:rgb(249, 168, 47);"></span></span><span title="#365900" data-color="rgb(54, 89, 0)" class="sp-thumb-el sp-thumb-dark sp-thumb-active"><span class="sp-thumb-inner" style="background-color:rgb(54, 89, 0);"></span></span><span title="#5e8115" data-color="rgb(94, 129, 21)" class="sp-thumb-el sp-thumb-dark"><span class="sp-thumb-inner" style="background-color:rgb(94, 129, 21);"></span></span><span title="#81d4b7" data-color="rgb(129, 212, 183)" class="sp-thumb-el sp-thumb-light"><span class="sp-thumb-inner" style="background-color:rgb(129, 212, 183);"></span></span></div></div><div class="sp-palette-button-container sp-cf"><button type="button" class="sp-palette-toggle">less</button></div></div><div class="sp-picker-container"><div class="sp-top sp-cf"><div class="sp-fill"></div><div class="sp-top-inner"><div class="sp-color" style="background-color: rgb(155, 255, 0);"><div class="sp-sat"><div class="sp-val"><div class="sp-dragger" style="display: block; top: 72.8157px; left: 114px;"></div></div></div></div><div class="sp-clear sp-clear-display" title="Clear Color Selection" style="display: none;"></div><div class="sp-hue"><div class="sp-slider" style="display: block; top: 23.4007px;"></div></div></div><div class="sp-alpha" style=""><div class="sp-alpha-inner"><div class="sp-alpha-handle" style="display: block; left: 148px;"></div></div></div></div><div class="sp-input-container sp-cf"><input class="sp-input" type="text" spellcheck="false"></div><div class="sp-initial sp-thumb sp-cf"></div><div class="sp-button-container button-container sp-cf"><button type="button" class="sp-choose button--alpha button--small">Done</button><a class="sp-cancel button--beta--ghost button--small" href="#">Cancel</a></div></div></div>',
          '<input class="small" type="color" id="color-picker-input" value="#000000" onclick="CKEDITOR.tools.callFunction(', clickFn, ',\'', colorName, '\',\'', 'fore', '\'); return false;"></div>')
        return output.join( ' ' );
      }
      editor.ui.add( "ColorPicker", CKEDITOR.UI_PANELBUTTON, {
				label: "Text Color",
				title:  "Text Color",
				modes: { wysiwyg: 1 },
				editorFocus: 0,
				toolbar: 'colors,' + 10,
				allowedContent: style,
				requiredContent: style,

				panel: {
					css: CKEDITOR.skin.getPath( 'drip' ),
					attributes: { role: 'listbox', 'aria-label': "Colors"}
				},

				onBlock: function( panel, block ) {
					block.autoSize = true;
					block.element.addClass( 'cke_colorblock' );
					block.element.setHtml(renderPicker(panel));

					// The block should not have scrollbars (#5933, #6056)
					block.element.getDocument().getBody().setStyle( 'overflow', 'hidden' );

					CKEDITOR.ui.fire( 'ready', this );

					var keys = block.keys;
					var rtl = editor.lang.dir == 'rtl';
					keys[ rtl ? 37 : 39 ] = 'next'; // ARROW-RIGHT
					keys[ 40 ] = 'next'; // ARROW-DOWN
					keys[ 9 ] = 'next'; // TAB
					keys[ rtl ? 39 : 37 ] = 'prev'; // ARROW-LEFT
					keys[ 38 ] = 'prev'; // ARROW-UP
					keys[ CKEDITOR.SHIFT + 9 ] = 'prev'; // SHIFT + TAB
					keys[ 32 ] = 'click'; // SPACE
				},

				refresh: function() {
					if ( !editor.activeFilter.check( style ) )
						this.setState( CKEDITOR.TRISTATE_DISABLED );
				},

				// The automatic colorbox should represent the real color (#6010)
				onOpen: function() {

					var selection = editor.getSelection(),
						block = selection && selection.getStartElement(),
						path = editor.elementPath( block ),
						color;

					if ( !path )
						return;

					// Find the closest block element.
					block = path.block || path.blockLimit || editor.document.getBody();

					// The box should never be transparent.
					if ( !color || color == 'transparent' )
						color = '#ffffff';

					this._.panel._.iframe.getFrameDocument().getById( colorBoxId ).setStyle( 'background-color', color );

					return color;
				}
			} );
    }
  } );
} )();
